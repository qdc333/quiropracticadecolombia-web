"use client";

import { useLocale } from "@/components/LocaleProvider";
import { getNavItems } from "@/lib/i18n/nav";
import { useCallback, useEffect, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { locale, setLocale } = useLocale();
  const navItems = getNavItems(locale);

  const close = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = "";
  }, []);

  const toggle = useCallback(() => {
    setOpen((prev) => {
      document.body.style.overflow = prev ? "" : "hidden";
      return !prev;
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <header className="site-header" id="header">
      <div className="header-inner">
        <a href="#inicio" className="logo" aria-label="Quiropráctica de Colombia — Inicio">
          <img
            src="/images/logo.png"
            alt="Logo Quiropráctica de Colombia"
            className="logo-img"
            width={44}
            height={44}
          />
          <span className="logo-text">
            Quiropráctica
            <br />
            <small>de Colombia</small>
          </span>
        </a>

        <div
          className={`nav-backdrop${open ? " is-visible" : ""}`}
          id="nav-backdrop"
          aria-hidden={!open}
          onClick={close}
        />

        <nav className={`nav${open ? " is-open" : ""}`} id="nav-menu" aria-label="Secciones del sitio">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`nav-link${item.cta ? " nav-link--cta" : ""}`}
                  onClick={item.href.startsWith("#") ? close : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-end">
          <div className="lang-switch" role="group" aria-label={locale === "en" ? "Language" : "Idioma"}>
            <button
              type="button"
              className={`lang-switch-btn${locale === "es" ? " is-active" : ""}`}
              onClick={() => setLocale("es")}
              aria-pressed={locale === "es"}
            >
              ES
            </button>
            <button
              type="button"
              className={`lang-switch-btn${locale === "en" ? " is-active" : ""}`}
              onClick={() => setLocale("en")}
              aria-pressed={locale === "en"}
            >
              EN
            </button>
          </div>

          <button
            className="nav-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="nav-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={toggle}
          >
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
            <span className="nav-toggle-bar" />
          </button>
        </div>
      </div>
    </header>
  );
}
