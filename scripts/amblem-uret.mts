/**
 * Amblemden statik dosyalar üretir:
 *   src/app/icon.svg                              — favicon (harfsiz)
 *   public/gorseller/logo/servomold-amblem.svg    — açık zemin için
 *   public/gorseller/logo/servomold-amblem-koyu.svg — koyu zemin için
 *   src/app/apple-icon.png                         — 180 px, beyaz zemin
 *
 * Çalıştırma: node scripts/amblem-uret.mts
 */
import { writeFileSync } from "node:fs";
import sharp from "sharp";
import { amblemSvg } from "../src/lib/amblem.ts";

const ikon = amblemSvg({ harfler: false, onek: "ikon" });
writeFileSync("src/app/icon.svg", ikon);
writeFileSync("public/gorseller/logo/servomold-amblem.svg", amblemSvg({ baslik: "ServoMold" }));
writeFileSync("public/gorseller/logo/servomold-amblem-koyu.svg", amblemSvg({ zemin: "koyu", baslik: "ServoMold" }));

await sharp(Buffer.from(ikon), { density: 300 })
  .resize(150, 150)
  .extend({ top: 15, bottom: 15, left: 15, right: 15, background: "#ffffff" })
  .flatten({ background: "#ffffff" })
  .png()
  .toFile("src/app/apple-icon.png");

console.log("amblem dosyaları yazıldı");
