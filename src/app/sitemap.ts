import type { MetadataRoute } from "next";
import { LOCALES } from "@/i18n/routing";
import { absoluteUrl } from "@/i18n/seo";
import { HIZMETLER } from "@/lib/hizmetler";
import { SITE_URL } from "@/lib/site";

const YOLLAR: { path: string; priority: number; gorsel?: string }[] = [
  { path: "/", priority: 1, gorsel: "/gorseller/genel/cnc-freze-kalip-yuzeyi.jpg" },
  { path: "/hizmetler", priority: 0.9 },
  /* Üretim hatları Servosteel'in işi; asıl sayfası orada, burada düşük öncelik. */
  ...HIZMETLER.map((h) => ({ path: `/hizmetler/${h.slug}`, priority: h.dis ? 0.4 : 0.8, gorsel: h.gorsel })),
  { path: "/hakkimizda", priority: 0.6 },
  { path: "/iletisim", priority: 0.7 },
];

/**
 * Her yol × iki dil, hreflang alternatifleriyle (x-default İngilizce —
 * sayfa metadata'sındaki alternates ile aynı). lastModified bilerek yok:
 * her derlemede "bugün" yazmak yanlış sinyal olur.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return YOLLAR.flatMap(({ path, priority, gorsel }) => {
    const languages: Record<string, string> = {};
    for (const l of LOCALES) languages[l] = absoluteUrl(l, path);
    languages["x-default"] = absoluteUrl("en", path);
    return LOCALES.map((l) => ({
      url: absoluteUrl(l, path),
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages },
      ...(gorsel ? { images: [`${SITE_URL}${gorsel}`] } : {}),
    }));
  });
}
