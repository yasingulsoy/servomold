/** Marka adı. Logoda "Servo Mold" iki kelime; kanal ve kardeş site "ServoMold" yazıyor. */
export const SITE_NAME = "ServoMold";
export const ALT_NAME = "Servo Mold";

export const PRODUCTION_URL = "https://servomold.com.tr";

/** Canonical, sitemap ve OG için kök adres. Ortamda verilmediyse canlı adres. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || PRODUCTION_URL).replace(/\/+$/, "");

/**
 * Site yalnızca canlı adreste arama motorlarına açılır. Ortam değişkeni
 * açıkça canlı adresi göstermiyorsa (yerel, önizleme, Dokploy alt alan adı)
 * her sayfa noindex, robots.txt de Disallow döner.
 */
export const IS_PRODUCTION_SITE = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/+$/, "") === PRODUCTION_URL;

export const FOUNDED = 2010;

export const CONTACT = {
  phone: "+90 546 294 55 54",
  phoneHref: "tel:+905462945554",
  email: "info@servomold.com.tr",
  street: "Dudullu OSB Mah. DES 113. Sokak, C02 Blok No:13",
  district: "Ümraniye",
  city: "İstanbul",
  country: "TR",
  /** Harita bağlantısı — adres metniyle arama (koordinat teyit edilmedi). */
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Dudullu OSB DES 113. Sokak C02 Blok No:13 Ümraniye İstanbul"),
  mapsEmbed:
    "https://www.google.com/maps?output=embed&q=" +
    encodeURIComponent("Dudullu OSB DES 113. Sokak C02 Blok No:13 Ümraniye İstanbul"),
} as const;

export const YOUTUBE_URL = "https://www.youtube.com/@ServoSteel.ServoMold";
/** Resmî kanaldaki ortak tanıtım videosu: "ServoSteel & ServoMold". */
export const TANITIM_VIDEOSU = "PVT9TJByKZA";

export const SERVOSTEEL = {
  name: "Servosteel",
  url: "https://servosteel.com.tr",
  urlEn: "https://servosteel.com.tr/en",
} as const;
