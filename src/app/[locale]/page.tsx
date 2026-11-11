import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { absoluteUrl, sayfaMeta, VARSAYILAN_GORSEL } from "@/i18n/seo";
import { HIZMETLER, hizmetBul } from "@/lib/hizmetler";
import {
  ALT_NAME,
  CONTACT,
  FOUNDED,
  SERVOSTEEL,
  SITE_NAME,
  SITE_URL,
  TANITIM_VIDEOSU,
  YOUTUBE_URL,
} from "@/lib/site";
import { BolumBasligi } from "@/components/bolum-basligi";
import { Cerceve } from "@/components/cerceve";
import { CtaBandi, GrupBandi, Ilkeler, MarkaSeridi } from "@/components/bantlar";
import { HizmetKarti } from "@/components/hizmet-karti";
import { JsonLd } from "@/components/json-ld";
import { OlcuCizgisi } from "@/components/olcu-cizgisi";
import { YoutubeKutusu } from "@/components/youtube-kutusu";
import { YoutubeIkon } from "@/components/youtube-ikon";

const BOLUM = 6;
const ADIMLAR = ["1", "2", "3", "4", "5"] as const;

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const locale = (await params).locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "meta" });
  return sayfaMeta({ locale, path: "/", baslik: t("title"), aciklama: t("description"), mutlak: true });
}

export default async function AnaSayfa({ params }: PageProps<"/[locale]">) {
  const locale = (await params).locale as AppLocale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "anasayfa" });
  const h = await getTranslations({ locale, namespace: "hero" });
  const g = await getTranslations({ locale, namespace: "genel" });
  const meta = await getTranslations({ locale, namespace: "meta" });
  const iletisim = await getTranslations({ locale, namespace: "iletisim" });

  const fason = hizmetBul("fason-cnc-isleme")!.metin[locale];

  const plaka = [
    { k: h("plaka.kurulus"), v: String(FOUNDED) },
    { k: h("plaka.konum"), v: h("plaka.konumDeger") },
    { k: h("plaka.alan"), v: String(HIZMETLER.length) },
    { k: h("plaka.grup"), v: SERVOSTEEL.name },
  ];

  /* Organization + LocalBusiness: yalnız eski sitede yazan bilgiler. */
  const sema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        alternateName: ALT_NAME,
        url: absoluteUrl(locale, "/"),
        logo: { "@type": "ImageObject", url: `${SITE_URL}/gorseller/logo/servomold-logo.png`, width: 546, height: 262 },
        image: `${SITE_URL}${VARSAYILAN_GORSEL.url}`,
        description: meta("description"),
        foundingDate: String(FOUNDED),
        telephone: CONTACT.phone,
        email: CONTACT.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: CONTACT.street,
          addressLocality: CONTACT.district,
          addressRegion: CONTACT.city,
          addressCountry: CONTACT.country,
        },
        hasMap: CONTACT.mapsUrl,
        sameAs: [YOUTUBE_URL],
        knowsAbout: HIZMETLER.filter((x) => !x.dis).map((x) => x.metin[locale].ad),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        alternateName: ALT_NAME,
        inLanguage: ["tr", "en"],
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <>
      <JsonLd veri={sema} />

      {/* --- Hero ------------------------------------------------------- */}
      <section className="izgara relative overflow-hidden bg-kabuk text-koyu-metin">
        <div className="kap grid gap-14 pt-12 pb-16 sm:pt-16 lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-24">
          <div className="flex flex-col justify-center lg:col-span-7">
            <p className="etiket flex items-center gap-3 text-amber">
              <span aria-hidden className="h-px w-8 bg-amber" />
              {h("ust")}
            </p>
            <h1 className="mt-6 text-[2.75rem] leading-[0.92] font-bold tracking-tight text-white uppercase sm:text-7xl xl:text-[5.4rem]">
              {h("baslik")}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-koyu-soluk sm:text-xl">{h("giris")}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={{ pathname: "/iletisim", hash: "teklif" }} className="dugme dugme-amber">
                {h("cta")}
                <ArrowRight aria-hidden className="size-4" />
              </Link>
              <Link href="/hizmetler" className="dugme dugme-cizgi">
                {h("cta2")}
              </Link>
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <OlcuCizgisi etiket={g("slogan")} className="mb-6 text-koyu-soluk/70" />
            <Cerceve
              src="/gorseller/genel/cnc-freze-kalip-yuzeyi.jpg"
              alt={h("gorselAlt")}
              sizes="(min-width: 1024px) 480px, 100vw"
              className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5]"
              isaret="text-amber"
              konum="47% 50%"
              oncelikli
            />
            {/* Kimlik plakası: makine etiketi gibi, dört vidalı */}
            <div className="relative z-10 mx-auto -mt-10 w-[92%] border border-cizgi-koyu bg-kabuk-2 sm:w-[78%] lg:absolute lg:bottom-8 lg:-left-14 lg:mt-0 lg:w-[21rem]">
              {["top-2 left-2", "top-2 right-2", "bottom-2 left-2", "bottom-2 right-2"].map((k) => (
                <span key={k} aria-hidden className={`absolute size-1.5 rounded-full bg-cizgi-koyu ${k}`} />
              ))}
              <div className="flex items-center justify-between border-b border-cizgi-koyu px-5 py-3">
                <h2 className="etiket text-amber">{h("plaka.baslik")}</h2>
                <span className="etiket text-koyu-soluk">{SITE_NAME}</span>
              </div>
              <dl className="grid grid-cols-2">
                {plaka.map((s, i) => (
                  <div
                    key={s.k}
                    className={`px-5 py-4 ${i % 2 === 0 ? "border-r border-cizgi-koyu" : ""} ${i < 2 ? "border-b border-cizgi-koyu" : ""}`}
                  >
                    <dt className="etiket text-[0.7rem] text-koyu-soluk">{s.k}</dt>
                    <dd className="mt-1 font-baslik text-2xl font-semibold text-white tabular-nums">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* --- 01 Hizmetler ------------------------------------------------- */}
      <section aria-labelledby="hizmet-baslik" className="border-b border-cizgi bg-kagit py-20 sm:py-24">
        <div className="kap">
          <BolumBasligi
            no={1}
            toplam={BOLUM}
            ust={t("hizmetUst")}
            baslik={t("hizmetBaslik")}
            giris={t("hizmetGiris")}
            id="hizmet-baslik"
            sag={
              <Link href="/hizmetler" className="dugme dugme-cizgi-acik">
                {g("tumu")}
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            }
          />
          <ul className="mt-14 grid gap-px border border-cizgi bg-cizgi sm:grid-cols-2 lg:grid-cols-3">
            {HIZMETLER.map((x, i) => (
              <li key={x.slug}>
                <HizmetKarti hizmet={x} sira={i + 1} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* --- 02 İlkeler --------------------------------------------------- */}
      <Ilkeler no={2} toplam={BOLUM} />

      {/* --- 03 Süreç ----------------------------------------------------- */}
      <section aria-labelledby="surec-baslik" className="izgara bg-kabuk py-20 text-koyu-metin sm:py-28">
        <div className="kap">
          <BolumBasligi no={3} toplam={BOLUM} ust={t("surecUst")} baslik={t("surecBaslik")} koyu id="surec-baslik" />
          <ol className="mt-16 grid gap-0 lg:grid-cols-5">
            {ADIMLAR.map((n, i) => (
              <li key={n} className="relative flex gap-6 pb-10 lg:block lg:pr-8 lg:pb-0">
                {/* Mobilde adımları bağlayan dikey çizgi */}
                {i < ADIMLAR.length - 1 ? (
                  <span aria-hidden className="absolute top-14 bottom-0 left-6 w-px bg-cizgi-koyu lg:hidden" />
                ) : null}
                <div className="flex items-center self-start lg:self-auto">
                  <span className="flex size-12 shrink-0 items-center justify-center border border-amber bg-kabuk font-baslik text-xl font-bold text-amber tabular-nums">
                    {n.padStart(2, "0")}
                  </span>
                  {i < ADIMLAR.length - 1 ? (
                    <span aria-hidden className="ml-3 hidden h-px flex-1 items-center bg-cizgi-koyu lg:flex">
                      <svg width="8" height="8" viewBox="0 0 8 8" className="ml-auto text-koyu-soluk">
                        <path d="M8 4 0 0v8z" fill="currentColor" />
                      </svg>
                    </span>
                  ) : null}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white uppercase lg:mt-7">{t(`surec.${n}.baslik`)}</h3>
                  <p className="mt-3 leading-relaxed text-koyu-soluk">{t(`surec.${n}.metin`)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* --- 04 Fason CNC ------------------------------------------------- */}
      <section aria-labelledby="cnc-baslik" className="border-b border-cizgi bg-white py-20 sm:py-24">
        <div className="kap">
          <BolumBasligi
            no={4}
            toplam={BOLUM}
            ust={t("cncUst")}
            baslik={t("cncBaslik")}
            giris={t("cncGiris")}
            id="cnc-baslik"
          />
          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Cerceve
                src="/gorseller/genel/cnc-torna.jpg"
                alt={locale === "tr" ? "CNC tornada parça işleme" : "Turning a part on a CNC lathe"}
                sizes="(min-width: 1024px) 480px, 100vw"
                className="aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[24rem]"
                konum="45% 50%"
              />
            </div>
            <div className="lg:col-span-7">
              <h3 className="etiket text-soluk">{fason.kapsam.baslik}</h3>
              <ol className="mt-4 border-t border-murekkep">
                {fason.kapsam.maddeler.map((m, i) => (
                  <li key={m} className="flex items-baseline gap-5 border-b border-cizgi py-3.5">
                    <span className="etiket w-8 text-amber-koyu tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-baslik text-xl font-semibold uppercase sm:text-2xl">{m}</span>
                  </li>
                ))}
              </ol>
              <Link href="/hizmetler/fason-cnc-isleme" className="dugme dugme-koyu mt-8">
                {t("cncDugme")}
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- 05 Grup ------------------------------------------------------ */}
      <GrupBandi no={5} toplam={BOLUM} />

      {/* --- 06 Video ----------------------------------------------------- */}
      <section aria-labelledby="video-baslik" className="border-b border-cizgi bg-white py-20 sm:py-24">
        <div className="kap">
          <BolumBasligi no={6} toplam={BOLUM} ust={t("videoUst")} baslik={t("videoBaslik")} id="video-baslik" />
          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <YoutubeKutusu
                id={TANITIM_VIDEOSU}
                baslik={t("videoBaslik")}
                kapak="/gorseller/video/servosteel-servomold-tanitim.jpg"
                oynatYazisi={t("videoOynat")}
                not={t("videoNot")}
              />
            </div>
            <div className="flex flex-col justify-end gap-6 border-t border-murekkep pt-6 lg:col-span-4 lg:border-t-0 lg:border-l lg:border-cizgi lg:pt-0 lg:pl-10">
              <p className="text-lg leading-relaxed text-soluk">{t("videoGiris")}</p>
              <a href={YOUTUBE_URL} target="_blank" rel="noopener" className="dugme dugme-cizgi-acik self-start">
                <YoutubeIkon className="size-4" />
                {iletisim("youtube")}
                <span className="sr-only"> {g("yeniSekme")}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <MarkaSeridi />
      <CtaBandi />
    </>
  );
}
