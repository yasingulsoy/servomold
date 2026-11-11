import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { HIZMETLER } from "@/lib/hizmetler";
import { OlcuCizgisi } from "@/components/olcu-cizgisi";

/* Dil ağacındaki 404: bilinmeyen yollar [...rest] üzerinden buraya düşer. */
export default function BulunamadiSayfasi() {
  const t = useTranslations("bulunamadi");
  const g = useTranslations("genel");
  const locale = useLocale();

  return (
    <section className="izgara bg-kabuk text-koyu-metin">
      <div className="kap grid gap-12 py-20 sm:py-28 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <OlcuCizgisi etiket="404" className="max-w-sm text-amber" />
          <h1 className="mt-8 text-5xl leading-none font-bold text-white uppercase sm:text-7xl">{t("baslik")}</h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-koyu-soluk">{t("metin")}</p>
          <Link href="/" className="dugme dugme-amber mt-9">
            {t("dugme")}
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
        <nav aria-label={g("tumu")} className="lg:col-span-5">
          <p className="etiket text-koyu-soluk">{g("tumu")}</p>
          <ul className="mt-4 border-t border-cizgi-koyu">
            {HIZMETLER.map((h) => (
              <li key={h.slug} className="border-b border-cizgi-koyu">
                <Link
                  href={`/hizmetler/${h.slug}`}
                  className="flex items-center justify-between py-3.5 font-baslik text-xl font-semibold uppercase text-white transition-colors hover:text-amber"
                >
                  {h.metin[locale].ad}
                  <ArrowRight aria-hidden className="size-4 text-amber" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
