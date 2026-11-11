import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import type { AppLocale } from "@/i18n/routing";
import { absoluteUrl, sayfaMeta } from "@/i18n/seo";
import { CONTACT, SITE_URL, YOUTUBE_URL } from "@/lib/site";
import { JsonLd } from "@/components/json-ld";
import { SayfaBasi } from "@/components/sayfa-basi";
import { TeklifFormu } from "@/components/teklif-formu";
import { YoutubeIkon } from "@/components/youtube-ikon";

export async function generateMetadata({ params }: PageProps<"/[locale]/iletisim">): Promise<Metadata> {
  const locale = (await params).locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "iletisim" });
  return sayfaMeta({ locale, path: "/iletisim", baslik: t("baslik"), aciklama: t("giris") });
}

export default async function Iletisim({ params }: PageProps<"/[locale]/iletisim">) {
  const locale = (await params).locale as AppLocale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "iletisim" });
  const g = await getTranslations({ locale, namespace: "genel" });
  const nav = await getTranslations({ locale, namespace: "nav" });

  const sema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: absoluteUrl(locale, "/iletisim"),
    name: t("baslik"),
    about: { "@id": `${SITE_URL}/#organization` },
  };

  const satirlar = [
    {
      ikon: MapPin,
      ad: t("adres"),
      deger: (
        <>
          {CONTACT.street}
          <br />
          {CONTACT.district} / {CONTACT.city}
        </>
      ),
      href: CONTACT.mapsUrl,
      dis: true,
      ek: t("harita"),
    },
    { ikon: Phone, ad: t("telefon"), deger: CONTACT.phone, href: CONTACT.phoneHref },
    { ikon: Mail, ad: t("eposta"), deger: CONTACT.email, href: `mailto:${CONTACT.email}` },
    {
      ikon: YoutubeIkon,
      ad: t("kanal"),
      deger: t("youtube"),
      href: YOUTUBE_URL,
      dis: true,
    },
  ];

  return (
    <>
      <JsonLd veri={sema} />
      <SayfaBasi
        locale={locale}
        kirintilar={[{ ad: t("baslik"), yol: "/iletisim" }]}
        ust={t("ust")}
        baslik={t("baslik")}
        giris={<p>{t("giris")}</p>}
      />

      <section className="bg-kagit py-16 sm:py-20">
        <div className="kap grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <ul className="border-t border-murekkep">
              {satirlar.map(({ ikon: Ikon, ad, deger, href, dis, ek }) => (
                <li key={ad} className="border-b border-cizgi">
                  <a
                    href={href}
                    {...(dis ? { target: "_blank", rel: "noopener" } : {})}
                    className="group flex gap-4 py-5 transition-colors hover:text-amber-koyu"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center bg-kabuk text-amber">
                      <Ikon aria-hidden className="size-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="etiket block text-[0.72rem] text-soluk">{ad}</span>
                      <span className="mt-1 block text-lg leading-snug font-medium tabular-nums">{deger}</span>
                      {ek ? (
                        <span className="etiket mt-2 flex items-center gap-1 text-[0.72rem] text-amber-koyu">
                          {ek}
                          <ArrowUpRight aria-hidden className="size-3.5" />
                        </span>
                      ) : null}
                    </span>
                    {dis ? <span className="sr-only">{g("yeniSekme")}</span> : null}
                  </a>
                </li>
              ))}
            </ul>

            <div className="kirpma mt-10 text-cizgi">
              <div className="relative aspect-[4/3] overflow-hidden border border-cizgi bg-kagit-2">
                <iframe
                  src={`${CONTACT.mapsEmbed}&hl=${locale}`}
                  title={t("haritaBaslik")}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full border-0 grayscale-[0.35]"
                />
              </div>
            </div>
          </div>

          <div id="teklif" className="border border-cizgi bg-white p-5 sm:p-8 lg:col-span-7">
            <div className="flex items-center gap-4">
              <span className="etiket text-amber-koyu">{nav("teklif")}</span>
              <span aria-hidden className="h-px flex-1 bg-cizgi" />
            </div>
            <h2 className="mt-4 text-4xl leading-none font-bold uppercase sm:text-5xl">{t("formBaslik")}</h2>
            <p className="mt-4 mb-8 leading-relaxed text-soluk">{t("formGiris")}</p>
            <TeklifFormu />
          </div>
        </div>
      </section>
    </>
  );
}
