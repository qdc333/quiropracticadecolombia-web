"use client";

import { useState } from "react";
import { adminDeleteMission } from "@/lib/admin-api";

export default function DeleteMissionButton({
  id,
  onDeleted,
}: {
  id: string;
  onDeleted?: () => void;
}) {
  const [loading, setLoading] = useState(false);

  async function remove() {
    if (!confirm("¿Eliminar esta misión? No se puede deshacer.")) return;
    setLoading(true);
    try {
      await adminDeleteMission(id);
      onDeleted?.();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button type="button" className="admin-danger" onClick={remove} disabled={loading}>
      {loading ? "…" : "Eliminar"}
    </button>
  );
}
