import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { HIZMETLER } from "@/lib/hizmetler";
import { CONTACT, FOUNDED, SERVOSTEEL, SITE_NAME, YOUTUBE_URL } from "@/lib/site";
import { Logo } from "./logo";
import { OlcuCizgisi } from "./olcu-cizgisi";
import { YoutubeIkon } from "./youtube-ikon";

export function SiteFooter() {
  const t = useTranslations("altbilgi");
  const nav = useTranslations("nav");
  const g = useTranslations("genel");
  const locale = useLocale();
  const yil = new Date().getFullYear();
  const servosteelUrl = locale === "tr" ? SERVOSTEEL.url : SERVOSTEEL.urlEn;

  const baslik = "etiket mb-5 text-koyu-soluk";
  const baglanti = "text-koyu-metin/90 transition-colors hover:text-amber";

  return (
    <footer className="izgara border-t border-cizgi-koyu bg-kabuk text-koyu-metin">
      <div className="kap pt-16 pb-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" aria-label={SITE_NAME} className="inline-block">
              <Logo slogan={g("slogan")} onek="alt" boyut="buyuk" />
            </Link>
            <p className="mt-6 max-w-sm leading-relaxed text-koyu-soluk">{t("ozet")}</p>
          </div>

          <div className="lg:col-span-3">
            <h2 className={baslik}>{t("hizmetler")}</h2>
            <ul className="space-y-2.5">
              {HIZMETLER.map((h) => (
                <li key={h.slug}>
                  <Link href={`/hizmetler/${h.slug}`} className={baglanti}>
                    {h.metin[locale].ad}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className={baslik}>{t("kurumsal")}</h2>
            <ul className="space-y-2.5">
              <li>
                <Link href="/hizmetler" className={baglanti}>
                  {nav("hizmetler")}
                </Link>
              </li>
              <li>
                <Link href="/hakkimizda" className={baglanti}>
                  {nav("hakkimizda")}
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className={baglanti}>
                  {nav("iletisim")}
                </Link>
              </li>
              <li>
                <Link href={{ pathname: "/iletisim", hash: "teklif" }} className={baglanti}>
                  {nav("teklif")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className={baslik}>{t("iletisim")}</h2>
            <address className="space-y-3 not-italic">
              <a href={CONTACT.mapsUrl} target="_blank" rel="noopener" className={`flex gap-3 ${baglanti}`}>
                <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-amber" />
                <span>
                  {CONTACT.street}
                  <br />
                  {CONTACT.district} / {CONTACT.city}
                  <span className="sr-only"> {g("yeniSekme")}</span>
                </span>
              </a>
              <a href={CONTACT.phoneHref} className={`flex items-center gap-3 ${baglanti}`}>
                <Phone aria-hidden className="size-4 shrink-0 text-amber" />
                <span className="tabular-nums">{CONTACT.phone}</span>
              </a>
              <a href={`mailto:${CONTACT.email}`} className={`flex items-center gap-3 ${baglanti}`}>
                <Mail aria-hidden className="size-4 shrink-0 text-amber" />
                {CONTACT.email}
              </a>
              <a href={YOUTUBE_URL} target="_blank" rel="noopener" className={`flex items-center gap-3 ${baglanti}`}>
                <YoutubeIkon className="size-4 shrink-0 text-amber" />
                {t("youtube")}
                <span className="sr-only"> {g("yeniSekme")}</span>
              </a>
            </address>
          </div>
        </div>

        {/* Grup şirketi */}
        <a
          href={servosteelUrl}
          target="_blank"
          rel="noopener"
          className="group mt-14 flex flex-col gap-2 border border-cizgi-koyu bg-kabuk-2/80 px-5 py-4 transition-colors hover:border-amber sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
            <span className="etiket text-koyu-soluk">{t("grup")}</span>
            <span className="font-baslik text-xl font-semibold text-white">{SERVOSTEEL.name}</span>
            <span className="text-koyu-soluk">{t("grupMetin")}</span>
          </span>
          <span className="etiket flex items-center gap-1.5 text-amber">
            servosteel.com.tr
            <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            <span className="sr-only"> {g("yeniSekme")}</span>
          </span>
        </a>

        <OlcuCizgisi etiket={`${FOUNDED} — ${yil}`} className="mt-12 text-cizgi-koyu [&_.etiket]:text-koyu-soluk" />

        <div className="mt-6 flex flex-col gap-2 text-sm text-koyu-soluk sm:flex-row sm:justify-between">
          <p>
            © {yil} {SITE_NAME}. {t("haklar")}
          </p>
          <p>{CONTACT.district}, {CONTACT.city}</p>
        </div>
      </div>
    </footer>
  );
}
