import type { AppLocale } from "@/i18n/routing";
import type tr from "@/messages/tr.json";

/* next-intl tipleri: çeviri anahtarları tr.json'dan denetlenir, eksik ya da
   yanlış yazılmış anahtar derlemede yakalanır. en.json aynı yapıyı taşımalı. */
declare module "next-intl" {
  interface AppConfig {
    Locale: AppLocale;
    Messages: typeof tr;
  }
}
