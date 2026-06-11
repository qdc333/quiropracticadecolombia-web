"use client";

import { FormEvent, useEffect, useState } from "react";
import type { ContactContent, HeroContent } from "@/lib/content";
import { adminGetContent, adminSaveContent } from "@/lib/admin-api";

export default function ContentForm() {
  const [hero, setHero] = useState<HeroContent | null>(null);
  const [contact, setContact] = useState<ContactContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    adminGetContent()
      .then((data) => {
        setHero(data.hero);
        setContact(data.contact);
      })
      .catch(() => setMessage("No se pudo cargar. ¿Está el backend corriendo?"));
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!hero || !contact) return;
    setSaving(true);
    setMessage("");
    try {
      await adminSaveContent({ hero, contact });
      setMessage("Contenido guardado.");
    } catch {
      setMessage("Error al guardar.");
    } finally {
      setSaving(false);
    }
  }

  if (!hero || !contact) return <p>{message || "Cargando…"}</p>;

  return (
    <form className="admin-form" onSubmit={onSubmit}>
      <h2>Inicio (Hero)</h2>
      <label>
        Texto superior
        <input value={hero.eyebrow} onChange={(e) => setHero({ ...hero, eyebrow: e.target.value })} />
      </label>
      <label>
        Título principal
        <textarea rows={3} value={hero.title} onChange={(e) => setHero({ ...hero, title: e.target.value })} />
      </label>
      <label>
        Subtítulo
        <textarea rows={4} value={hero.subtitle} onChange={(e) => setHero({ ...hero, subtitle: e.target.value })} />
      </label>

      <h2>Contacto y enlaces</h2>
      <label>
        WhatsApp
        <input value={contact.whatsapp} onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })} />
      </label>
      <label>
        Correo de contacto
        <input value={contact.contactEmail} onChange={(e) => setContact({ ...contact, contactEmail: e.target.value })} />
      </label>
      <label>
        Correo del formulario
        <input value={contact.formEmail} onChange={(e) => setContact({ ...contact, formEmail: e.target.value })} />
      </label>
      <label>
        Dirección
        <input value={contact.address} onChange={(e) => setContact({ ...contact, address: e.target.value })} />
      </label>
      <label>
        Enlace Google Maps
        <input value={contact.mapsUrl} onChange={(e) => setContact({ ...contact, mapsUrl: e.target.value })} />
      </label>
      <label>
        Formulario de diagnóstico
        <input value={contact.diagnosticoFormUrl} onChange={(e) => setContact({ ...contact, diagnosticoFormUrl: e.target.value })} />
      </label>

      {message && <p className="admin-form__ok">{message}</p>}
      <button type="submit" className="admin-btn admin-btn--primary" disabled={saving}>
        {saving ? "Guardando…" : "Guardar cambios"}
      </button>
    </form>
  );
}
