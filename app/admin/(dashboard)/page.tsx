"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAdminEmail } from "@/lib/auth-client";
import { adminGetMissions } from "@/lib/admin-api";
import { isMockMode } from "@/lib/api";

export default function AdminDashboardPage() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    adminGetMissions()
      .then((m) => setCount(m.length))
      .catch(() => setCount(0));
  }, []);

  return (
    <div className="admin-page">
      <h1>Hola, {getAdminEmail()}</h1>
      <p>Gestiona el contenido del sitio y las misiones desde aquí.</p>
      {isMockMode() && (
        <p className="admin-form__ok">Modo demo del frontend — conecta el backend para datos reales.</p>
      )}

      <div className="admin-cards">
        <Link href="/admin/contenido" className="admin-card">
          <h2>Contenido del sitio</h2>
          <p>Edita textos del inicio, contacto y enlaces.</p>
        </Link>
        <Link href="/admin/misiones" className="admin-card">
          <h2>Misiones ({count})</h2>
          <p>Crea, edita o elimina misiones y eventos.</p>
        </Link>
      </div>
    </div>
  );
}
