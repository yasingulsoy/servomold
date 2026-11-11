import { Amblem } from "./amblem";

/**
 * Amblem + yazı logosu. Eski logodaki düzen: "Servo" amber, "Mold" grafit,
 * altında "Kalıp Sistemleri". Koyu zeminde "Mold" açık renge döner.
 */
export function Logo({
  slogan,
  zemin = "koyu",
  onek,
  boyut = "orta",
}: {
  slogan: string;
  zemin?: "koyu" | "acik";
  onek: string;
  boyut?: "orta" | "buyuk";
}) {
  const buyuk = boyut === "buyuk";
  return (
    <span className="flex items-center gap-3">
      <Amblem zemin={zemin} harfler={false} onek={onek} className={buyuk ? "size-14" : "size-11"} />
      <span className="flex flex-col leading-none">
        <span className={`font-baslik font-bold tracking-tight ${buyuk ? "text-[2rem]" : "text-[1.7rem]"}`}>
          <span className="text-amber">Servo</span>
          <span className={zemin === "koyu" ? "text-koyu-metin" : "text-grafit"}>Mold</span>
        </span>
        <span
          className={`etiket mt-1 text-[0.625rem] tracking-[0.22em] ${zemin === "koyu" ? "text-koyu-soluk" : "text-soluk"}`}
        >
          {slogan}
        </span>
      </span>
    </span>
  );
}
