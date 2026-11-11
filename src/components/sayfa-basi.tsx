import { ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { absoluteUrl } from "@/i18n/seo";
import type { AppLocale } from "@/i18n/routing";
import { JsonLd } from "./json-ld";
import { OlcuCizgisi } from "./olcu-cizgisi";

export type Kirinti = { ad: string; yol: string };

/**
 * Alt sayfaların koyu başlık bandı: kırıntı yolu (+ BreadcrumbList şeması),
 * etiket, H1, giriş ve isteğe bağlı sağ sütun (görsel).
 */
export async function SayfaBasi({
  locale,
  kirintilar,
  ust,
  baslik,
  giris,
  sag,
  alt,
}: {
  locale: AppLocale;
  /** Ana sayfa hariç; sonuncusu bu sayfa. */
  kirintilar: Kirinti[];
  ust: string;
  baslik: string;
  giris?: React.ReactNode;
  sag?: React.ReactNode;
  /** Başlığın altında (giriş paragrafından sonra) gelen öğeler */
  alt?: React.ReactNode;
}) {
  const t = await getTranslations({ locale, namespace: "nav" });
  const tum: Kirinti[] = [{ ad: t("anasayfa"), yol: "/" }, ...kirintilar];

  const sema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: tum.map((k, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: k.ad,
      item: absoluteUrl(locale, k.yol),
    })),
  };

  return (
    <section className="izgara relative overflow-hidden border-b border-cizgi-koyu bg-kabuk text-koyu-metin">
      <JsonLd veri={sema} />
      <div className="kap relative py-12 sm:py-16 lg:py-20">
        <nav aria-label="Breadcrumb">
          <ol className="etiket flex flex-wrap items-center gap-1.5 text-[0.75rem] text-koyu-soluk">
            {tum.map((k, i) => (
              <li key={k.yol} className="flex items-center gap-1.5">
                {i > 0 ? <ChevronRight aria-hidden className="size-3 opacity-60" /> : null}
                {i < tum.length - 1 ? (
                  <Link href={k.yol} className="transition-colors hover:text-amber">
                    {k.ad}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-koyu-metin">
                    {k.ad}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className={`mt-10 grid gap-12 ${sag ? "lg:grid-cols-12 lg:items-center" : ""}`}>
          <div className={sag ? "lg:col-span-7" : "max-w-4xl"}>
            <p className="etiket flex items-center gap-3 text-amber">
              <span aria-hidden className="h-px w-8 bg-amber" />
              {ust}
            </p>
            <h1 className="mt-5 text-[2.5rem] leading-[0.98] font-bold tracking-tight text-white uppercase sm:text-6xl lg:text-[4.25rem]">
              {baslik}
            </h1>
            {giris ? <div className="mt-6 max-w-2xl text-lg leading-relaxed text-koyu-soluk">{giris}</div> : null}
            {alt}
          </div>
          {sag ? <div className="lg:col-span-5">{sag}</div> : null}
        </div>
      </div>
      <OlcuCizgisi className="kap pb-6 text-cizgi-koyu" />
    </section>
  );
}
