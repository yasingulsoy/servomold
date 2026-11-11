import Image from "next/image";

/**
 * Kırpma işaretli görsel çerçevesi. Görsel kutuyu `object-cover` ile doldurur;
 * oran `className` ile verilir (aspect-[4/3] gibi).
 *
 * `isaret`: kırpma işaretinin rengi (Tailwind metin rengi sınıfı).
 * `sigdir`: oranı farklı görsel kırpılmaz, beyaz zemine sığdırılır.
 * `soluk`: stok görseller gri tonlu ve hafif kontrastlı basılır, üzerine
 * gelince renklenir — farklı kaynaklardan gelen görseller tek bir aile gibi
 * dursun diye.
 */
export function Cerceve({
  src,
  alt,
  sizes,
  className = "",
  isaret = "text-cizgi",
  oncelikli = false,
  soluk = false,
  konum = "center",
  sigdir = false,
  stil,
}: {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  isaret?: string;
  oncelikli?: boolean;
  soluk?: boolean;
  konum?: string;
  /** Oranı kutuya uymayan görsel kırpılmadan sığdırılır (beyaz zemin). */
  sigdir?: boolean;
  /** Kutuya satır içi stil — oran sınıfla verilemiyorsa (aspectRatio) */
  stil?: React.CSSProperties;
}) {
  return (
    <div className={`kirpma ${isaret} ${className}`} style={stil}>
      <div className={`relative h-full w-full overflow-hidden ${sigdir ? "bg-white" : "bg-kabuk-3"}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          loading={oncelikli ? "eager" : "lazy"}
          fetchPriority={oncelikli ? "high" : undefined}
          className={`${sigdir ? "object-contain" : "object-cover"} transition duration-500 ${
            soluk ? "scale-[1.03] grayscale-[0.85] contrast-[1.05] group-hover:scale-[1.06] group-hover:grayscale-0" : ""
          }`}
          style={{ objectPosition: konum }}
        />
      </div>
    </div>
  );
}
