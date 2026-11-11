import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { HIZMETLER, type Hizmet } from "@/lib/hizmetler";
import { SERVOSTEEL } from "@/lib/site";
import { Cerceve } from "./cerceve";

/**
 * Hizmet kartı: numara, görsel (gri tonlu, üzerine gelince renkli), ad,
 * kısa açıklama. Görseller 346×286; kart genişliği buna yakın tutulur ki
 * büyütülüp bulanıklaşmasın.
 */
export function HizmetKarti({ hizmet, sira }: { hizmet: Hizmet; sira: number }) {
  const locale = useLocale();
  const g = useTranslations("genel");
  const m = hizmet.metin[locale];
  const iki = (n: number) => String(n).padStart(2, "0");

  return (
    <Link href={`/hizmetler/${hizmet.slug}`} className="group flex h-full flex-col bg-white p-5 transition-colors hover:bg-kagit sm:p-6">
      <div className="flex items-center justify-between">
        <span className="etiket text-soluk tabular-nums">
          <span className="text-amber-koyu">{iki(sira)}</span> / {iki(HIZMETLER.length)}
        </span>
        {hizmet.dis ? (
          <span className="etiket flex items-center gap-1 border border-cizgi px-2 py-1 text-[0.7rem] text-soluk">
            {SERVOSTEEL.name}
            <ArrowUpRight aria-hidden className="size-3" />
          </span>
        ) : null}
      </div>
      <Cerceve
        src={hizmet.gorsel}
        alt={hizmet.gorselAlt[locale]}
        sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
        className="mt-5 aspect-[346/286]"
        isaret="text-cizgi group-hover:text-amber-koyu/50"
        sigdir={!!hizmet.gorselBoyut}
        soluk
      />
      <h3 className="mt-6 text-[1.65rem] leading-tight font-bold uppercase transition-colors group-hover:text-amber-koyu">
        {m.ad}
      </h3>
      <p className="mt-2 flex-1 leading-relaxed text-soluk">{m.kisa}</p>
      <span className="etiket mt-6 flex items-center gap-2 text-amber-koyu">
        {g("detay")}
        <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
