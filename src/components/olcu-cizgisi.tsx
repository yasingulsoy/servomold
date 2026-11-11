/**
 * Teknik resimdeki ölçü çizgisi: iki uçta uzatma çizgisi ve ok, ortada
 * yazı. Süs; ekran okuyucudan gizli. Renk `color`'dan gelir.
 *
 * Yazıya yalnız gerçek bilgi konur (slogan, yıl, konum) — ölçü ya da
 * tolerans gibi görünen uydurma değer yazılmaz.
 */
export function OlcuCizgisi({ etiket, className = "" }: { etiket?: string; className?: string }) {
  return (
    <div aria-hidden="true" className={`flex items-center gap-2 ${className}`}>
      <span className="h-3.5 w-px bg-current opacity-70" />
      <Ok yon="sol" />
      <span className="-mx-2 h-px flex-1 bg-current opacity-50" />
      {etiket ? <span className="etiket px-2 whitespace-nowrap">{etiket}</span> : null}
      {etiket ? <span className="-mx-2 h-px flex-1 bg-current opacity-50" /> : null}
      <Ok yon="sag" />
      <span className="h-3.5 w-px bg-current opacity-70" />
    </div>
  );
}

function Ok({ yon }: { yon: "sol" | "sag" }) {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" className="shrink-0 opacity-70">
      <path d={yon === "sol" ? "M0 4 8 0v8z" : "M8 4 0 0v8z"} fill="currentColor" />
    </svg>
  );
}
