import { amblemSvg, type AmblemSecenek } from "@/lib/amblem";

/**
 * Sayfadaki amblem — lib/amblem.ts'teki çizimi satır içi SVG olarak basar.
 * Harfler globals.css'teki `.amblem text` kuralıyla başlık fontunu alır
 * (CSS kuralı SVG'nin font-family özniteliğini ezer).
 *
 * Aynı sayfada birden çok amblem varsa her birine ayrı `onek` verilmeli;
 * yoksa degrade kimlikleri çakışır.
 */
export function Amblem({ className = "", ...secenek }: AmblemSecenek & { className?: string }) {
  return (
    <span
      className={`amblem inline-block shrink-0 ${className}`}
      dangerouslySetInnerHTML={{ __html: amblemSvg(secenek) }}
    />
  );
}
