import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { routing } from "@/i18n/routing";
import { OG_LOCALE, VARSAYILAN_GORSEL } from "@/i18n/seo";
import { IS_PRODUCTION_SITE, SITE_NAME, SITE_URL } from "@/lib/site";
import "../globals.css";

/* Barlow ve Barlow Condensed değişken font değil; ağırlıklar tek tek.
   Yalnız latin + latin-ext (Türkçe karakterler latin-ext'te). */
const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("title"), template: `%s | ${SITE_NAME}` },
    description: t("description"),
    applicationName: SITE_NAME,
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: OG_LOCALE[locale],
      title: t("title"),
      description: t("description"),
      images: [VARSAYILAN_GORSEL],
    },
    twitter: { card: "summary_large_image" },
    /* Önizleme ve yerel kopyalar indekslenmez; yalnız canlı alan adı açık. */
    robots: IS_PRODUCTION_SITE
      ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } }
      : { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION?.trim() || undefined,
      other: process.env.BING_SITE_VERIFICATION?.trim()
        ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION.trim() }
        : undefined,
    },
    formatDetection: { telephone: false },
  };
}

/* Tarayıcı çubuğu üst bilgiyle aynı koyu kabuk. */
export const viewport: Viewport = {
  themeColor: "#0e1012",
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${barlow.variable} ${barlowCondensed.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>
          <SiteHeader />
          <main id="icerik" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
