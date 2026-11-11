"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LOCALES } from "@/i18n/routing";

/**
 * TR / EN anahtarı. Gerçek bağlantı (`<a href>`): tarayıcı ve arama motoru
 * öbür dildeki karşılık sayfayı görür. `usePathname` dahili (Türkçe) yolu
 * verir; next-intl onu hedef dildeki yola çevirir.
 */
export function DilSecici({ className = "", onSec }: { className?: string; onSec?: () => void }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <nav aria-label={t("dil")} className={`flex items-center ${className}`}>
      {LOCALES.map((l, i) => {
        const aktif = l === locale;
        return (
          <span key={l} className="flex items-center">
            {i > 0 ? <span aria-hidden="true" className="mx-1 h-3.5 w-px bg-cizgi-koyu" /> : null}
            {aktif ? (
              <span aria-current="true" className="etiket px-1.5 py-1 text-amber">
                {l}
              </span>
            ) : (
              <Link
                href={pathname}
                locale={l}
                hrefLang={l}
                lang={l}
                onClick={onSec}
                className="etiket px-1.5 py-1 text-koyu-soluk transition-colors hover:text-white"
              >
                {l}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
