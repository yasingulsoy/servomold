import type { AppLocale } from "@/i18n/routing";

/**
 * Hizmetler — sitenin omurgası. Sıra, ana sayfadaki ve menüdeki sıradır.
 *
 * İçerik kuralı: ServoMold'a ait iddia yalnızca eski sitede yazanlardır
 * (2010, ürün listesi, fason işleme listesi, ilkeler). Kalıp türlerinin ne
 * olduğu, nerede kullanıldığı ve teklif için ne gerektiği genel bilgidir.
 * Tezgâh parkı, kalıp ölçü sınırları, referans müşteri gibi bilgiler
 * firmadan gelmeden yazılmaz — bkz. docs/ICERIK-NOTLARI.md.
 */

export type HizmetMetni = {
  ad: string;
  kisa: string;
  /** Sayfa başlığı (SEO) */
  baslik: string;
  aciklama: string;
  giris: string[];
  /** Kutu başlığı + maddeler */
  kapsam: { baslik: string; maddeler: string[] };
  kullanim: string[];
  teklifIcin: string[];
};

export type Hizmet = {
  /** Dahili (Türkçe) slug — URL'de tr olarak görünür */
  slug: string;
  /** İngilizce URL parçası */
  en: string;
  gorsel: string;
  gorselAlt: Record<AppLocale, string>;
  /** Grup şirketine yönlendiren hizmet */
  dis?: "servosteel";
  metin: Record<AppLocale, HizmetMetni>;
};

export const HIZMETLER: Hizmet[] = [
  {
    slug: "kesme-kaliplari",
    en: "cutting-dies",
    gorsel: "/gorseller/hizmetler/kesme-kaliplari.jpg",
    gorselAlt: { tr: "Kılavuz kolonlu kesme kalıbı", en: "Guided cutting die set" },
    metin: {
      tr: {
        ad: "Kesme kalıpları",
        kisa: "Sacdan kesme ve delme için pres kalıpları.",
        baslik: "Kesme kalıbı imalatı",
        aciklama:
          "Sac parçalar için kesme ve delme kalıpları. ServoMold, kalıbı parçanızın teknik resmine ve kullanacağınız prese göre tasarlar ve üretir. Dudullu OSB, İstanbul.",
        giris: [
          "Kesme kalıbı, sac levhadan istenen konturdaki parçayı preste tek vuruşta ayırır ya da üzerine delik açar. Parçanın ölçü tutarlılığı, kesme kenarındaki çapak ve kalıbın ömrü; zımba ile dişi kalıp arasındaki boşluğa, kalıp çeliğinin seçimine ve işleme hassasiyetine bağlıdır.",
          "ServoMold 2010'dan beri kesme kalıbı üretiyor. Kalıbı parçanızın teknik resmine, malzemesine ve kullanacağınız prese göre tasarlıyor, kendi atölyemizde işleyip teslim ediyoruz.",
        ],
        kapsam: {
          baslik: "Kalıbı belirleyen sorular",
          maddeler: [
            "Parça tek vuruşta mı kesilecek, yoksa delme ve kesme ayrı istasyonlarda mı?",
            "Sac kalınlığı ve malzemesine göre zımba–matris boşluğu",
            "Beklenen adet: kalıp çeliği ve sertleştirme buna göre seçilir",
            "Pres tonajı, tabla ölçüsü ve kapalı yükseklik",
          ],
        },
        kullanim: ["Otomotiv yan sanayi", "Beyaz eşya", "Elektrik pano ve kutuları", "Mobilya ve bağlantı elemanları"],
        teklifIcin: [
          "Parça teknik resmi (DWG, DXF, STEP ya da PDF)",
          "Malzeme cinsi ve sac kalınlığı",
          "Yıllık ya da parti başına adet",
          "Kullanılacak presin tonajı ve tabla ölçüsü",
        ],
      },
      en: {
        ad: "Cutting dies",
        kisa: "Press tools for blanking and piercing sheet metal.",
        baslik: "Cutting die manufacturing",
        aciklama:
          "Blanking and piercing dies for sheet metal parts, designed around your drawing and your press. ServoMold, Dudullu OSB, Istanbul, Türkiye.",
        giris: [
          "A cutting die separates a part of the required contour from sheet metal in a single press stroke, or pierces holes in it. Dimensional consistency, burr at the cut edge and tool life all depend on the punch-to-die clearance, the choice of tool steel and machining accuracy.",
          "ServoMold has been building cutting dies since 2010. We design each die around your part drawing, material and press, then machine and deliver it from our own workshop.",
        ],
        kapsam: {
          baslik: "Questions that shape the die",
          maddeler: [
            "Is the part cut in one stroke, or are piercing and blanking separate stations?",
            "Punch-to-die clearance for your sheet thickness and material",
            "Expected volume: tool steel and hardening are chosen accordingly",
            "Press tonnage, bolster size and shut height",
          ],
        },
        kullanim: ["Automotive suppliers", "Home appliances", "Electrical enclosures", "Furniture and fasteners"],
        teklifIcin: [
          "Part drawing (DWG, DXF, STEP or PDF)",
          "Material grade and sheet thickness",
          "Annual or batch quantity",
          "Press tonnage and bolster size",
        ],
      },
    },
  },
  {
    slug: "bukme-kaliplari",
    en: "bending-dies",
    gorsel: "/gorseller/hizmetler/bukme-kaliplari.jpg",
    gorselAlt: { tr: "Abkant preste sac bükme", en: "Sheet bending on a press brake" },
    metin: {
      tr: {
        ad: "Bükme kalıpları",
        kisa: "Abkant ve eksantrik pres için bükme ve form kalıpları.",
        baslik: "Bükme kalıbı imalatı",
        aciklama:
          "Abkant, eksantrik ve hidrolik presler için bükme ve form verme kalıpları. Teknik resminize göre tasarım ve imalat. ServoMold, İstanbul.",
        giris: [
          "Bükme kalıbı sac parçaya açı ve form verir. Abkant preslerdeki üst bıçak–alt matris takımlarından, eksantrik ya da hidrolik preste tek vuruşta form veren özel kalıplara kadar geniş bir aileyi kapsar.",
          "Geri esneme, iç bükme yarıçapı ve sac kalınlığı kalıbın ölçülerini belirler. Bu yüzden bükme kalıbını parçanın kendisinden, kullanılacak malzemeden ve presinizden başlayarak tasarlıyoruz.",
        ],
        kapsam: {
          baslik: "Kalıbı belirleyen sorular",
          maddeler: [
            "Bükme açıları, iç yarıçap ve tolerans",
            "Malzemenin geri esneme payı",
            "Tek bükme mi, birden fazla form tek vuruşta mı?",
            "Pres tipi: abkant, eksantrik ya da hidrolik",
          ],
        },
        kullanim: ["Kutu ve pano gövdeleri", "Braketler ve bağlantı parçaları", "Profiller", "Raf ve depolama sistemleri"],
        teklifIcin: [
          "Parça teknik resmi ya da açınımı",
          "Malzeme cinsi ve sac kalınlığı",
          "Açı ve yarıçap toleransları",
          "Pres tipi ve tonajı",
        ],
      },
      en: {
        ad: "Bending dies",
        kisa: "Bending and forming dies for press brakes and power presses.",
        baslik: "Bending die manufacturing",
        aciklama:
          "Bending and forming dies for press brakes, mechanical and hydraulic presses, built to your drawing. ServoMold, Istanbul, Türkiye.",
        giris: [
          "A bending die gives sheet metal its angle and form. The family ranges from punch-and-die sets for press brakes to dedicated forming dies that shape a part in one stroke on a mechanical or hydraulic press.",
          "Springback, inside bend radius and sheet thickness set the dimensions of the die. That is why we design a bending die starting from the part itself, the material and your press.",
        ],
        kapsam: {
          baslik: "Questions that shape the die",
          maddeler: [
            "Bend angles, inside radius and tolerance",
            "Springback allowance of the material",
            "A single bend, or several forms in one stroke?",
            "Press type: press brake, mechanical or hydraulic",
          ],
        },
        kullanim: ["Enclosures and cabinets", "Brackets and fittings", "Profiles", "Shelving and storage systems"],
        teklifIcin: [
          "Part drawing or flat pattern",
          "Material grade and sheet thickness",
          "Angle and radius tolerances",
          "Press type and tonnage",
        ],
      },
    },
  },
  {
    slug: "plastik-enjeksiyon-kaliplari",
    en: "plastic-injection-molds",
    gorsel: "/gorseller/hizmetler/plastik-enjeksiyon-kaliplari.jpg",
    gorselAlt: { tr: "Şişe için plastik enjeksiyon kalıbı", en: "Plastic injection mold for a bottle" },
    metin: {
      tr: {
        ad: "Plastik enjeksiyon kalıpları",
        kisa: "Plastik parçaların seri üretimi için enjeksiyon kalıpları.",
        baslik: "Plastik enjeksiyon kalıbı imalatı",
        aciklama:
          "Plastik parçalarınız için enjeksiyon kalıbı tasarımı ve imalatı. 3B modelden ya da numuneden kalıba. ServoMold, Dudullu OSB, İstanbul.",
        giris: [
          "Plastik enjeksiyon kalıbı, ergimiş plastiğin basınçla doldurulduğu, parçanın soğuyup şekil aldığı çelik takımdır. Parçanın yüzeyi ve ölçüsü kalıp gözünün işleme hassasiyetine; çevrim süresi ise soğutma kanallarının yerleşimine bağlıdır.",
          "Yolluk tipi, göz sayısı ve parçanın kalıptan çıkış açıları baştan doğru kurulursa kalıp seri üretimde sorun çıkarmaz. Bu kararları parçanızın modeli, malzemesi ve yıllık adedi üzerinden sizinle birlikte veriyoruz.",
        ],
        kapsam: {
          baslik: "Kalıbı belirleyen sorular",
          maddeler: [
            "Parça malzemesi: PP, ABS, PA, PC…",
            "Göz sayısı ve yıllık adet",
            "Yolluk tipi ve parçadaki iz beklentisi",
            "Enjeksiyon makinesinin tonajı ve kalıp bağlama ölçüsü",
          ],
        },
        kullanim: ["Ambalaj, şişe ve kapak", "Beyaz eşya parçaları", "Otomotiv iç aksam", "Elektrik ve elektronik muhafazalar"],
        teklifIcin: [
          "Parçanın 3B modeli (STEP, IGES) ya da numunesi",
          "Plastik malzeme cinsi",
          "Yıllık adet ve istenen göz sayısı",
          "Enjeksiyon makinesinin tonajı",
        ],
      },
      en: {
        ad: "Plastic injection molds",
        kisa: "Injection molds for series production of plastic parts.",
        baslik: "Plastic injection mold making",
        aciklama:
          "Design and manufacture of injection molds for your plastic parts, from 3D model or sample. ServoMold, Dudullu OSB, Istanbul, Türkiye.",
        giris: [
          "A plastic injection mold is the steel tool that molten plastic is injected into under pressure, where the part cools and takes its shape. Surface finish and dimensions depend on how precisely the cavity is machined; cycle time depends on the cooling layout.",
          "When the gate type, cavity count and draft angles are right from the start, the mold runs without trouble in production. We make these decisions with you, based on your part model, material and annual volume.",
        ],
        kapsam: {
          baslik: "Questions that shape the mold",
          maddeler: [
            "Part material: PP, ABS, PA, PC…",
            "Cavity count and annual volume",
            "Gate type and acceptable gate mark",
            "Injection machine tonnage and platen size",
          ],
        },
        kullanim: ["Packaging, bottles and caps", "Home appliance parts", "Automotive interior parts", "Electrical and electronic housings"],
        teklifIcin: [
          "3D model of the part (STEP, IGES) or a sample",
          "Plastic material grade",
          "Annual volume and preferred cavity count",
          "Injection machine tonnage",
        ],
      },
    },
  },
  {
    slug: "metal-enjeksiyon-kaliplari",
    en: "die-casting-molds",
    gorsel: "/gorseller/hizmetler/metal-enjeksiyon-kaliplari.jpg",
    gorselAlt: { tr: "Alüminyum basınçlı döküm kalıbı ve parçalar", en: "Aluminium die-casting mold and parts" },
    metin: {
      tr: {
        ad: "Metal enjeksiyon kalıpları",
        kisa: "Alüminyum ve zamak parçalar için basınçlı döküm kalıpları.",
        baslik: "Metal enjeksiyon kalıbı imalatı",
        aciklama:
          "Alüminyum ve zamak parçalar için metal enjeksiyon (basınçlı döküm) kalıbı tasarımı ve imalatı. ServoMold, Dudullu OSB, İstanbul.",
        giris: [
          "Metal enjeksiyon kalıbı, ergimiş alüminyum ya da zamak alaşımının yüksek basınçla kalıp boşluğuna basıldığı takımdır. Yüksek sıcaklığa ve basınca her çevrimde yeniden dayanması gerektiği için sıcak iş takım çeliğinden yapılır.",
          "Yolluk, hava tahliyesi ve soğutma tasarımı parçanın gözeneksiz ve ölçüsünde çıkmasını belirler. Kalıbı parçanızın modeli, alaşımı ve döküm makinesi üzerinden tasarlıyoruz.",
        ],
        kapsam: {
          baslik: "Kalıbı belirleyen sorular",
          maddeler: [
            "Alaşım: alüminyum mu, zamak mı?",
            "Parçanın et kalınlıkları ve gözenek beklentisi",
            "Maça ve sürgü ihtiyacı",
            "Döküm makinesinin kapama kuvveti",
          ],
        },
        kullanim: ["Motor ve pompa gövdeleri", "Aydınlatma armatürleri", "Kapı ve pencere aksesuarları", "Elektrik muhafazaları"],
        teklifIcin: [
          "Parçanın 3B modeli (STEP, IGES)",
          "Alaşım cinsi",
          "Yıllık adet",
          "Döküm makinesinin kapama kuvveti",
        ],
      },
      en: {
        ad: "Die-casting molds",
        kisa: "High-pressure die-casting molds for aluminium and zamak parts.",
        baslik: "Die-casting mold making",
        aciklama:
          "Design and manufacture of high-pressure die-casting (metal injection) molds for aluminium and zamak parts. ServoMold, Istanbul, Türkiye.",
        giris: [
          "A die-casting mold is the tool that molten aluminium or zamak is forced into under high pressure. Because it has to withstand that heat and pressure again on every shot, it is made from hot-work tool steel.",
          "Gating, venting and cooling design decide whether the part comes out free of porosity and on size. We design the mold around your part model, alloy and casting machine.",
        ],
        kapsam: {
          baslik: "Questions that shape the mold",
          maddeler: [
            "Alloy: aluminium or zamak?",
            "Wall thicknesses and acceptable porosity",
            "Cores and slides required",
            "Locking force of the casting machine",
          ],
        },
        kullanim: ["Motor and pump housings", "Lighting fixtures", "Door and window hardware", "Electrical housings"],
        teklifIcin: ["3D model of the part (STEP, IGES)", "Alloy", "Annual volume", "Locking force of the casting machine"],
      },
    },
  },
  {
    slug: "fason-cnc-isleme",
    en: "cnc-machining",
    gorsel: "/gorseller/hizmetler/fason-cnc-isleme.jpg",
    gorselAlt: { tr: "CNC frezede parça işleme", en: "Machining a part on a CNC mill" },
    metin: {
      tr: {
        ad: "Fason CNC işleme",
        kisa: "CNC torna, CNC freze ve talaşlı imalat; çiziminize göre.",
        baslik: "Fason CNC torna ve freze işleme",
        aciklama:
          "Fason CNC torna, CNC freze, üniversal freze, manuel torna, talaşlı yedek parça imalatı ve gazaltı kaynak. Dudullu OSB, Ümraniye, İstanbul.",
        giris: [
          "Kalıplarımızı işlediğimiz tezgâhlarda sizin çiziminize göre parça da işliyoruz. Tek bir yedek parçadan seri parçaya kadar talaşlı imalat işlerinizi Dudullu OSB'deki atölyemizde yapıyoruz.",
          "Gönderdiğiniz teknik resmi malzeme, adet, tolerans ve termin üzerinden değerlendirip teklifimizi iletiyoruz.",
        ],
        kapsam: {
          baslik: "Yaptığımız işler",
          maddeler: [
            "Fason CNC torna",
            "Fason CNC freze",
            "Manuel torna işleri",
            "Üniversal freze işleri",
            "Kalıpçı freze işleri",
            "Talaşlı yedek parça imalatı",
            "Gazaltı kaynak işleri",
          ],
        },
        kullanim: ["Makine yedek parçaları", "Fikstür ve aparatlar", "Kalıp parçaları", "Prototip parçalar"],
        teklifIcin: [
          "Teknik resim (PDF, DWG ya da STEP)",
          "Malzeme cinsi",
          "Adet",
          "Tolerans, yüzey ve termin beklentisi",
        ],
      },
      en: {
        ad: "CNC machining",
        kisa: "Contract CNC turning, milling and machining to your drawing.",
        baslik: "Contract CNC turning and milling",
        aciklama:
          "Contract CNC turning, CNC milling, universal milling, manual turning, machined spare parts and MIG/MAG welding. Dudullu OSB, Istanbul, Türkiye.",
        giris: [
          "The machines we use to build our molds also machine parts to your drawing. From a single spare part to series parts, we handle your machining work in our workshop in Dudullu OSB.",
          "We review your drawing against material, quantity, tolerance and lead time, then send you our quotation.",
        ],
        kapsam: {
          baslik: "What we do",
          maddeler: [
            "Contract CNC turning",
            "Contract CNC milling",
            "Manual turning",
            "Universal milling",
            "Toolroom milling",
            "Machined spare parts",
            "MIG/MAG welding",
          ],
        },
        kullanim: ["Machine spare parts", "Fixtures and jigs", "Mold components", "Prototype parts"],
        teklifIcin: ["Drawing (PDF, DWG or STEP)", "Material grade", "Quantity", "Tolerance, surface finish and lead time"],
      },
    },
  },
  {
    slug: "uretim-hatlari",
    en: "production-lines",
    dis: "servosteel",
    gorsel: "/gorseller/hizmetler/uretim-hatlari.jpg",
    gorselAlt: { tr: "Servosteel pres besleme hattı", en: "Servosteel press feeding line" },
    metin: {
      tr: {
        ad: "Üretim hatları",
        kisa: "Kardeş şirketimiz Servosteel'in pres besleme ve rulo sac işleme hatları.",
        baslik: "Pres besleme ve üretim hatları",
        aciklama:
          "Kalıplarınızı çalıştıracak pres besleme hatları ve rulo sac işleme hatları, grup şirketimiz Servosteel'den.",
        giris: [
          "Kalıp tek başına üretim yapmaz: sacı prese düzgün ve doğru adımla getiren hat da en az kalıp kadar önemlidir. Grup şirketimiz Servosteel; rulo açıcı, doğrultma ve servo besleme ünitelerinden oluşan pres besleme hatlarını ve rulo sac işleme hatlarını tasarlayıp üretiyor.",
          "Kalıbı ServoMold'dan, hattı Servosteel'den aldığınızda kalıp, pres ve besleme baştan birlikte planlanır.",
        ],
        kapsam: {
          baslik: "Servosteel'in ürettikleri",
          maddeler: [
            "Pres besleme hatları",
            "Rulo açıcılar",
            "Doğrultma makineleri",
            "Servo besleme üniteleri",
            "Boy kesme ve dilme hatları",
          ],
        },
        kullanim: ["Otomotiv yan sanayi", "Beyaz eşya", "Çelik servis merkezleri", "Metal eşya üreticileri"],
        teklifIcin: ["Sac genişliği ve kalınlık aralığı", "Rulo ağırlığı", "Pres tipi ve hızı", "Besleme adımı"],
      },
      en: {
        ad: "Production lines",
        kisa: "Press feeding and coil processing lines by our sister company Servosteel.",
        baslik: "Press feeding and production lines",
        aciklama:
          "Press feeding lines and coil processing lines to run your dies, from our group company Servosteel.",
        giris: [
          "A die does not produce on its own: the line that brings the strip to the press straight and at the right pitch matters as much as the die. Our group company Servosteel designs and builds press feeding lines made of decoilers, straighteners and servo feeders, as well as coil processing lines.",
          "When the die comes from ServoMold and the line from Servosteel, die, press and feeding are planned together from the start.",
        ],
        kapsam: {
          baslik: "What Servosteel builds",
          maddeler: ["Press feeding lines", "Decoilers", "Straighteners", "Servo feeders", "Cut-to-length and slitting lines"],
        },
        kullanim: ["Automotive suppliers", "Home appliances", "Steel service centres", "Metal goods manufacturers"],
        teklifIcin: ["Strip width and thickness range", "Coil weight", "Press type and speed", "Feed pitch"],
      },
    },
  },
];

export function hizmetBul(slug: string) {
  return HIZMETLER.find((h) => h.slug === slug);
}
