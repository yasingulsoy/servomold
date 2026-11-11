import createIntlMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "@/i18n/routing";

/* Next 16: middleware yerine proxy. Dil tespiti, `/en` öneki ve yerelleştirilmiş
   yolların (`/en/services/...` -> dahili `/hizmetler/...`) yeniden yazımı. */
const handleI18n = createIntlMiddleware(routing);

export function proxy(request: NextRequest) {
  return handleI18n(request);
}

export const config = {
  /* api, _next ve uzantılı dosyalar (görsel, sitemap.xml, robots.txt, icon.svg)
     hariç her yol. /api/teklif dosya yüklemesi aldığı için proxy'den geçmemeli:
     proxy gövdeyi 10 MB'ta keserdi. */
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
