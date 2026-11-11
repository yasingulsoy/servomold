# Eski site arşivi — servomold.com.tr

11 Kasım 2026'da canlı siteden alındı (CMS pro! v4.10, "webbayii" teması).
12 sayfa, 19 görsel. Yeni site bu klasördeki dosyalara dokunmaz; sitede
kullanılan kopyalar `public/gorseller/` altında anlamlı adlarla duruyor.

## Görseller

Orijinal dosya adları korunmuştur (URL'deki son parça).

| Orijinal dosya | Boyut | Ne | Eski sitede | Yeni sitede |
|---|---|---|---|---|
| `servo-mold.png` | 546×262, şeffaf | Logo (amblem + "Servo Mold Kalıp Sistemleri") | her sayfa | `logo/servomold-logo.png` |
| `IMG_373922-…CF1C65.png` | 546×262 | Logonun birebir kopyası | Hakkımızda › logolar | — (yinelenen) |
| `IMG_6A9A1F-…C84F8F.jpg` | 346×286 | Kesme kalıbı (3B görsel) | Kesme Kalıp | `hizmetler/kesme-kaliplari.jpg` |
| `IMG_0B5DE8-…33BCA4.jpg` | 346×286 | Abkant bükme (stok) | Bükme Kalıp | `hizmetler/bukme-kaliplari.jpg` |
| `IMG_C5AD6B-…BB1C41.jpg` | 346×286 | Şişe kalıbı (3B görsel) | Plastik Kalıp | `hizmetler/plastik-enjeksiyon-kaliplari.jpg` |
| `IMG_FBF712-…9CC8F0.jpg` | 346×286 | Basınçlı döküm kalıbı (3B görsel) | Metal Enjeksiyon | `hizmetler/metal-enjeksiyon-kaliplari.jpg` |
| `IMG_6377E8-…C4FF06.jpg` | 346×286 | CNC freze, mengene (stok) | Fason CNC İşleme | `hizmetler/fason-cnc-isleme.jpg` |
| `IMG_47DC45-…1D2A90.jpg` | 346×286 | Servosteel pres besleme hattı (üstte/altta beyaz bant, sarı çerçeve) | Üretim Hatları | `hizmetler/uretim-hatlari-servosteel.jpg` (yalnız fotoğraf, 342×182) |
| `IMG_077288-…F9C50D.jpg` | 250×106 | SKF logosu | Partnerlerimiz | `markalar/skf.jpg` |
| `IMG_22C8BA-…8C7A5B.jpg` | 250×106 | FESTO logosu | Partnerlerimiz | `markalar/festo.jpg` |
| `IMG_77A0ED-…F673EB.jpg` | 250×106 | Schneider Electric logosu | Partnerlerimiz | `markalar/schneider-electric.jpg` |
| `IMG_94E3C9-…C2998E.jpg` | 250×106 | Rexroth logosu | Partnerlerimiz | `markalar/rexroth.jpg` |
| `IMG_AB80FC-…112C39.jpg` | 250×106 | Siemens logosu | Partnerlerimiz | `markalar/siemens.jpg` |
| `FILE_0EB3C7-…177860.jpg` | 1920×800 | CNC torna, kıvılcım (stok) | Ana sayfa slayt | `genel/cnc-torna.jpg` |
| `FILE_2B60C1-…9E2CF1.jpg` | 1920×800 | Kalıp yüzeyi frezeleme (stok) | Ana sayfa slayt | `genel/cnc-freze-kalip-yuzeyi.jpg` |
| `FILE_2D795F-…9D8FAB.jpg` | 1920×800 | 5 eksen dişli işleme (stok) | Ana sayfa slayt | `genel/cnc-5-eksen-disli.jpg` |
| `8.jpg` | 1921×821 | Koyu tonda CNC (stok) | Sayfa başlıkları | `genel/cnc-isleme-koyu.jpg` |
| `mobile-slider.jpg` | 725×625 | Kalıp yüzeyi frezeleme, dikey kesit | Mobil slayt | `genel/cnc-freze-dikey.jpg` |
| `1.jpg` | 1658×745 | Dişli görselinin soluk hâli | Arka plan | — (yinelenen) |
| `youtube-PVT9TJByKZA-maxresdefault.jpg` | 1280×720 | "ServoSteel & ServoMold" videosunun kapağı (resmî kanal) | — | `video/servosteel-servomold-tanitim.jpg` |

### Dikkat

- **Görsellerin çoğu stok ya da 3B çizim.** Atölyeden, kalıplardan ve
  işlenmiş parçalardan gerçek fotoğraf gelince ilk iş bunlar değişmeli.
  Ürün görselleri 346×286 piksel; büyük ekranda bulanık duruyor, sitede bu
  yüzden küçük kutularda kullanıldı.
- **Logo yalnızca 546 piksel PNG.** Yeni sitedeki amblem bu PNG'den SVG
  olarak yeniden çizildi (`src/lib/amblem.ts`, sayfada `src/components/amblem.tsx`). Elde vektör logo
  (AI, EPS, PDF, SVG) varsa onunla değiştirilmeli.
- **Eski sitedeki tanıtım videosu ServoMold'un değil.** `bE2QoKX_Q5g`
  "Paşa Kalıp" adlı başka bir firmanın videosu (kişisel bir kanaldan).
  Instagram (`pasha_mould`), Facebook (`pasakalip`) ve "Tüm ürünler"
  bağlantısı (`pasakalip.com.tr`) da aynı firmaya gidiyor; tema büyük
  ihtimalle o siteden kopyalanmış. Bunların hiçbiri yeni siteye alınmadı.
- Google Analytics kodu eski Universal Analytics (`UA-118018309-1`);
  2023'ten beri veri toplamıyor.

## Sayfa metinleri

Eski sitedeki metnin tamamı aşağıdakilerden ibaret. Ürün sayfalarının
hepsinde aynı genel paragraf vardı; ürüne özel metin yoktu.

**Hakkımızda**
> Servo Mold makine 2010 yılında kurulduğu günden itibaren değişmez
> prensipleri olarak daima hizmet ve zamanında teslim uygun fiyat ilkesiyle;
> plastik kalıbı, kesme kalıbı, m injeksiyon ve fason işleme projelerinde
> üretim yapar. Firmamız, alanında uzman kadrosuyla siz değerli
> müşterilerimize hizmet vermektedir. Üretimde başarı ve sürekliliğin
> teminatı hizmette dürüstlük ve kalitedir prensibiyle çalışır.

**Misyon** (vizyon metni yoktu)
> Servo Mold olarak takım ruhu ile çalışarak Türk Makine İmalat ve Montaj
> Sanayinde gelişen teknolojilere paralelliğinde en kaliteli ürünleri
> ihracata sunmaktır.

**Ürün sayfalarındaki ortak paragraf**
> Servomold makine 2010 yılında kurulduğu günden itibaren Fason Cnc Torna,
> Fason Cnc Freze, Manuel Torna İşleri, Universal Freze İşleri, Kalıpçı
> Freze İşleri, Talaşlı Yedek Parça İmalatları, Gazaltı Kaynak İşleri,
> plastik kalıbı, kesme kalıbı, m injeksiyon ve fason işleme projelerinde
> üretim yapar. […]

**Ürünler:** Kesme Kalıp · Bükme Kalıp · Plastik Kalıp · Metal İnjeksiyon ·
Üretim Hatları · Fason CNC İşleme

**İletişim**
- Adres: Dudullu OSB Mah. DES 113. Sokak C02 Blok No:13 Ümraniye İstanbul
- Telefon: 0546 294 55 54
- E-posta: info@servomold.com.tr

## Eski adresler

Yeni sitede kalıcı yönlendirmeleri `next.config.ts` içinde:

| Eski | Yeni |
|---|---|
| `/page/hakkimizda/`, `/page/misyon-vizyon/`, `/page/partnerlerimiz/` | `/hakkimizda` |
| `/page/iletisim/` | `/iletisim` |
| `/urunler/` | `/hizmetler` |
| `/urunler/kesme-kalip/` | `/hizmetler/kesme-kaliplari` |
| `/urunler/bukme-kalip/` | `/hizmetler/bukme-kaliplari` |
| `/urunler/plastik-kalip/` | `/hizmetler/plastik-enjeksiyon-kaliplari` |
| `/urunler/m-injeksiyon/` | `/hizmetler/metal-enjeksiyon-kaliplari` |
| `/urunler/fason-cnc-isleme/` | `/hizmetler/fason-cnc-isleme` |
| `/urunler/uretim-hatlari/` | `/hizmetler/uretim-hatlari` |
