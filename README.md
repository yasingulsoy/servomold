# ServoMold — servomold.com.tr

ServoMold'un (Servosteel'in kardeş kalıp firması) web sitesi. Kesme, bükme,
plastik enjeksiyon ve metal enjeksiyon kalıpları; fason CNC işleme; grup
şirketi Servosteel'in üretim hatlarına yönlendirme. Türkçe kökte, İngilizce
`/en` altında.

Next.js 16 (App Router, Turbopack), React 19, next-intl 4, Tailwind CSS 4,
nodemailer. Veritabanı yok; bütün içerik depoda.

## Çalıştırma

```bash
npm ci
npm run dev          # http://localhost:3200
npm run build && npm start   # üretim derlemesi, varsayılan port 3000 (PORT ile değişir)
npm run lint
npx next typegen && npx tsc --noEmit
```

Node 22 (`.nvmrc`). `next dev` aynı dizinde ikinci kez açılmaz (kilit
dosyası); `next build` ise çalışan dev sunucusunun yanında çalışabilir.

## Sayfalar

| Türkçe | İngilizce | Dosya |
|---|---|---|
| `/` | `/en` | `src/app/[locale]/page.tsx` |
| `/hizmetler` | `/en/services` | `src/app/[locale]/hizmetler/page.tsx` |
| `/hizmetler/{slug}` (6 hizmet) | `/en/services/{en-slug}` | `src/app/[locale]/hizmetler/[slug]/page.tsx` |
| `/hakkimizda` | `/en/about` | `src/app/[locale]/hakkimizda/page.tsx` |
| `/iletisim` | `/en/contact` | `src/app/[locale]/iletisim/page.tsx` |

Bilinmeyen yollar `[...rest]` üzerinden dilin kendi 404'üne düşer.
`/api/teklif` teklif formunu e-postaya çevirir. `sitemap.xml` ve `robots.txt`
`src/app` altında üretilir.

## İçerik nerede

- Arayüz metinleri: `src/messages/tr.json`, `src/messages/en.json` (aynı
  anahtarlar; tipler tr.json'dan denetlenir, `src/global.d.ts`).
- Hizmetler (ad, açıklama, kapsam, kullanım, teklif için gerekenler, URL
  parçaları): `src/lib/hizmetler.ts`.
- İletişim, kuruluş yılı, YouTube, Servosteel adresleri: `src/lib/site.ts`.
- Yerelleştirilmiş yollar: `src/i18n/routing.ts`; canonical/hreflang ve sayfa
  metadata'sı: `src/i18n/seo.ts`.
- Eski sitenin arşivi ve eski→yeni adres tablosu: `docs/eski-site/README.md`;
  yönlendirmeler `next.config.ts`.
- Firmadan beklenenler: `docs/ICERIK-NOTLARI.md`.

**İçerik kuralı:** ServoMold'a ait iddia yalnız eski sitede yazanlar. Tezgâh
sayısı, kalıp ölçüsü, müşteri adı, sertifika, rakam firmadan gelmeden
yazılmaz. Eski sitedeki Paşa Kalıp videosu ve sosyal hesapları başka firmanın;
kullanılmaz.

## Tasarım

`src/app/globals.css` — Tailwind v4 `@theme`. Amber `#F0B000` ve grafit
`#404040` logodan; koyu kabuk `#0e1012` (hero, süreç, altbilgi, alt sayfa
başlıkları); açık zeminde amber metin `#8a5800` (AA). Yazı Barlow + Barlow
Condensed. Motifler: teknik çizim ızgarası (`izgara`), ölçü çizgisi
(`OlcuCizgisi`), kırpma işaretli görsel çerçevesi (`kirpma`, `Cerceve`),
büyük harf etiket (`etiket`), numaralı bölüm başlığı (`BolumBasligi`).

Amblem `src/lib/amblem.ts`'te SVG olarak çizili; `node scripts/amblem-uret.mts`
favicon (`src/app/icon.svg`, `apple-icon.png`) ve `public/gorseller/logo/*.svg`
dosyalarını ondan üretir.

## Ortam değişkenleri

`.env.example`'a bakın; gerçek değerler depoya girmez.

| Değişken | Ne zaman | Açıklama |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | **derleme** | Canlıda tam olarak `https://servomold.com.tr`. Başka her değerde (ya da boşken) bütün sayfalar `noindex`, `robots.txt` `Disallow: /`. `NEXT_PUBLIC_` değeri derlemeye gömülür: değiştirince yeniden derleyin. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | çalışma | Teklif formunun gönderdiği kutu. Port 465 ise SSL, değilse STARTTLS. Biri eksikse form 503 döner ve ziyaretçiye info@servomold.com.tr adresini gösterir. |
| `SMTP_FROM` | çalışma | Gönderen adresi; boşsa `SMTP_USER`. |
| `TEKLIF_ALICI` | çalışma | Taleplerin gideceği adres; boşsa info@servomold.com.tr. Yanıtla ziyaretçiye gider (`replyTo`). |
| `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION` | derleme | İsteğe bağlı doğrulama meta etiketleri. |

## Teklif formu

`src/components/teklif-formu.tsx` → `src/app/api/teklif/route.ts`. Zorunlu:
ad, e-posta, mesaj. Dosyalar en çok 10 adet, toplam 15 MB; uzantılar pdf, dwg,
dxf, step, stp, igs, iges, jpg, jpeg, png, zip (kurallar
`src/lib/teklif.ts`'te, istemci ve sunucu ortak). Bal kabı alanı dolu gelirse
başarılı yanıt verilir, hiçbir şey gönderilmez. IP başına 10 dakikada 5 talep
(bellekte; süreç yeniden başlayınca sıfırlanır).

`/api` proxy'den (`src/proxy.ts`) geçmez: proxy istek gövdesini 10 MB'ta
keserdi.

## Yayın

Henüz yayında değil. Gerekenler:

1. Dokploy'da uygulama, bu deponun GitHub kopyasından (dal `main`, derleme
   `npm run build`, başlatma `npm start`; Node sürümü `.nvmrc`'den).
2. Ortam: en az `NEXT_PUBLIC_SITE_URL=https://servomold.com.tr` (derleme
   ortamında da tanımlı olmalı) ve SMTP değişkenleri.
3. Alan adı: `servomold.com.tr` ve `www.servomold.com.tr` uygulamaya; HTTPS
   sertifikası. `www` kökü `next.config.ts`'teki kuralla köke yönlenir.
   **Posta kayıtlarına (MX, SPF, DKIM) dokunulmaz** — yalnız web kayıtları
   değişir.
4. Yayından sonra: eski adresleri canlıda deneyin (`/urunler/kesme-kalip/`,
   `/page/hakkimizda/` vb. yeni sayfaya 308 vermeli), formu bir kez gerçek
   gönderimle sınayın, Search Console'da mülk açıp `sitemap.xml` gönderin.
