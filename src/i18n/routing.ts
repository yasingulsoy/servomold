import { defineRouting } from "next-intl/routing";
import { HIZMETLER } from "@/lib/hizmetler";

export const LOCALES = ["tr", "en"] as const;
export type AppLocale = (typeof LOCALES)[number];

/** Sayfa yolları: dahili (Türkçe) yol -> dile göre görünen yol. */
const SAYFALAR: Record<string, string> = {
  "/hizmetler": "/services",
  "/hakkimizda": "/about",
  "/iletisim": "/contact",
};

/**
 * Dinamik segment `[slug]` yerine somut yollar yazılır: next-intl dinamik
 * segmentin değerini çevirmez. Böylece `/en/services/cutting-dies` isteği
 * dahili `/hizmetler/kesme-kaliplari` sayfasına düşer, sayfalar Türkçe
 * slug'la çalışmaya devam eder.
 *
 * Tip bilerek geniş: harfi harfine tiplenirse `Link` şablon dizelerini
 * (`/hizmetler/${slug}`) kabul etmez.
 */
function yollar(): Record<string, Record<AppLocale, string> | string> {
  const harita: Record<string, Record<AppLocale, string> | string> = { "/": "/" };
  for (const [tr, en] of Object.entries(SAYFALAR)) harita[tr] = { tr, en };
  for (const h of HIZMETLER) {
    harita[`/hizmetler/${h.slug}`] = { tr: `/hizmetler/${h.slug}`, en: `/services/${h.en}` };
  }
  return harita;
}

export const PATHNAMES = yollar();

export const routing = defineRouting({
  locales: LOCALES,
  defaultLocale: "tr",
  localePrefix: "as-needed",
  pathnames: PATHNAMES as Record<string, string>,
});
