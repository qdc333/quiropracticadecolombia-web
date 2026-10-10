"use client";

import { useEffect } from "react";

function revealIfInView(el: Element) {
  const rect = el.getBoundingClientRect();
  const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
  if (inView) {
    el.classList.add("is-visible");
    return true;
  }
  return false;
}

export function useReveal(contentVersion?: string | number) {
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" }
    );

    reveals.forEach((el) => {
      if (!revealIfInView(el)) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [contentVersion]);
}
