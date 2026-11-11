/**
 * Teklif formunun kuralları — hem istemcideki form hem /api/teklif aynı
 * değerleri kullanır; sınır tek yerden değişir.
 */

export const TEKLIF_UZANTILAR = ["pdf", "dwg", "dxf", "step", "stp", "igs", "iges", "jpg", "jpeg", "png", "zip"];

/** Dosyaların toplam boyutu (bayt). */
export const TEKLIF_TOPLAM_SINIR = 15 * 1024 * 1024;

/** Tek talepte en çok dosya sayısı. */
export const TEKLIF_DOSYA_SAYISI = 10;

/** Alan uzunluk sınırları (karakter). */
export const ALAN_SINIRI = {
  ad: 120,
  firma: 160,
  eposta: 200,
  telefon: 40,
  hizmet: 60,
  mesaj: 5000,
} as const;

/** Bal kabı alanının adı: insan görmez, bot doldurur. */
export const BAL_KABI = "web_sitesi";

/** Kaba ama yeterli: boşluksuz, tek @, noktalı alan adı. Asıl doğrulama yanıt e-postası. */
export const EPOSTA_DESENI = /^[^\s@<>()",;]+@[^\s@<>()",;]+\.[^\s@<>()",;]{2,}$/;

/** API'nin döndürdüğü hata kodları; istemci bunları çeviriye eşler. */
export type TeklifHata = "alan" | "eposta" | "buyuk" | "tur" | "sik" | "kapali" | "genel";

export function uzanti(dosyaAdi: string) {
  const i = dosyaAdi.lastIndexOf(".");
  return i < 0 ? "" : dosyaAdi.slice(i + 1).toLowerCase();
}

export function uzantiUygun(dosyaAdi: string) {
  return TEKLIF_UZANTILAR.includes(uzanti(dosyaAdi));
}

export function boyutYaz(bayt: number, locale: string) {
  const mb = bayt / (1024 * 1024);
  const sayi = new Intl.NumberFormat(locale, { maximumFractionDigits: mb < 10 ? 1 : 0 });
  if (mb >= 0.1) return `${sayi.format(mb)} MB`;
  return `${sayi.format(Math.max(1, Math.round(bayt / 1024)))} KB`;
}
