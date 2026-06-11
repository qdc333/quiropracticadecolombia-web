"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import MissionForm from "@/components/admin/MissionForm";
import { adminGetMissions } from "@/lib/admin-api";
import type { Mission } from "@/lib/api";

export default function EditMissionPage() {
  const { id } = useParams<{ id: string }>();
  const [mission, setMission] = useState<Mission | null>(null);

  useEffect(() => {
    adminGetMissions().then((list) => setMission(list.find((m) => m.id === id) ?? null));
  }, [id]);

  if (!mission) return <div className="admin-page"><p>Cargando…</p></div>;

  return (
    <div className="admin-page">
      <h1>Editar misión</h1>
      <MissionForm
        initial={{
          id: mission.id,
          title: mission.title,
          summary: mission.summary,
          description: mission.description,
          priceCents: mission.priceCents,
          imageUrl: mission.imageUrl ?? "",
          badge: mission.badge ?? "",
          dateLabel: mission.dateLabel ?? "",
          active: mission.active,
          sortOrder: mission.sortOrder,
        }}
      />
    </div>
  );
}
