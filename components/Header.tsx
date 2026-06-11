"use client";

import { useCallback, useEffect, useState } from "react";

const NAV_ITEMS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#causa", label: "La causa" },
  { href: "#especialidad", label: "Especialidad" },
  { href: "#metodo", label: "Método" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#misiones", label: "Misiones" },
  { href: "#redes", label: "Redes" },
  { href: "/carrito", label: "Carrito", external: true },
  { href: "#contacto", label: "Agendar", cta: true },
];

export default function Header() {
  const [open, setOpen] = useState(false);

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

        <div
          className={`nav-backdrop${open ? " is-visible" : ""}`}
          id="nav-backdrop"
          aria-hidden={!open}
          onClick={close}
        />

        <nav className={`nav${open ? " is-open" : ""}`} id="nav-menu" aria-label="Secciones del sitio">
          <ul className="nav-list">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`nav-link${"cta" in item && item.cta ? " nav-link--cta" : ""}`}
                  onClick={item.href.startsWith("#") ? close : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
