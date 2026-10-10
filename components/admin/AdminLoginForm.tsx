"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextPath = searchParams.get("next") || "/admin";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error || "No se pudo iniciar sesión");
      return;
    }

    router.replace(nextPath);
    router.refresh();
  }

  return (
    <form className="admin-login-form" onSubmit={onSubmit}>
      <label htmlFor="admin-password">Contraseña de administrador</label>
      <input
        id="admin-password"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      {error && <p className="admin-error">{error}</p>}
      <button type="submit" className="btn btn--primary" disabled={loading}>
        {loading ? "Entrando…" : "Entrar al panel"}
      </button>
    </form>
  );
}
