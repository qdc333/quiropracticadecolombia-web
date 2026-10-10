"use client";

import type { SiteContent } from "@/lib/cms/types";
import { useEffect, useRef, useState } from "react";

const POLL_MS = 5000;

export function useLiveSiteContent(initial: SiteContent) {
  const [content, setContent] = useState(initial);
  const updatedAtRef = useRef(initial.updatedAt);

  useEffect(() => {
    setContent(initial);
    updatedAtRef.current = initial.updatedAt;
  }, [initial]);

  useEffect(() => {
    let cancelled = false;

    async function pull() {
      try {
        const res = await fetch("/api/content", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as SiteContent;
        if (cancelled || data.updatedAt === updatedAtRef.current) return;
        updatedAtRef.current = data.updatedAt;
        setContent(data);
      } catch {
        /* ignore network errors while polling */
      }
    }

    const timer = window.setInterval(pull, POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  return content;
}
