"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { adminCreateMission, adminUpdateMission, adminUploadImage } from "@/lib/admin-api";

type MissionData = {
  id?: string;
  title: string;
  summary: string;
  description: string;
  priceCents: number;
  imageUrl: string;
  badge: string;
  dateLabel: string;
  active: boolean;
  sortOrder: number;
};

type Props = { initial?: MissionData };

export default function MissionForm({ initial }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<MissionData>(
    initial ?? {
      title: "",
      summary: "",
      description: "",
      priceCents: 0,
      imageUrl: "",
      badge: "",
      dateLabel: "",
      active: true,
      sortOrder: 0,
    }
  );

  async function uploadImage(file: File) {
    setUploading(true);
    setError("");
    try {
      const data = await adminUploadImage(file);
      setForm((f) => ({ ...f, imageUrl: data.url }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al subir imagen");
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      priceCents: Math.round(form.priceCents),
      imageUrl: form.imageUrl || null,
      badge: form.badge || null,
      dateLabel: form.dateLabel || null,
    };

    try {
      if (initial?.id) await adminUpdateMission(initial.id, payload);
      else await adminCreateMission(payload);
      router.push("/admin/misiones");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error al guardar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      {error && <p className="admin-form__error">{error}</p>}

      <label>
        Título de la misión *
        <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      </label>

      <label>
        Fecha / período
        <input value={form.dateLabel} onChange={(e) => setForm({ ...form, dateLabel: e.target.value })} />
      </label>

      <label>
        Etiqueta (opcional)
        <input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} />
      </label>

      <label>
        Resumen (tarjeta)
        <input value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
      </label>

      <label>
        Descripción completa
        <textarea rows={8} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      </label>

      <label>
        Precio (pesos COP) *
        <input type="number" required min={1} value={form.priceCents || ""} onChange={(e) => setForm({ ...form, priceCents: Number(e.target.value) })} />
      </label>

      <label>
        Orden en la lista
        <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} />
      </label>

      <label className="admin-form__check">
        <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} />
        Publicada (visible en el sitio)
      </label>

      <div className="admin-form__image">
        <label>
          Imagen de la misión
          <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImage(f); }} />
        </label>
        {uploading && <p>Subiendo imagen…</p>}
        {form.imageUrl && <img src={form.imageUrl} alt="Vista previa" className="admin-form__preview" />}
      </div>

      <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
        {saving ? "Guardando…" : initial?.id ? "Actualizar misión" : "Crear misión"}
      </button>
    </form>
  );
}
