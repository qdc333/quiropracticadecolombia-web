"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { SITE, buildWaUrl } from "@/lib/site";

export default function ConsultaForm() {
  const nextInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<"" | "success" | "error">("");

  useEffect(() => {
    if (nextInputRef.current) {
      nextInputRef.current.value = `${window.location.origin}/gracias`;
    }
  }, []);

  function setFormStatus(text: string, type: "" | "success" | "error" = "") {
    setStatus(text);
    setStatusType(type);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    const form = e.currentTarget;
    const honey = form.querySelector<HTMLInputElement>('input[name="_honey"]');
    if (honey?.value) {
      e.preventDefault();
      return;
    }

    const nombre = (form.elements.namedItem("nombre") as HTMLInputElement).value.trim();
    const telefono = (form.elements.namedItem("telefono") as HTMLInputElement).value.trim();
    const correo = (form.elements.namedItem("correo_paciente") as HTMLInputElement).value.trim();
    const sintoma = (form.elements.namedItem("sintoma") as HTMLSelectElement).value;
    const mensaje = (form.elements.namedItem("mensaje") as HTMLTextAreaElement).value.trim();
    const subjectInput = form.querySelector<HTMLInputElement>('input[name="_subject"]');
    const replyInput = form.querySelector<HTMLInputElement>('input[name="_replyto"]');

    if (!nombre || !telefono || !sintoma || !mensaje) {
      e.preventDefault();
      setFormStatus("Completa los campos obligatorios.", "error");
      return;
    }

    if (subjectInput) {
      subjectInput.value = `Nuevo paciente web — ${sintoma} — ${nombre}`;
    }
    if (replyInput && correo) {
      replyInput.value = correo;
    }

    setFormStatus("Enviando solicitud…", "");
  }

  return (
    <div className="contact-form-wrap">
      <h3 className="form-title">Solicitud de consulta</h3>
      <p className="form-desc">
        Completa este formulario. La información llegará al correo de la clínica para que el Dr.
        Kevin haga el filtro inicial.
      </p>

      <form
        id="consulta-form"
        className="consulta-form"
        action={`https://formsubmit.co/${encodeURIComponent(SITE.formEmail)}`}
        method="POST"
        noValidate
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="_subject" value="Nuevo paciente web — Quiropráctica de Colombia" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" ref={nextInputRef} defaultValue="/gracias" />

        <div className="form-row">
          <label htmlFor="nombre">
            Nombre completo <span aria-hidden="true">*</span>
          </label>
          <input type="text" id="nombre" name="nombre" required autoComplete="name" placeholder="Tu nombre" />
        </div>
        <div className="form-row">
          <label htmlFor="telefono">
            Teléfono / WhatsApp <span aria-hidden="true">*</span>
          </label>
          <input type="tel" id="telefono" name="telefono" required autoComplete="tel" placeholder="+57 300 000 0000" />
        </div>
        <div className="form-row">
          <label htmlFor="email-paciente">Correo (opcional)</label>
          <input
            type="email"
            id="email-paciente"
            name="correo_paciente"
            autoComplete="email"
            placeholder="correo@ejemplo.com"
          />
        </div>
        <div className="form-row">
          <label htmlFor="sintoma">
            Síntoma principal <span aria-hidden="true">*</span>
          </label>
          <select id="sintoma" name="sintoma" required defaultValue="">
            <option value="">Selecciona una opción</option>
            <option value="Vértigo o mareos">Vértigo o mareos</option>
            <option value="Migrañas o cefaleas">Migrañas o cefaleas</option>
            <option value="Tinnitus (zumbido)">Tinnitus (zumbido)</option>
            <option value="Neuralgia del trigémino">Neuralgia del trigémino</option>
            <option value="Otro / varios síntomas">Otro / varios síntomas</option>
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="mensaje">
            Cuéntanos brevemente tu caso <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={4}
            required
            placeholder="Desde cuándo tienes el síntoma, qué has probado, etc."
          />
        </div>
        <input type="text" name="_honey" className="form-honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <input type="hidden" name="_replyto" defaultValue="" />
        <button type="submit" className="btn btn--primary btn--large" id="form-submit-btn">
          Enviar solicitud al doctor
        </button>
        <p
          className={`form-status${statusType ? ` is-${statusType}` : ""}`}
          id="form-status"
          role="status"
          aria-live="polite"
        >
          {status}
        </p>
        <p className="form-note">
          También puedes escribir directo por{" "}
          <a href={buildWaUrl("general")} className="contact-link" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          .
        </p>
      </form>
    </div>
  );
}
