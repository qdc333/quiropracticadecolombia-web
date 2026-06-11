"use client";

import { useEffect } from "react";

export function useScrollSpy() {
  useEffect(() => {
    const header = document.getElementById("header");
    const navLinks = document.querySelectorAll<HTMLAnchorElement>(".nav-link");
    const sections = document.querySelectorAll<HTMLElement>("section[id]");

    function onScroll() {
      if (!header) return;

      if (window.scrollY > 20) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }

      const scrollPos = window.scrollY + header.offsetHeight + 80;
      let current = "";

      sections.forEach((section) => {
        if (section.offsetTop <= scrollPos) {
          current = section.id;
        }
      });

      navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        link.classList.toggle("is-active", href === `#${current}`);
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
}
