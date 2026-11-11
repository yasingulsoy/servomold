"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { HIZMETLER } from "@/lib/hizmetler";
import { Logo } from "./logo";
import { DilSecici } from "./dil-secici";

const MENU = [
  { href: "/hizmetler", anahtar: "hizmetler" },
  { href: "/hakkimizda", anahtar: "hakkimizda" },
  { href: "/iletisim", anahtar: "iletisim" },
] as const;

/**
 * Koyu üst bilgi: logo, menü (Hizmetler açılır listeli), dil anahtarı,
 * "Teklif isteyin". Mobilde tam ekran panel.
 */
export function SiteHeader() {
  const t = useTranslations("nav");
  const g = useTranslations("genel");
  const locale = useLocale();
  const pathname = usePathname();
  const [acik, setAcik] = useState(false);

  /* Panel açıkken sayfa kaymasın; Esc kapatır. */
  useEffect(() => {
    if (!acik) return;
    const onceki = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAcik(false);
    document.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = onceki;
      document.removeEventListener("keydown", esc);
    };
  }, [acik]);

  const aktifMi = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const kapat = () => setAcik(false);

  return (
    /* backdrop-filter BİLEREK yok: fixed konumlu mobil paneli üst bilgiye
       hapsederdi (filter, fixed çocuklar için yeni kapsayıcı blok açar). */
    <header className="sticky top-0 z-50 border-b border-cizgi-koyu bg-kabuk text-koyu-metin">
      <a
        href="#icerik"
        className="etiket sr-only z-[60] bg-amber px-4 py-3 text-kabuk focus:not-sr-only focus:absolute focus:top-2 focus:left-2"
      >
        {g("atla")}
      </a>

      <div className="kap flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" aria-label={`ServoMold — ${t("anasayfa")}`} onClick={kapat} className="-my-1 py-1">
          <Logo slogan={g("slogan")} onek="ust" />
        </Link>

        {/* Masaüstü menü */}
        <nav aria-label={t("menu")} className="hidden items-center gap-1 lg:flex">
          {MENU.map(({ href, anahtar }) =>
            href === "/hizmetler" ? (
              <div key={href} className="group relative">
                <Link
                  href={href}
                  aria-current={aktifMi(href) ? "page" : undefined}
                  className={`etiket flex items-center gap-1.5 px-3 py-3 text-[0.875rem] transition-colors hover:text-white ${
                    aktifMi(href) ? "text-amber" : "text-koyu-soluk"
                  }`}
                >
                  {t(anahtar)}
                  <ChevronDown aria-hidden className="size-3.5 transition-transform group-focus-within:rotate-180 group-hover:rotate-180" />
                </Link>
                {/* Açılır liste: üzerine gelince ya da klavyeyle içine girince */}
                <div className="invisible absolute top-full left-0 w-80 pt-2 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <ul className="border border-cizgi-koyu bg-kabuk-2 py-2 shadow-2xl shadow-black/50">
                    {HIZMETLER.map((h, i) => (
                      <li key={h.slug}>
                        <Link
                          href={`/hizmetler/${h.slug}`}
                          className="flex items-baseline gap-3 px-4 py-2.5 text-[0.95rem] text-koyu-metin transition-colors hover:bg-kabuk-3 hover:text-amber"
                        >
                          <span className="etiket w-6 text-[0.7rem] text-koyu-soluk tabular-nums">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="flex-1">{h.metin[locale].ad}</span>
                          {h.dis ? <ArrowUpRight aria-hidden className="size-3.5 text-koyu-soluk" /> : null}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={href}
                href={href}
                aria-current={aktifMi(href) ? "page" : undefined}
                className={`etiket px-3 py-3 text-[0.875rem] transition-colors hover:text-white ${
                  aktifMi(href) ? "text-amber" : "text-koyu-soluk"
                }`}
              >
                {t(anahtar)}
              </Link>
            ),
          )}
          <DilSecici className="mr-3 ml-4 border-l border-cizgi-koyu pl-4" />
          <Link href={{ pathname: "/iletisim", hash: "teklif" }} className="dugme dugme-amber min-h-11 px-5 text-[0.9rem]">
            {t("teklif")}
          </Link>
        </nav>

        {/* Mobil menü düğmesi */}
        <button
          type="button"
          onClick={() => setAcik((v) => !v)}
          aria-expanded={acik}
          aria-controls="mobil-menu"
          className="-mr-2 flex size-11 items-center justify-center text-koyu-metin lg:hidden"
        >
          {acik ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
          <span className="sr-only">{acik ? t("kapat") : t("menu")}</span>
        </button>
      </div>

      {/* Mobil panel */}
      <div
        id="mobil-menu"
        hidden={!acik}
        className="izgara fixed inset-x-0 top-[4.5rem] bottom-0 overflow-y-auto border-t border-cizgi-koyu bg-kabuk lg:hidden"
      >
        <nav aria-label={t("menu")} className="kap flex flex-col py-6">
          <ul className="divide-y divide-cizgi-koyu border-y border-cizgi-koyu">
            {MENU.map(({ href, anahtar }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={kapat}
                  aria-current={aktifMi(href) ? "page" : undefined}
                  className={`flex items-center justify-between py-4 font-baslik text-2xl font-semibold uppercase ${
                    aktifMi(href) ? "text-amber" : "text-white"
                  }`}
                >
                  {t(anahtar)}
                </Link>
                {href === "/hizmetler" ? (
                  <ul className="-mt-1 grid gap-0.5 pb-4">
                    {HIZMETLER.map((h, i) => (
                      <li key={h.slug}>
                        <Link
                          href={`/hizmetler/${h.slug}`}
                          onClick={kapat}
                          className="flex items-baseline gap-3 py-2 text-koyu-soluk hover:text-white"
                        >
                          <span className="etiket w-6 text-[0.7rem] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                          {h.metin[locale].ad}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between gap-4">
            <DilSecici onSec={kapat} />
            <Link href={{ pathname: "/iletisim", hash: "teklif" }} onClick={kapat} className="dugme dugme-amber">
              {t("teklif")}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
