import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/**
 * Eski siteden (CMS pro!, servomold.com.tr) yeni yapıya kalıcı yönlendirmeler.
 * Tablo: docs/eski-site/README.md › "Eski adresler".
 *
 * permanent: true => 308 (arama motorları 301 gibi kalıcı sayar).
 * Eski adreslerin hepsi `/` ile bitiyordu; Next önce sondaki çizgiyi kırpar
 * (308), sonra buradaki kural çalışır. İki adımlık zincir bilerek bırakıldı:
 * `skipTrailingSlashRedirect` her sayfayı iki adresten açardı.
 *
 * Hedefler Türkçe ve öneksiz (tr kök dil) — eski site yalnız Türkçeydi.
 */
const p = (source: string, destination: string) => ({ source, destination, permanent: true });

const ESKI_URUNLER: [string, string][] = [
  ["kesme-kalip", "kesme-kaliplari"],
  ["bukme-kalip", "bukme-kaliplari"],
  ["plastik-kalip", "plastik-enjeksiyon-kaliplari"],
  ["m-injeksiyon", "metal-enjeksiyon-kaliplari"],
  ["fason-cnc-isleme", "fason-cnc-isleme"],
  ["uretim-hatlari", "uretim-hatlari"],
];

const nextConfig: NextConfig = {
  images: {
    /* AVIF önce: destekleyen tarayıcı daha küçük dosyayı alır. */
    formats: ["image/avif", "image/webp"],
  },

  /**
   * Güvenlik başlıkları (Next kendiliğinden eklemez). CSP bilerek yok:
   * JSON-LD satır içi, YouTube ve Google Haritalar iframe'i dışarıdan; doğru
   * bir CSP nonce ister, o da statik üretimi bozar.
   *
   * HSTS `includeSubDomains` OLMADAN: alan adının posta/panel gibi alt alan
   * adlarının hepsinde HTTPS olduğu teyit edilmedi.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=31536000" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      /* www -> kök. Sunucu/proxy bunu zaten yapıyorsa kural hiç tetiklenmez. */
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: "www.servomold.com.tr" }],
        destination: "https://servomold.com.tr/:path*",
        permanent: true,
      },

      /* --- Kurumsal sayfalar --- */
      p("/page/hakkimizda", "/hakkimizda"),
      p("/page/misyon-vizyon", "/hakkimizda"),
      p("/page/partnerlerimiz", "/hakkimizda"),
      p("/page/iletisim", "/iletisim"),

      /* --- Ürünler -> hizmetler (birebir) --- */
      p("/urunler", "/hizmetler"),
      ...ESKI_URUNLER.map(([eski, yeni]) => p(`/urunler/${eski}`, `/hizmetler/${yeni}`)),

      /* Tabloda olmayan eski ürün/sayfa adresleri 404 yerine bölüm köküne.
         Özel kurallardan SONRA — ilk eşleşen kazanır. */
      p("/urunler/:slug*", "/hizmetler"),
      p("/page/:slug*", "/hakkimizda"),
    ];
  },
};

export default withNextIntl(nextConfig);
