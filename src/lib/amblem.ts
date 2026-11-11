/**
 * ServoMold amblemi — eski sitedeki 546 piksellik PNG logodan yeniden çizildi:
 * beş parçalı amber halka, aralarında S-E-R-V-O harfleri, ortada grafit
 * çark ve krem zemin üzerinde "M".
 *
 * Tek kaynak: hem sayfadaki <Amblem> bileşeni hem de `scripts/amblem-uret.mts`
 * (favicon ve indirilebilir SVG dosyaları) bu fonksiyonu kullanır.
 *
 * Firmanın vektör logosu (AI/EPS/SVG) gelirse bu çizim onunla değiştirilmeli.
 */

const M = 100;

function nokta(r: number, aci: number): [number, number] {
  const a = (aci * Math.PI) / 180;
  return [+(M + r * Math.sin(a)).toFixed(2), +(M - r * Math.cos(a)).toFixed(2)];
}

/** Halka dilimi: iç yarıçap r1, dış r2, saat yönünde a1'den a2'ye (derece, 0 = tepe). */
function dilim(r1: number, r2: number, a1: number, a2: number) {
  const [x1, y1] = nokta(r2, a1);
  const [x2, y2] = nokta(r2, a2);
  const [x3, y3] = nokta(r1, a2);
  const [x4, y4] = nokta(r1, a1);
  return `M${x1} ${y1}A${r2} ${r2} 0 0 1 ${x2} ${y2}L${x3} ${y3}A${r1} ${r1} 0 0 0 ${x4} ${y4}Z`;
}

const DILIMLER = [0, 72, 144, 216, 288];
const HARFLER: [string, number][] = [
  ["S", -36],
  ["E", 36],
  ["R", 108],
  ["V", 180],
  ["O", 252],
];

export type AmblemSecenek = {
  /** Zemin: "acik" beyaz/açık gri üstünde, "koyu" grafit üstünde. */
  zemin?: "acik" | "koyu";
  /** Halkadaki S-E-R-V-O harfleri (küçük boyutta kapatılır). */
  harfler?: boolean;
  /** SVG kimliklerine önek — aynı sayfada iki amblem olursa çakışmasın. */
  onek?: string;
  font?: string;
  baslik?: string;
};

export function amblemSvg({
  zemin = "acik",
  harfler = true,
  onek = "sm",
  font = "'Arial Narrow', Arial, sans-serif",
  baslik,
}: AmblemSecenek = {}) {
  const harfRenk = zemin === "koyu" ? "#d5d9de" : "#3d4045";
  const cember = zemin === "koyu" ? "#8d939a" : "#a3a8ae";
  /* Koyu zeminde grafit çark zemine karışıp kayboluyordu (render edilip
     bakıldı). Çarkın arkasına açık bir disk konur: amblem, beyaz zemindeki
     orijinal logo gibi okunur, amber halka koyu zeminde kalır. */
  const disk = zemin === "koyu" ? `<circle cx="100" cy="100" r="70" fill="#e8eaed"/>` : "";
  const g = `${onek}-g`;

  const dis = DILIMLER.map((c) => `<path d="${dilim(75, 97, c - 25, c + 25)}" fill="#d97a00"/>`).join("");
  const ic = DILIMLER.map((c) => `<path d="${dilim(78.5, 93.5, c - 22.5, c + 22.5)}" fill="url(#${g})"/>`).join("");

  const harf = harfler
    ? HARFLER.map(
        ([h, a]) =>
          `<text x="100" y="${M - 86}" transform="rotate(${a} 100 100)" text-anchor="middle" dominant-baseline="central" font-family="${font}" font-weight="700" font-size="17" fill="${harfRenk}">${h}</text>`,
      ).join("")
    : "";

  const kollar = [0, 45, 90, 135, 180, 225, 270, 315]
    .map((a) => {
      const kapak = a % 90 === 0 ? `<rect x="88" y="34" width="24" height="7" rx="1.5"/>` : "";
      return `<g transform="rotate(${a} 100 100)"><rect x="95.5" y="36" width="9" height="30"/>${kapak}</g>`;
    })
    .join("");

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"${baslik ? ` role="img" aria-label="${baslik}"` : ` aria-hidden="true"`}>` +
    (baslik ? `<title>${baslik}</title>` : "") +
    `<defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="#ffd54a"/><stop offset=".55" stop-color="#f0b000"/><stop offset="1" stop-color="#e88f00"/>` +
    `</linearGradient></defs>` +
    dis +
    ic +
    harf +
    disk +
    `<circle cx="100" cy="100" r="68" fill="none" stroke="${cember}" stroke-width="3"/>` +
    `<g fill="#3a3d42">${kollar}</g>` +
    `<circle cx="100" cy="100" r="55" fill="none" stroke="#3a3d42" stroke-width="11"/>` +
    `<circle cx="100" cy="100" r="38" fill="#f3e9dc" stroke="#cfc6b9" stroke-width="1.5"/>` +
    `<text x="100" y="101" text-anchor="middle" dominant-baseline="central" font-family="${font}" font-weight="700" font-size="46" fill="#f0b000" stroke="#a35f00" stroke-width="1.2" paint-order="stroke">M</text>` +
    `</svg>`
  );
}
