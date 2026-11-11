import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { absoluteUrl, sayfaMeta } from "@/i18n/seo";
import { HIZMETLER } from "@/lib/hizmetler";
import { SERVOSTEEL } from "@/lib/site";
import { CtaBandi } from "@/components/bantlar";
import { Cerceve } from "@/components/cerceve";
import { JsonLd } from "@/components/json-ld";
import { SayfaBasi } from "@/components/sayfa-basi";

export async function generateMetadata({ params }: PageProps<"/[locale]/hizmetler">): Promise<Metadata> {
  const locale = (await params).locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "hizmetSayfa" });
  return sayfaMeta({ locale, path: "/hizmetler", baslik: t("baslik"), aciklama: t("giris") });
}

export default async function HizmetlerSayfasi({ params }: PageProps<"/[locale]/hizmetler">) {
  const locale = (await params).locale as AppLocale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "hizmetSayfa" });
  const g = await getTranslations({ locale, namespace: "genel" });
  const iki = (n: number) => String(n).padStart(2, "0");

  const liste = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("baslik"),
    itemListElement: HIZMETLER.map((h, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: h.metin[locale].ad,
      url: absoluteUrl(locale, `/hizmetler/${h.slug}`),
    })),
  };

  return (
    <>
      <JsonLd veri={liste} />
      <SayfaBasi
        locale={locale}
        kirintilar={[{ ad: t("baslik"), yol: "/hizmetler" }]}
        ust={t("ust")}
        baslik={t("baslik")}
        giris={<p>{t("giris")}</p>}
      />

      <section className="bg-kagit py-16 sm:py-20">
        <ol className="kap grid gap-6">
          {HIZMETLER.map((h, i) => {
            const m = h.metin[locale];
            return (
              <li key={h.slug} className="group border border-cizgi bg-white">
                <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-4">
                    <Link href={`/hizmetler/${h.slug}`} tabIndex={-1} aria-hidden="true" className="block">
                      <Cerceve
                        src={h.gorsel}
                        alt=""
                        sizes="(min-width: 1024px) 360px, 90vw"
                        className="aspect-[346/286] max-w-[400px]"
                        sigdir={!!h.gorselBoyut}
                        soluk
                      />
                    </Link>
                  </div>
                  <div className="flex flex-col lg:col-span-8">
                    <div className="flex items-center gap-4">
                      <span className="etiket text-soluk tabular-nums">
                        <span className="text-amber-koyu">{iki(i + 1)}</span> / {iki(HIZMETLER.length)}
                      </span>
                      <span aria-hidden className="h-px flex-1 bg-cizgi" />
                      {h.dis ? (
                        <span className="etiket flex items-center gap-1 text-[0.75rem] text-soluk">
                          {t("grup")}: {SERVOSTEEL.name}
                        </span>
                      ) : null}
                    </div>
                    <h2 className="mt-5 text-3xl leading-tight font-bold uppercase sm:text-4xl">
                      <Link href={`/hizmetler/${h.slug}`} className="transition-colors hover:text-amber-koyu">
                        {m.ad}
                      </Link>
                    </h2>
                    <p className="mt-3 max-w-2xl text-lg leading-relaxed text-soluk">{m.aciklama}</p>
                    <ul className="mt-6 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                      {m.kapsam.maddeler.slice(0, 4).map((k) => (
                        <li key={k} className="flex gap-2.5 leading-snug">
                          <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-amber-koyu" />
                          {k}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap gap-3 lg:mt-auto lg:pt-8">
                      <Link href={`/hizmetler/${h.slug}`} className="dugme dugme-koyu">
                        {g("detay")}
                        <span className="sr-only">: {m.ad}</span>
                        <ArrowRight aria-hidden className="size-4" />
                      </Link>
                      {h.dis ? (
                        <a
                          href={locale === "tr" ? SERVOSTEEL.url : SERVOSTEEL.urlEn}
                          target="_blank"
                          rel="noopener"
                          className="dugme dugme-cizgi-acik"
                        >
                          {g("servosteelde")}
                          <ArrowUpRight aria-hidden className="size-4" />
                          <span className="sr-only"> {g("yeniSekme")}</span>
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <CtaBandi />
    </>
  );
}
