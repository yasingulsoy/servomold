"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

/**
 * Hafif YouTube kutusu: önce yerel kapak görseli, tıklayınca
 * youtube-nocookie iframe'i. Sayfa açılışında YouTube'a hiçbir istek gitmez
 * (çerez yok, ~1 MB oynatıcı betiği yok).
 */
export function YoutubeKutusu({
  id,
  baslik,
  kapak,
  oynatYazisi,
  not,
}: {
  id: string;
  baslik: string;
  kapak: string;
  oynatYazisi: string;
  not?: string;
}) {
  const [oynat, setOynat] = useState(false);

  return (
    <figure>
      <div className="kirpma text-amber/70">
        <div className="relative aspect-video overflow-hidden bg-kabuk">
          {oynat ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
              title={baslik}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <button
              type="button"
              onClick={() => setOynat(true)}
              className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-offset-[-4px]"
            >
              <Image
                src={kapak}
                alt=""
                fill
                sizes="(min-width: 1024px) 896px, 100vw"
                className="object-cover transition duration-500 group-hover:scale-[1.02]"
              />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-kabuk/70 via-kabuk/10 to-transparent" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="pah flex size-20 items-center justify-center bg-amber text-kabuk shadow-xl transition group-hover:bg-amber-acik sm:size-24">
                  <Play aria-hidden className="ml-1 size-9 fill-current" />
                </span>
              </span>
              <span className="etiket absolute bottom-4 left-4 text-white sm:bottom-6 sm:left-6">{oynatYazisi}</span>
              <span className="sr-only">: {baslik}</span>
            </button>
          )}
        </div>
      </div>
      {not ? <figcaption className="mt-5 text-sm text-soluk">{not}</figcaption> : null}
    </figure>
  );
}
