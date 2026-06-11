"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearAdminSession } from "@/lib/auth-client";

const LINKS = [
  { href: "/admin", label: "Inicio" },
  { href: "/admin/contenido", label: "Contenido del sitio" },
  { href: "/admin/misiones", label: "Misiones" },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  function logout() {
    clearAdminSession();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="admin-nav">
      <div className="admin-nav__inner">
        <Link href="/admin" className="admin-nav__brand">
          Panel · Quiropráctica de Colombia
        </Link>
        <nav className="admin-nav__links">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "is-active" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/" target="_blank">
            Ver sitio
          </Link>
          <button type="button" onClick={logout}>
            Salir
          </button>
        </nav>
      </div>
    </header>
  );
}
