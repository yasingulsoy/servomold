import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { LOCALES, PATHNAMES, routing, type AppLocale } from "./routing";

export const OG_LOCALE: Record<AppLocale, string> = { tr: "tr_TR", en: "en_US" };

/** Dahili (Türkçe) yolun o dildeki görünen hâli, dil önekiyle. Kök için "/" ya da "/en". */
export function localePath(locale: AppLocale, path: string): string {
  const kayit = PATHNAMES[path];
  const yerel = typeof kayit === "object" ? kayit[locale] : path;
  const onek = locale === routing.defaultLocale ? "" : `/${locale}`;
  if (yerel === "/") return onek || "/";
  return `${onek}${yerel}`;
}

export function absoluteUrl(locale: AppLocale, path: string) {
  return `${SITE_URL}${localePath(locale, path)}`;
}

/**
 * canonical + hreflang. x-default İngilizce: varsayılan dil Türkçe ama dili
 * bilinmeyen ziyaretçi (yurt dışı alıcı) için doğru sayfa İngilizcesi.
 */
export function alternates(locale: AppLocale, path: string): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[l] = absoluteUrl(l, path);
  languages["x-default"] = absoluteUrl("en", path);
  return { canonical: absoluteUrl(locale, path), languages };
}

/** Paylaşım görseli yoksa kullanılan varsayılan (1920×800, kalıp yüzeyi frezeleme). */
export const VARSAYILAN_GORSEL = { url: "/gorseller/genel/cnc-freze-kalip-yuzeyi.jpg", width: 1920, height: 800 };

/**
 * Bir sayfanın metadata'sı: başlık, açıklama, canonical + hreflang ve
 * Open Graph. Başlık şablonu (`%s | ServoMold`) layout'ta; ana sayfa
 * `mutlak` ile şablonu atlar.
 */
export function sayfaMeta({
  locale,
  path,
  baslik,
  aciklama,
  mutlak = false,
  gorsel = VARSAYILAN_GORSEL,
}: {
  locale: AppLocale;
  path: string;
  baslik: string;
  aciklama: string;
  mutlak?: boolean;
  gorsel?: { url: string; width: number; height: number; alt?: string };
}): Metadata {
  return {
    title: mutlak ? { absolute: baslik } : baslik,
    description: aciklama,
    alternates: alternates(locale, path),
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      url: absoluteUrl(locale, path),
      title: baslik,
      description: aciklama,
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      images: [{ ...gorsel, alt: gorsel.alt ?? baslik }],
    },
  };
}
