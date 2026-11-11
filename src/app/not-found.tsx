import "./globals.css";

/* Dil segmentine hiç düşmeyen (nadir) istekler için sade, iki dilli yedek 404.
   Kök layout yok — sayfa kendi <html>'ini basar. */
export default function KokBulunamadi() {
  return (
    <html lang="tr">
      <body className="izgara flex min-h-screen flex-col items-center justify-center gap-5 bg-kabuk px-5 text-center text-koyu-metin">
        <p className="font-baslik text-7xl font-bold text-amber">404</p>
        <h1 className="font-baslik text-3xl font-bold uppercase">Sayfa bulunamadı / Page not found</h1>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- kök yedek 404, yönlendirici dışında */}
        <a href="/" className="dugme dugme-amber mt-2">
          Ana sayfa / Home
        </a>
      </body>
    </html>
  );
}
