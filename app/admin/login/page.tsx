"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "@/lib/admin-api";
import { saveAdminSession } from "@/lib/auth-client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const fd = new FormData(e.currentTarget);
    try {
      const data = await adminLogin(String(fd.get("email")), String(fd.get("password")));
      saveAdminSession(data.token, data.email);
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-screen">
      <aside className="admin-login-brand">
        <h1>Panel de gestión</h1>
        <p>
          Acceso privado solo para el administrador del sitio. No aparece en el menú público —
          entra únicamente con esta URL y tus credenciales.
        </p>
        <ul>
          <li>Editar textos e información de contacto</li>
          <li>Subir y eliminar misiones</li>
          <li>Gestionar precios e imágenes</li>
        </ul>
      </aside>

      <div className="admin-login-panel">
        <form className="admin-login-card" onSubmit={onSubmit}>
          <span className="admin-login-card__badge">Acceso restringido</span>
          <h2>Iniciar sesión</h2>
          <p>Ingresa tus credenciales de administrador</p>

          {error && <p className="admin-form__error">{error}</p>}

          <div className="admin-login-field">
            <label htmlFor="admin-email">Correo electrónico</label>
            <div className="admin-login-input-wrap">
              <input
                id="admin-email"
                name="email"
                type="email"
                required
                autoComplete="username"
                placeholder="admin@quiropracticadecolombia.com"
              />
            </div>
          </div>

          <div className="admin-login-field">
            <label htmlFor="admin-password">Contraseña</label>
            <div className="admin-login-input-wrap">
              <input
                id="admin-password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="admin-login-toggle-pw"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? "Ocultar" : "Ver"}
              </button>
            </div>
          </div>

          <button type="submit" className="admin-btn admin-btn--primary admin-btn--block" disabled={loading}>
            {loading ? "Verificando…" : "Entrar al panel"}
          </button>

          <Link href="/" className="admin-login-back">
            ← Volver al sitio público
          </Link>
        </form>
      </div>
    </div>
  );
}
