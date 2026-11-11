import { notFound } from "next/navigation";

/* Eşleşmeyen her yol (ör. /olmayan, /en/olmayan) dilin kendi 404'üne düşsün:
   üst bilgi, altbilgi ve doğru dildeki metinle. */
export default function KalanYollar() {
  notFound();
}
