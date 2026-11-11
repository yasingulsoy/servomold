/**
 * Numaralı bölüm başlığı: "01 / 06 ——— ETİKET", altında başlık ve giriş.
 * Numara ana sayfadaki bölüm sırasıdır; teknik resimdeki pafta numarasını
 * andırır.
 */
export function BolumBasligi({
  no,
  toplam,
  ust,
  baslik,
  giris,
  koyu = false,
  id,
  className = "",
  sag,
}: {
  no?: number;
  toplam?: number;
  ust: string;
  baslik: string;
  giris?: string;
  koyu?: boolean;
  id?: string;
  className?: string;
  /** Başlığın sağına (geniş ekranda) gelen öğe — örn. "Bütün hizmetler" bağlantısı */
  sag?: React.ReactNode;
}) {
  const iki = (n: number) => String(n).padStart(2, "0");
  return (
    <div className={className}>
      <div className={`flex items-center gap-4 ${koyu ? "text-koyu-soluk" : "text-soluk"}`}>
        {no ? (
          <span className="etiket tabular-nums">
            <span className={koyu ? "text-amber" : "text-amber-koyu"}>{iki(no)}</span>
            {toplam ? <span> / {iki(toplam)}</span> : null}
          </span>
        ) : null}
        <span aria-hidden="true" className={`h-px flex-1 ${koyu ? "bg-cizgi-koyu" : "bg-cizgi"}`} />
        <span className="etiket">{ust}</span>
      </div>
      <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <h2
            id={id}
            className={`text-[2rem] leading-[1.02] font-bold tracking-tight uppercase sm:text-5xl ${koyu ? "text-white" : "text-murekkep"}`}
          >
            {baslik}
          </h2>
          {giris ? (
            <p className={`mt-4 max-w-2xl text-lg leading-relaxed ${koyu ? "text-koyu-soluk" : "text-soluk"}`}>
              {giris}
            </p>
          ) : null}
        </div>
        {sag ? <div className="shrink-0">{sag}</div> : null}
      </div>
    </div>
  );
}
