"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CircleCheck, FileText, LoaderCircle, Paperclip, TriangleAlert, X } from "lucide-react";
import { HIZMETLER } from "@/lib/hizmetler";
import { CONTACT } from "@/lib/site";
import {
  ALAN_SINIRI,
  BAL_KABI,
  EPOSTA_DESENI,
  TEKLIF_DOSYA_SAYISI,
  TEKLIF_TOPLAM_SINIR,
  TEKLIF_UZANTILAR,
  boyutYaz,
  uzantiUygun,
  type TeklifHata,
} from "@/lib/teklif";

type Durum = "bos" | "gonderiliyor" | "tamam";

/**
 * Teklif formu. /api/teklif'e FormData gönderir (dosyalar dahil).
 * Zorunlu: ad, e-posta, mesaj. Kurallar lib/teklif.ts'te, sunucuyla ortak.
 *
 * SMTP tanımlı değilse API 503 döner; form o zaman ziyaretçiye doğrudan
 * e-posta adresini gösterir — talep kaybolmaz.
 */
export function TeklifFormu({ hizmet = "", koyu = false }: { hizmet?: string; koyu?: boolean }) {
  const t = useTranslations("form");
  const locale = useLocale();
  const kimlik = useId();
  const dosyaGirdisi = useRef<HTMLInputElement>(null);

  const [durum, setDurum] = useState<Durum>("bos");
  const [hata, setHata] = useState<{ kod: TeklifHata; ek?: string } | null>(null);
  const [eksik, setEksik] = useState<Record<string, boolean>>({});
  const [dosyalar, setDosyalar] = useState<File[]>([]);

  const toplam = dosyalar.reduce((a, d) => a + d.size, 0);
  const id = (ad: string) => `${kimlik}-${ad}`;

  function dosyaEkle(liste: FileList | null) {
    setHata(null);
    const yeni = Array.from(liste ?? []);
    const uygunsuz = yeni.find((d) => !uzantiUygun(d.name));
    if (uygunsuz) {
      setHata({ kod: "tur", ek: uygunsuz.name });
    } else {
      const birlesik = [...dosyalar];
      for (const d of yeni) {
        if (!birlesik.some((x) => x.name === d.name && x.size === d.size)) birlesik.push(d);
      }
      if (birlesik.reduce((a, d) => a + d.size, 0) > TEKLIF_TOPLAM_SINIR || birlesik.length > TEKLIF_DOSYA_SAYISI) {
        setHata({ kod: "buyuk" });
      } else {
        setDosyalar(birlesik);
      }
    }
    /* Aynı dosya kaldırılıp yeniden seçilebilsin */
    if (dosyaGirdisi.current) dosyaGirdisi.current.value = "";
  }

  async function gonder(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const veri = new FormData(form);
    veri.delete("dosyalar");
    for (const d of dosyalar) veri.append("dosyalar", d);
    veri.set("dil", locale);
    veri.set("sayfa", window.location.pathname);

    const deger = (ad: string) => String(veri.get(ad) ?? "").trim();
    const yeniEksik = { ad: !deger("ad"), eposta: !deger("eposta"), mesaj: !deger("mesaj") };
    setEksik(yeniEksik);
    if (yeniEksik.ad || yeniEksik.eposta || yeniEksik.mesaj) {
      setHata({ kod: "alan" });
      return;
    }
    if (!EPOSTA_DESENI.test(deger("eposta"))) {
      setEksik({ eposta: true });
      setHata({ kod: "eposta" });
      return;
    }

    setHata(null);
    setDurum("gonderiliyor");
    try {
      const yanit = await fetch("/api/teklif", { method: "POST", body: veri });
      const json = (await yanit.json().catch(() => ({}))) as { tamam?: boolean; hata?: TeklifHata; ek?: string };
      if (yanit.ok && json.tamam) {
        form.reset();
        setDosyalar([]);
        setEksik({});
        setDurum("tamam");
        return;
      }
      setHata({ kod: json.hata ?? (yanit.status === 503 ? "kapali" : "genel"), ek: json.ek });
    } catch {
      setHata({ kod: "genel" });
    }
    setDurum("bos");
  }

  /* --- Gönderildi --- */
  if (durum === "tamam") {
    return (
      <div role="status" className={`border p-6 sm:p-8 ${koyu ? "border-cizgi-koyu bg-kabuk-2" : "border-cizgi bg-white"}`}>
        <CircleCheck aria-hidden className="size-10 text-tamam" />
        <p className={`mt-4 font-baslik text-2xl font-bold uppercase ${koyu ? "text-white" : ""}`}>{t("tamamBaslik")}</p>
        <p className={`mt-2 ${koyu ? "text-koyu-soluk" : "text-soluk"}`}>
          {t("tamamMetin")}{" "}
          <a href={CONTACT.phoneHref} className="baglanti whitespace-nowrap">
            {CONTACT.phone}
          </a>
        </p>
        <button type="button" onClick={() => setDurum("bos")} className="dugme dugme-cizgi-acik mt-6">
          {t("yeni")}
        </button>
      </div>
    );
  }

  const etiket = "mb-1.5 block font-baslik text-[0.95rem] font-semibold tracking-wide uppercase";
  const zorunlu = (
    <span className="ml-1 text-amber-koyu" aria-hidden>
      *
    </span>
  );
  const gonderiliyor = durum === "gonderiliyor";

  return (
    <form noValidate onSubmit={gonder} className="relative grid gap-5 sm:grid-cols-2" aria-busy={gonderiliyor}>
      <div>
        <label htmlFor={id("ad")} className={etiket}>
          {t("ad")}
          {zorunlu}
          <span className="sr-only"> ({t("zorunlu")})</span>
        </label>
        <input
          id={id("ad")}
          name="ad"
          autoComplete="name"
          required
          maxLength={ALAN_SINIRI.ad}
          aria-invalid={eksik.ad || undefined}
          className="alan"
        />
      </div>
      <div>
        <label htmlFor={id("firma")} className={etiket}>
          {t("firma")}
        </label>
        <input id={id("firma")} name="firma" autoComplete="organization" maxLength={ALAN_SINIRI.firma} className="alan" />
      </div>
      <div>
        <label htmlFor={id("eposta")} className={etiket}>
          {t("eposta")}
          {zorunlu}
          <span className="sr-only"> ({t("zorunlu")})</span>
        </label>
        <input
          id={id("eposta")}
          name="eposta"
          type="email"
          autoComplete="email"
          inputMode="email"
          required
          maxLength={ALAN_SINIRI.eposta}
          aria-invalid={eksik.eposta || undefined}
          className="alan"
        />
      </div>
      <div>
        <label htmlFor={id("telefon")} className={etiket}>
          {t("telefon")}
        </label>
        <input
          id={id("telefon")}
          name="telefon"
          type="tel"
          autoComplete="tel"
          maxLength={ALAN_SINIRI.telefon}
          className="alan"
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={id("hizmet")} className={etiket}>
          {t("hizmet")}
        </label>
        <select id={id("hizmet")} name="hizmet" defaultValue={hizmet} className="alan appearance-auto">
          <option value="">{t("hizmetSec")}</option>
          {HIZMETLER.map((h) => (
            <option key={h.slug} value={h.slug}>
              {h.metin[locale].ad}
            </option>
          ))}
          <option value="diger">{t("diger")}</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={id("mesaj")} className={etiket}>
          {t("mesaj")}
          {zorunlu}
          <span className="sr-only"> ({t("zorunlu")})</span>
        </label>
        <textarea
          id={id("mesaj")}
          name="mesaj"
          rows={6}
          required
          maxLength={ALAN_SINIRI.mesaj}
          placeholder={t("mesajIpucu")}
          aria-invalid={eksik.mesaj || undefined}
          className="alan resize-y"
        />
      </div>

      {/* Dosyalar */}
      <div className="sm:col-span-2">
        <span className={etiket} id={id("dosya-etiket")}>
          {t("dosya")}
        </span>
        <label
          htmlFor={id("dosya")}
          className="flex cursor-pointer items-center gap-4 border border-dashed border-grafit/40 bg-white px-4 py-4 transition-colors hover:border-amber-koyu focus-within:border-amber-koyu focus-within:ring-3 focus-within:ring-amber/25"
        >
          <span className="flex size-10 shrink-0 items-center justify-center bg-kagit-2 text-grafit">
            <Paperclip aria-hidden className="size-5" />
          </span>
          <span className="min-w-0">
            <span className="block font-medium">{t("dosyaIpucu")}</span>
            {/* toUpperCase dilden bağımsız: CSS uppercase Türkçede "İGS", "ZİP" yazardı */}
            <span className="block text-sm text-soluk">
              {TEKLIF_UZANTILAR.map((u) => u.toUpperCase()).join(" · ")} — ≤ 15 MB
            </span>
          </span>
          <input
            ref={dosyaGirdisi}
            id={id("dosya")}
            type="file"
            multiple
            aria-labelledby={id("dosya-etiket")}
            accept={TEKLIF_UZANTILAR.map((u) => `.${u}`).join(",")}
            onChange={(e) => dosyaEkle(e.target.files)}
            className="sr-only"
          />
        </label>
        {dosyalar.length > 0 ? (
          <ul className="mt-3 divide-y divide-cizgi border border-cizgi bg-white">
            {dosyalar.map((d) => (
              <li key={`${d.name}-${d.size}`} className="flex items-center gap-3 px-4 py-2.5 text-sm">
                <FileText aria-hidden className="size-4 shrink-0 text-soluk" />
                <span className="min-w-0 flex-1 truncate">{d.name}</span>
                <span className="text-soluk tabular-nums">{boyutYaz(d.size, locale)}</span>
                <button
                  type="button"
                  onClick={() => setDosyalar((l) => l.filter((x) => x !== d))}
                  className="-mr-2 flex size-8 items-center justify-center text-soluk hover:text-hata"
                >
                  <X aria-hidden className="size-4" />
                  <span className="sr-only">
                    {t("dosyaSil")}: {d.name}
                  </span>
                </button>
              </li>
            ))}
            <li className="flex justify-between px-4 py-2 text-sm text-soluk">
              <span>{t("toplam")}</span>
              <span className="tabular-nums">
                {boyutYaz(toplam, locale)} / 15 MB
              </span>
            </li>
          </ul>
        ) : null}
      </div>

      {/* Bal kabı: ekranda ve klavye sırasında yok; botlar doldurur. */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor={id("bal")}>{t("bot")}</label>
        <input id={id("bal")} name={BAL_KABI} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      {hata ? (
        <div role="alert" className="flex gap-3 border-l-4 border-hata bg-hata/5 px-4 py-3 text-sm sm:col-span-2">
          <TriangleAlert aria-hidden className="mt-0.5 size-4 shrink-0 text-hata" />
          <p className={koyu ? "text-koyu-metin" : "text-murekkep"}>
            {hata.kod === "kapali" || hata.kod === "genel" ? (
              <>
                {t(hata.kod === "kapali" ? "hataKapali" : "hataGenel")}{" "}
                <a href={`mailto:${CONTACT.email}`} className="baglanti font-semibold">
                  {CONTACT.email}
                </a>
              </>
            ) : hata.kod === "tur" ? (
              <>
                {t("hataTur")} <strong className="break-all">{hata.ek}</strong>
              </>
            ) : (
              t(
                (
                  {
                    alan: "hataAlan",
                    eposta: "hataEposta",
                    buyuk: "hataBuyuk",
                    sik: "hataSik",
                  } as const
                )[hata.kod],
              )
            )}
          </p>
        </div>
      ) : null}

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className={`text-sm ${koyu ? "text-koyu-soluk" : "text-soluk"}`}>{t("gizlilik")}</p>
        <button type="submit" disabled={gonderiliyor} className="dugme dugme-amber shrink-0 disabled:opacity-70">
          {gonderiliyor ? <LoaderCircle aria-hidden className="size-4 animate-spin" /> : null}
          {gonderiliyor ? t("gonderiliyor") : t("gonder")}
        </button>
      </div>
    </form>
  );
}
