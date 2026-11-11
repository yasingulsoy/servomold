# İçerik notları — firmadan teyit ya da ek bilgi gerekenler

Sitedeki ServoMold'a ait her iddia eski sitede yazanlardan ibaret: 2010
kuruluş, ürün listesi, fason işleme listesi, dört ilke, misyon, adres,
telefon, e-posta. Kalıp türlerinin ne olduğu ve teklif için ne gerektiği
genel bilgi. Aşağıdakiler gelmeden siteye yazılmaz; geldikçe ilgili dosyaya
işlenir.

## Görseller

- [ ] **Vektör logo** (AI, EPS, PDF ya da SVG). Elimizde yalnız 546 piksellik
  PNG var; amblem ondan yeniden çizildi (`src/lib/amblem.ts`). Koyu zemin
  sürümünde çarkın arkasına açık bir disk eklendi, yoksa grafit çark koyu
  üst bilgide kayboluyordu. Gerçek logo gelince çizim onunla değişir,
  `node scripts/amblem-uret.mts` favicon ve SVG dosyalarını yeniden üretir.
- [ ] **Gerçek atölye, tezgâh ve kalıp fotoğrafları.** Mevcutların çoğu stok
  fotoğraf ya da 3B çizim (bkz. `docs/eski-site/README.md`). Hizmet görselleri
  346×286 piksel; büyütülünce bulanıklaşıyor, sitede o yüzden küçük kutuda ve
  gri tonlu duruyor. En az şunlar gerekli: atölye genel görünüm, CNC tezgâhı
  başında iş, her kalıp ailesinden bitmiş bir kalıp, işlenmiş parça örnekleri.
  Yatay, en az 1600 piksel genişlik.
- [ ] Üretim hatları görseli eski sitedekinin kırpılmış hâli
  (`hizmetler/uretim-hatlari-servosteel.jpg`, 342×182; beyaz bant ve sarı
  çerçeve atıldı). Servosteel'in kendi sitesindeki büyük hat fotoğraflarından
  biriyle değiştirilebilir.
- [ ] **Partner marka logolarının kullanım izni** (SKF, Festo, Schneider
  Electric, Rexroth, Siemens). Eski sitede "Partnerlerimiz" başlığıyla
  duruyordu; yeni sitede daha temkinli "Projelerimizde kullandığımız markalar"
  yazıyor. Yetkili bayilik ya da resmî ortaklık yoksa bu başlık kalmalı; izin
  şüpheliyse şerit kaldırılır (`MarkaSeridi`, `src/components/bantlar.tsx`).

## Bilgi

- [ ] **"Metal enjeksiyon" = basınçlı döküm varsayımı.** Eski sitedeki
  "M İnjeksiyon / Metal İnjeksiyon" alüminyum–zamak basınçlı döküm kalıbı
  olarak yazıldı (İngilizcesi "die-casting molds"). Firma toz metal
  enjeksiyonu (MIM) kastediyorsa sayfa baştan yazılır
  (`src/lib/hizmetler.ts` › `metal-enjeksiyon-kaliplari`).
- [ ] **Tezgâh parkı**: CNC torna/freze sayısı, marka, model, işleme alanı
  (X/Y/Z), tel erozyon ya da dalma erozyon var mı.
- [ ] **Kalıp ölçü sınırları**: en büyük kalıp boyutu/ağırlığı, deneme
  yapılabilen pres tonajı.
- [ ] **Referanslar**: adı yazılabilecek müşteriler ya da sektörler, izinli
  proje fotoğrafları.
- [ ] **Sertifikalar** (ISO 9001 vb.) — varsa belge.
- [ ] **Süreç adımları** (ana sayfa, "Teknik resimden teslime"): beş adım genel
  bir kalıp akışı olarak yazıldı. Firmanın gerçek akışıyla teyit edilmeli
  (deneme baskısı müşteride mi yapılıyor, numune onayı nasıl, teslim sonrası
  bakım/revizyon var mı).
- [ ] **Telefon WhatsApp'ta var mı?** (0546 294 55 54 cep numarası.) Varsa
  WhatsApp düğmesi eklenir.
- [ ] **Çalışma saatleri** — şemaya (`openingHours`) ve iletişim sayfasına.
- [ ] **Harita konumu**: harita şu an adres metniyle arıyor; koordinat ya da
  Google İşletme Profili bağlantısı gelirse kesinleşir (`src/lib/site.ts`).
  Google İşletme Profili var mı, yoksa açılmalı.
- [ ] **Posta kodu ve ticari unvan** (şemadaki adres için; uydurulmadı).
- [ ] **İngilizce metinlerin gözden geçirilmesi** — `src/messages/en.json` ve
  `src/lib/hizmetler.ts` içindeki `en` blokları.

## Teknik

- [ ] **SMTP bilgileri**: teklif formu hangi kutudan gönderecek
  (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`) ve talepler
  kime gidecek (`TEKLIF_ALICI`, varsayılan info@servomold.com.tr). Tanımlanana
  kadar form ziyaretçiye e-posta adresini gösterir; talep kaybolmaz ama
  dosyalar gelmez.
- [ ] **Yayın**: Dokploy'da uygulama, alan adı (servomold.com.tr + www), GitHub
  deposu. Ayrıntılar `README.md` › Yayın.
- [ ] Yayından sonra Search Console mülkü, site haritası gönderimi ve eski
  adreslerin (`next.config.ts`) canlıda denenmesi.
