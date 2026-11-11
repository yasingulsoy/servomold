import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, ArrowUpRight, Check, FileText, Mail, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";
import { absoluteUrl, sayfaMeta } from "@/i18n/seo";
import { HIZMETLER, gorselBoyutu, hizmetBul } from "@/lib/hizmetler";
import { CONTACT, SERVOSTEEL, SITE_NAME, SITE_URL } from "@/lib/site";
import { Cerceve } from "@/components/cerceve";
import { JsonLd } from "@/components/json-ld";
import { SayfaBasi } from "@/components/sayfa-basi";
import { TeklifFormu } from "@/components/teklif-formu";

/* Altı hizmetin dışındaki slug 404: sayfa talep anında üretilmez. */
export const dynamicParams = false;

export function generateStaticParams() {
  return HIZMETLER.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/hizmetler/[slug]">): Promise<Metadata> {
  const { locale: l, slug } = await params;
  const locale = l as AppLocale;
  const h = hizmetBul(slug);
  if (!h) return {};
  const m = h.metin[locale];
  return sayfaMeta({
    locale,
    path: `/hizmetler/${h.slug}`,
    baslik: m.baslik,
    aciklama: m.aciklama,
    gorsel: { url: h.gorsel, width: gorselBoyutu(h).w, height: gorselBoyutu(h).h, alt: h.gorselAlt[locale] },
  });
}

export default async function HizmetSayfasi({ params }: PageProps<"/[locale]/hizmetler/[slug]">) {
  const { locale: l, slug } = await params;
  const locale = l as AppLocale;
  const h = hizmetBul(slug);
  if (!h) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "hizmetSayfa" });
  const g = await getTranslations({ locale, namespace: "genel" });
  const iletisim = await getTranslations({ locale, namespace: "iletisim" });
  const m = h.metin[locale];
  const sira = HIZMETLER.indexOf(h) + 1;
  const iki = (n: number) => String(n).padStart(2, "0");
  const yol = `/hizmetler/${h.slug}`;
  const servosteelUrl = locale === "tr" ? SERVOSTEEL.url : SERVOSTEEL.urlEn;

  /* Üretim hatlarını Servosteel üretir; şemada sağlayıcı o. */
  const saglayici = h.dis
    ? { "@type": "Organization", name: SERVOSTEEL.name, url: SERVOSTEEL.url }
    : { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: SITE_NAME, url: `${SITE_URL}/` };

  const sema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(locale, yol)}#service`,
    name: m.baslik,
    serviceType: m.ad,
    description: m.aciklama,
    url: absoluteUrl(locale, yol),
    image: `${SITE_URL}${h.gorsel}`,
    provider: saglayici,
  };

  return (
    <>
      <JsonLd veri={sema} />
      <SayfaBasi
        locale={locale}
        kirintilar={[
          { ad: t("baslik"), yol: "/hizmetler" },
          { ad: m.ad, yol },
        ]}
        ust={`${iki(sira)} / ${iki(HIZMETLER.length)} · ${m.ad}`}
        baslik={m.baslik}
        giris={
          <div className="metin">
            {m.giris.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        }
        alt={
          <div className="mt-9 flex flex-wrap gap-3">
            {h.dis ? (
              <a href={servosteelUrl} target="_blank" rel="noopener" className="dugme dugme-amber">
                {g("servosteelde")}
                <ArrowUpRight aria-hidden className="size-4" />
                <span className="sr-only"> {g("yeniSekme")}</span>
              </a>
            ) : (
              <a href="#teklif" className="dugme dugme-amber">
                {t("formBaslik")}
                <ArrowRight aria-hidden className="size-4" />
              </a>
            )}
            <Link href="/hizmetler" className="dugme dugme-cizgi">
              {g("tumu")}
            </Link>
          </div>
        }
        sag={
          <Cerceve
            src={h.gorsel}
            alt={h.gorselAlt[locale]}
            sizes="(min-width: 1024px) 440px, 90vw"
            className="mx-auto w-full max-w-[440px]"
            stil={{ aspectRatio: `${gorselBoyutu(h).w} / ${gorselBoyutu(h).h}` }}
            isaret="text-amber"
            oncelikli
          />
        }
      />

      {/* Servosteel'e yönlendiren bant (üretim hatları) */}
      {h.dis ? (
        <section aria-labelledby="dis-baslik" className="izgara-acik border-b border-cizgi bg-amber text-kabuk">
          <div className="kap flex flex-col gap-6 py-10 sm:py-12 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="etiket text-kabuk/70">{t("grup")}</p>
              <h2 id="dis-baslik" className="mt-2 text-3xl font-bold uppercase sm:text-4xl">
                {t("disBaslik")}
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-kabuk/80">{t("disMetin")}</p>
            </div>
            <a href={servosteelUrl} target="_blank" rel="noopener" className="dugme dugme-koyu shrink-0">
              {servosteelUrl.replace("https://", "")}
              <ArrowUpRight aria-hidden className="size-4" />
              <span className="sr-only"> {g("yeniSekme")}</span>
            </a>
          </div>
        </section>
      ) : null}

      {/* Kapsam, kullanım, teklif için */}
      <section className="border-b border-cizgi bg-kagit py-16 sm:py-20">
        <div className="kap grid gap-6 lg:grid-cols-12">
          <div className="border border-cizgi bg-white p-6 sm:p-8 lg:col-span-5">
            <h2 className="etiket text-amber-koyu">{m.kapsam.baslik}</h2>
            <ol className="mt-5 border-t border-murekkep">
              {m.kapsam.maddeler.map((k, i) => (
                <li key={k} className="flex gap-4 border-b border-cizgi py-3.5 leading-snug">
                  <span className="etiket w-7 shrink-0 pt-0.5 text-soluk tabular-nums">{iki(i + 1)}</span>
                  <span className="text-[1.05rem]">{k}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="border border-cizgi bg-white p-6 sm:p-8 lg:col-span-3">
            <h2 className="etiket text-amber-koyu">{t("kullanim")}</h2>
            <ul className="mt-5 space-y-3">
              {m.kullanim.map((k) => (
                <li key={k} className="flex gap-2.5 leading-snug">
                  <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-amber-koyu" />
                  {k}
                </li>
              ))}
            </ul>
          </div>

          <div className="izgara flex flex-col border border-cizgi-koyu bg-kabuk p-6 text-koyu-metin sm:p-8 lg:col-span-4">
            <h2 className="etiket text-amber">{t("teklifIcin")}</h2>
            <ul className="mt-5 space-y-3">
              {m.teklifIcin.map((k) => (
                <li key={k} className="flex gap-3 leading-snug">
                  <FileText aria-hidden className="mt-0.5 size-4 shrink-0 text-amber" />
                  {k}
                </li>
              ))}
            </ul>
            {!h.dis ? (
              <a href="#teklif" className="dugme dugme-amber mt-8 self-start lg:mt-auto">
                {t("formBaslik")}
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {/* Teklif formu */}
      <section aria-labelledby="teklif-baslik" id="teklif" className="border-b border-cizgi bg-white py-16 sm:py-20">
        <div className="kap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="etiket text-soluk">{m.ad}</p>
            <h2 id="teklif-baslik" className="mt-3 text-4xl leading-none font-bold uppercase sm:text-5xl">
              {t("formBaslik")}
            </h2>
            <p className="mt-5 leading-relaxed text-soluk">{iletisim("formGiris")}</p>
            <ul className="mt-8 space-y-3 border-t border-cizgi pt-6">
              <li>
                <a href={CONTACT.phoneHref} className="flex items-center gap-3 font-medium tabular-nums hover:text-amber-koyu">
                  <Phone aria-hidden className="size-4 text-amber-koyu" />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 font-medium hover:text-amber-koyu">
                  <Mail aria-hidden className="size-4 text-amber-koyu" />
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-8">
            <TeklifFormu hizmet={h.slug} />
          </div>
        </div>
      </section>

      {/* Diğer hizmetler */}
      <section aria-labelledby="diger-baslik" className="bg-kagit py-16 sm:py-20">
        <div className="kap">
          <div className="flex items-center gap-4">
            <h2 id="diger-baslik" className="etiket text-soluk">
              {t("diger")}
            </h2>
            <span aria-hidden className="h-px flex-1 bg-cizgi" />
          </div>
          <ul className="mt-8 grid gap-px border border-cizgi bg-cizgi sm:grid-cols-2 lg:grid-cols-5">
            {HIZMETLER.filter((x) => x.slug !== h.slug).map((x) => (
              <li key={x.slug}>
                <Link
                  href={`/hizmetler/${x.slug}`}
                  className="group flex h-full flex-col justify-between gap-6 bg-white p-5 transition-colors hover:bg-kabuk"
                >
                  <span className="etiket text-soluk tabular-nums group-hover:text-amber">
                    {iki(HIZMETLER.indexOf(x) + 1)}
                  </span>
                  <span className="flex items-end justify-between gap-3">
                    <span className="font-baslik text-xl leading-tight font-bold uppercase group-hover:text-white">
                      {x.metin[locale].ad}
                    </span>
                    <ArrowRight aria-hidden className="size-4 shrink-0 text-amber-koyu group-hover:text-amber" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
