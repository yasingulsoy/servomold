import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { AppLocale } from "@/i18n/routing";
import { sayfaMeta } from "@/i18n/seo";
import { HIZMETLER, hizmetBul } from "@/lib/hizmetler";
import { FOUNDED } from "@/lib/site";
import { CtaBandi, GrupBandi, Ilkeler, MarkaSeridi } from "@/components/bantlar";
import { Cerceve } from "@/components/cerceve";
import { SayfaBasi } from "@/components/sayfa-basi";

export async function generateMetadata({ params }: PageProps<"/[locale]/hakkimizda">): Promise<Metadata> {
  const locale = (await params).locale as AppLocale;
  const t = await getTranslations({ locale, namespace: "hakkimizda" });
  return sayfaMeta({ locale, path: "/hakkimizda", baslik: t("baslik"), aciklama: t("giris") });
}

export default async function Hakkimizda({ params }: PageProps<"/[locale]/hakkimizda">) {
  const locale = (await params).locale as AppLocale;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "hakkimizda" });

  /* Rakamlar sitedeki listelerden sayılır — elle yazılmaz. */
  const kalipAilesi = HIZMETLER.filter((h) => !h.dis && h.slug !== "fason-cnc-isleme").length;
  const fasonTuru = hizmetBul("fason-cnc-isleme")!.metin[locale].kapsam.maddeler.length;
  const rakamlar = [
    { deger: String(FOUNDED), ad: t("rakamlar.kurulus") },
    { deger: String(kalipAilesi), ad: t("rakamlar.kalip") },
    { deger: String(fasonTuru), ad: t("rakamlar.fason") },
  ];

  return (
    <>
      <SayfaBasi
        locale={locale}
        kirintilar={[{ ad: t("baslik"), yol: "/hakkimizda" }]}
        ust={t("ust")}
        baslik={t("baslik")}
        giris={<p>{t("giris")}</p>}
        sag={
          <Cerceve
            src="/gorseller/genel/cnc-5-eksen-disli.jpg"
            alt={locale === "tr" ? "Beş eksenli CNC'de dişli işleme" : "Machining a gear on a five-axis CNC"}
            sizes="(min-width: 1024px) 480px, 100vw"
            className="aspect-[4/3]"
            isaret="text-amber"
            konum="40% 50%"
            oncelikli
          />
        }
      />

      <section className="border-b border-cizgi bg-white py-16 sm:py-24">
        <div className="kap grid gap-14 lg:grid-cols-12">
          <div className="metin text-xl leading-relaxed lg:col-span-7">
            <p>{t("metin1")}</p>
            <p className="text-soluk">{t("metin2")}</p>
          </div>
          <dl className="grid grid-cols-3 border-t border-l border-cizgi lg:col-span-5 lg:self-start">
            {rakamlar.map((r) => (
              <div key={r.ad} className="relative border-r border-b border-cizgi p-4 sm:p-6">
                <span aria-hidden className="absolute top-0 left-0 h-1 w-8 bg-amber" />
                <dt className="etiket text-[0.7rem] text-soluk">{r.ad}</dt>
                <dd className="mt-2 font-baslik text-4xl font-bold tabular-nums sm:text-5xl">{r.deger}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="misyon-baslik" className="izgara bg-kabuk py-16 text-koyu-metin sm:py-24">
        <div className="kap grid gap-8 lg:grid-cols-12">
          <h2 id="misyon-baslik" className="etiket flex items-center gap-3 text-amber lg:col-span-3">
            <span aria-hidden className="h-px w-8 bg-amber" />
            {t("misyonBaslik")}
          </h2>
          <blockquote className="font-baslik text-3xl leading-[1.15] font-semibold text-white sm:text-4xl lg:col-span-9">
            {t("misyon")}
          </blockquote>
        </div>
      </section>

      <Ilkeler />
      <GrupBandi />
      <MarkaSeridi />
      <CtaBandi />
    </>
  );
}
