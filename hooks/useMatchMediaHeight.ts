import { useEffect, type RefObject } from "react";

const DESKTOP_MQ = "(min-width: 768px)";

/** En PC, limita la columna de foto a la altura del bloque de texto/contenido adyacente. */
type Options = {
  /** >1 permite que la foto supere un poco la altura del texto (p. ej. Nosotros). */
  heightScale?: number;
};

export function useMatchMediaHeight(
  contentRef: RefObject<HTMLElement | null>,
  mediaRef: RefObject<HTMLElement | null>,
  deps: unknown[] = [],
  options: Options = {},
) {
  const heightScale = options.heightScale ?? 1;
  useEffect(() => {
    const content = contentRef.current;
    const media = mediaRef.current;
    if (!content || !media) return;

    const mq = window.matchMedia(DESKTOP_MQ);

    const sync = () => {
      if (!mq.matches) {
        media.style.maxHeight = "";
        return;
      }
      media.style.maxHeight = `${Math.round(content.offsetHeight * heightScale)}px`;
    };

    const syncSoon = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(sync);
      });
    };

    syncSoon();
    const ro = new ResizeObserver(syncSoon);
    ro.observe(content);
    mq.addEventListener("change", syncSoon);
    window.addEventListener("load", syncSoon);
    window.addEventListener("resize", syncSoon);

    return () => {
      ro.disconnect();
      mq.removeEventListener("change", syncSoon);
      window.removeEventListener("load", syncSoon);
      window.removeEventListener("resize", syncSoon);
      media.style.maxHeight = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deps supplied by caller for content changes
  }, [contentRef, mediaRef, heightScale, ...deps]);
}
