"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/content";
import { adminGetMissions } from "@/lib/admin-api";
import type { Mission } from "@/lib/api";
import DeleteMissionButton from "@/components/admin/DeleteMissionButton";

export default function AdminMissionsPage() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminGetMissions()
      .then(setMissions)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="admin-page"><p>Cargando…</p></div>;

  return (
    <div className="admin-page">
      <div className="admin-page__head">
        <h1>Misiones</h1>
        <Link href="/admin/misiones/nueva" className="admin-btn admin-btn--primary">
          + Nueva misión
        </Link>
      </div>

      {missions.length === 0 ? (
        <p>No hay misiones. Crea la primera con el botón de arriba.</p>
      ) : (
        <div className="admin-table">
          {missions.map((m) => (
            <div key={m.id} className="admin-table__row">
              {m.imageUrl && <img src={m.imageUrl} alt="" className="admin-table__thumb" />}
              <div>
                <strong>{m.title}</strong>
                <p>
                  {formatPrice(m.priceCents, m.currency)} · {m.active ? "Publicada" : "Oculta"}
                </p>
              </div>
              <div className="admin-table__actions">
                <Link href={`/admin/misiones/${m.id}`}>Editar</Link>
                <DeleteMissionButton id={m.id} onDeleted={() => setMissions((prev) => prev.filter((x) => x.id !== m.id))} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
