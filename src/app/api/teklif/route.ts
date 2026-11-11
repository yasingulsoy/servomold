import nodemailer from "nodemailer";
import { HIZMETLER } from "@/lib/hizmetler";
import { CONTACT } from "@/lib/site";
import {
  ALAN_SINIRI,
  BAL_KABI,
  EPOSTA_DESENI,
  TEKLIF_DOSYA_SAYISI,
  TEKLIF_TOPLAM_SINIR,
  uzantiUygun,
  type TeklifHata,
} from "@/lib/teklif";

/**
 * Teklif formu -> e-posta.
 *
 * Akış: bal kabı -> hız sınırı -> alan doğrulama -> dosya kontrolü -> SMTP.
 * SMTP_* tanımlı değilse 503 { hata: "kapali" } döner; istemci ziyaretçiye
 * info@servomold.com.tr adresini gösterir.
 *
 * Yanıt: { tamam: true } ya da { hata: TeklifHata, ek?: string }.
 */
export const runtime = "nodejs";

/* --- IP başına basit hız sınırı (bellekte) ---
   Tek sunucu sürecinde yeterli. Süreç yeniden başlarsa sayaç sıfırlanır;
   birden çok kopya çalışırsa her kopya ayrı sayar — bu ölçekte sorun değil. */
const PENCERE_MS = 10 * 60 * 1000;
const PENCERE_SINIRI = 5;
const gecmis = new Map<string, number[]>();

function hizSiniriGecti(ip: string) {
  const simdi = Date.now();
  const liste = (gecmis.get(ip) ?? []).filter((t) => simdi - t < PENCERE_MS);
  if (liste.length >= PENCERE_SINIRI) {
    gecmis.set(ip, liste);
    return true;
  }
  liste.push(simdi);
  gecmis.set(ip, liste);
  /* Harita büyümesin: süresi dolan kayıtları ara ara temizle */
  if (gecmis.size > 2000) {
    for (const [k, v] of gecmis) if (v.every((t) => simdi - t >= PENCERE_MS)) gecmis.delete(k);
  }
  return false;
}

/* Dokploy'un önündeki Traefik, güvenilmeyen kaynaktan gelen X-Forwarded-*
   başlıklarını atıp kendisininkini yazar; X-Real-Ip istemcinin adresidir. */
function istemciIp(req: Request) {
  const ileri = req.headers.get("x-forwarded-for");
  return req.headers.get("x-real-ip")?.trim() || ileri?.split(",")[0]?.trim() || "yerel";
}

function hata(durum: number, kod: TeklifHata, ek?: string) {
  return Response.json(ek ? { hata: kod, ek } : { hata: kod }, { status: durum });
}

/** Formdan metin alanı: kırpılmış, sınırlı. Konu satırına gidenlerde satır sonu da atılır. */
function alan(veri: FormData, ad: keyof typeof ALAN_SINIRI, tekSatir = true) {
  const v = veri.get(ad);
  if (typeof v !== "string") return "";
  const s = v.trim().slice(0, ALAN_SINIRI[ad]);
  return tekSatir ? s.replace(/[\r\n\t]+/g, " ") : s;
}

function kacir(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function smtpAyarlari() {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  const port = Number(process.env.SMTP_PORT || 465);
  return {
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    from: process.env.SMTP_FROM?.trim() || user,
    alici: process.env.TEKLIF_ALICI?.trim() || CONTACT.email,
  };
}

export async function POST(req: Request) {
  /* Gövdeyi okumadan önce kaba boyut kontrolü (15 MB dosya + form payı) */
  const boy = Number(req.headers.get("content-length") || 0);
  if (boy > TEKLIF_TOPLAM_SINIR + 1024 * 1024) return hata(413, "buyuk");

  let veri: FormData;
  try {
    veri = await req.formData();
  } catch {
    return hata(400, "genel");
  }

  /* Bal kabı doluysa bot: başarılı gibi yanıtla, hiçbir şey gönderme. */
  const bal = veri.get(BAL_KABI);
  if (typeof bal === "string" && bal.trim() !== "") return Response.json({ tamam: true });

  if (hizSiniriGecti(istemciIp(req))) return hata(429, "sik");

  const ad = alan(veri, "ad");
  const firma = alan(veri, "firma");
  const eposta = alan(veri, "eposta");
  const telefon = alan(veri, "telefon");
  const hizmetSlug = alan(veri, "hizmet");
  const mesaj = alan(veri, "mesaj", false);
  const dil = veri.get("dil") === "en" ? "en" : "tr";
  const sayfa = typeof veri.get("sayfa") === "string" ? String(veri.get("sayfa")).slice(0, 200) : "";

  if (!ad || !eposta || !mesaj) return hata(400, "alan");
  if (!EPOSTA_DESENI.test(eposta)) return hata(400, "eposta");

  const dosyalar = veri.getAll("dosyalar").filter((d): d is File => d instanceof File && d.size > 0);
  if (dosyalar.length > TEKLIF_DOSYA_SAYISI) return hata(413, "buyuk");
  for (const d of dosyalar) {
    if (!uzantiUygun(d.name)) return hata(415, "tur", d.name.slice(0, 120));
  }
  const toplam = dosyalar.reduce((a, d) => a + d.size, 0);
  if (toplam > TEKLIF_TOPLAM_SINIR) return hata(413, "buyuk");

  const smtp = smtpAyarlari();
  if (!smtp) return hata(503, "kapali");

  const hizmet = HIZMETLER.find((h) => h.slug === hizmetSlug);
  const hizmetAd = hizmet ? hizmet.metin.tr.ad : hizmetSlug === "diger" ? "Diğer" : "Belirtilmedi";

  const satirlar: [string, string][] = [
    ["Ad", ad],
    ["Firma", firma || "—"],
    ["E-posta", eposta],
    ["Telefon", telefon || "—"],
    ["Konu", hizmetAd],
    ["Dil", dil === "en" ? "İngilizce" : "Türkçe"],
    ["Sayfa", sayfa || "—"],
    ["Dosyalar", dosyalar.length ? dosyalar.map((d) => d.name).join(", ") : "—"],
  ];

  const metin = `${satirlar.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMesaj:\n${mesaj}\n`;
  const html =
    `<table cellpadding="6" style="border-collapse:collapse;font:14px Arial,sans-serif">` +
    satirlar
      .map(([k, v]) => `<tr><td style="color:#59606a;vertical-align:top"><b>${k}</b></td><td>${kacir(v)}</td></tr>`)
      .join("") +
    `</table><p style="font:14px Arial,sans-serif;white-space:pre-wrap">${kacir(mesaj)}</p>`;

  try {
    const tasiyici = nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.secure,
      auth: smtp.auth,
    });
    await tasiyici.sendMail({
      from: { name: "ServoMold web sitesi", address: smtp.from },
      to: smtp.alici,
      replyTo: { name: ad, address: eposta },
      subject: `Teklif talebi: ${hizmetAd} — ${firma || ad}`.slice(0, 180),
      text: metin,
      html,
      attachments: await Promise.all(
        dosyalar.map(async (d) => ({
          filename: d.name.replace(/[\r\n"]/g, "_").slice(0, 150),
          content: Buffer.from(await d.arrayBuffer()),
        })),
      ),
    });
  } catch (e) {
    console.error("[teklif] e-posta gönderilemedi:", e instanceof Error ? e.message : e);
    return hata(502, "genel");
  }

  return Response.json({ tamam: true });
}
