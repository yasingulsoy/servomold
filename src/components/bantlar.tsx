import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, ArrowUpRight, Mail, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { gorselBoyutu, hizmetBul } from "@/lib/hizmetler";
import { CONTACT, SERVOSTEEL } from "@/lib/site";
import { BolumBasligi } from "./bolum-basligi";
import { Cerceve } from "./cerceve";

/* Sayfalar arasında tekrar eden bantlar: ilkeler, grup şirketi, markalar, CTA. */

const ILKELER = ["termin", "fiyat", "kadro", "kalite"] as const;

/** Eski sitedeki dört ilke: hizmet/zamanında teslim, uygun fiyat, uzman kadro, dürüstlük ve kalite. */
export function Ilkeler({ no, toplam }: { no?: number; toplam?: number }) {
  const t = useTranslations("anasayfa");
  return (
    <section aria-labelledby="ilkeler-baslik" className="border-b border-cizgi bg-white py-20 sm:py-24">
      <div className="kap">
        <BolumBasligi no={no} toplam={toplam} ust={t("ilkeUst")} baslik={t("ilkeBaslik")} id="ilkeler-baslik" />
        <ol className="mt-14 grid border-t border-l border-cizgi sm:grid-cols-2 lg:grid-cols-4">
          {ILKELER.map((k, i) => (
            <li key={k} className="relative border-r border-b border-cizgi p-6 sm:p-8">
              <span aria-hidden className="absolute top-0 left-0 h-1 w-12 bg-amber" />
              <span className="font-baslik text-5xl font-bold text-cizgi tabular-nums" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-2xl font-bold uppercase">{t(`ilkeler.${k}.baslik`)}</h3>
              <p className="mt-3 leading-relaxed text-soluk">{t(`ilkeler.${k}.metin`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Grup şirketi Servosteel bandı. */
export function GrupBandi({ no, toplam }: { no?: number; toplam?: number }) {
  const t = useTranslations("anasayfa");
  const g = useTranslations("genel");
  const locale = useLocale();
  const url = locale === "tr" ? SERVOSTEEL.url : SERVOSTEEL.urlEn;
  const hat = hizmetBul("uretim-hatlari")!;
  return (
    <section aria-labelledby="grup-baslik" className="izgara-acik border-b border-cizgi bg-kagit py-20 sm:py-24">
      <div className="kap">
        <div className="grid gap-12 border border-cizgi bg-white p-6 sm:p-10 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-7">
            <BolumBasligi no={no} toplam={toplam} ust={t("grupUst")} baslik={t("grupBaslik")} id="grup-baslik" />
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-soluk">{t("grupGiris")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={url} target="_blank" rel="noopener" className="dugme dugme-koyu">
                {t("grupDugme")}
                <ArrowUpRight aria-hidden className="size-4" />
                <span className="sr-only"> {g("yeniSekme")}</span>
              </a>
              <Link href="/hizmetler/uretim-hatlari" className="dugme dugme-cizgi-acik">
                {g("detay")}
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5">
            <Cerceve
              src={hat.gorsel}
              alt={hat.gorselAlt[locale]}
              sizes="(min-width: 1024px) 420px, 90vw"
              className="mx-auto max-w-[420px]"
              stil={{ aspectRatio: `${gorselBoyutu(hat).w} / ${gorselBoyutu(hat).h}` }}
              isaret="text-amber-koyu/60"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const MARKALAR = [
  { dosya: "skf", ad: "SKF" },
  { dosya: "festo", ad: "Festo" },
  { dosya: "schneider-electric", ad: "Schneider Electric" },
  { dosya: "rexroth", ad: "Rexroth" },
  { dosya: "siemens", ad: "Siemens" },
];

/**
 * Eski sitedeki "Partnerlerimiz" logoları. Gri tonlu ve `multiply` ile
 * basılır: JPG'lerin beyaz zemini kaybolur, şerit tek renk durur.
 * Kullanım izni teyit edilecek — bkz. docs/ICERIK-NOTLARI.md.
 */
export function MarkaSeridi() {
  const t = useTranslations("anasayfa");
  return (
    <section aria-labelledby="marka-baslik" className="border-b border-cizgi bg-kagit py-12">
      <div className="kap flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
        <h2 id="marka-baslik" className="etiket shrink-0 text-soluk lg:w-56">
          {t("markaUst")}
        </h2>
        <ul className="grid flex-1 grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
          {MARKALAR.map((m) => (
            <li key={m.dosya} className="flex justify-center">
              <Image
                src={`/gorseller/markalar/${m.dosya}.jpg`}
                alt={m.ad}
                width={250}
                height={106}
                sizes="160px"
                className="h-auto w-[140px] opacity-70 mix-blend-multiply grayscale transition hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Sayfa sonu çağrısı: amber bant. */
export function CtaBandi() {
  const t = useTranslations("anasayfa");
  return (
    <section aria-labelledby="cta-baslik" className="izgara-acik bg-amber text-kabuk">
      <div className="kap grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <h2 id="cta-baslik" className="text-[2rem] leading-[1.02] font-bold tracking-tight uppercase sm:text-5xl">
            {t("ctaBaslik")}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-kabuk/80">{t("ctaGiris")}</p>
        </div>
        <div className="flex flex-col gap-4 lg:col-span-4 lg:items-end">
          <Link href={{ pathname: "/iletisim", hash: "teklif" }} className="dugme dugme-koyu w-full sm:w-auto">
            {t("ctaDugme")}
            <ArrowRight aria-hidden className="size-4" />
          </Link>
          <div className="flex flex-col gap-2 font-medium sm:flex-row sm:gap-6 lg:flex-col lg:items-end lg:gap-2">
            <a href={CONTACT.phoneHref} className="flex items-center gap-2 tabular-nums hover:underline">
              <Phone aria-hidden className="size-4" />
              {CONTACT.phone}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 hover:underline">
              <Mail aria-hidden className="size-4" />
              {CONTACT.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
