"use client";

import { FormEvent, useEffect, useState } from "react";
import { FORM_UI_EN, FORM_UI_ES } from "@/lib/i18n/content-en";
import type { Locale } from "@/lib/i18n/locale";
import { SITE, buildWaUrl } from "@/lib/site";

function buildThankYouUrl() {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/gracias`;
  }
  const base = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  return base ? `${base}/gracias` : "";
}

type Props = {
  locale?: Locale;
};

export default function ConsultaForm({ locale = "es" }: Props) {
  const ui = locale === "en" ? FORM_UI_EN : FORM_UI_ES;
  const [thankYouUrl, setThankYouUrl] = useState(buildThankYouUrl);
  const [status, setStatus] = useState("");
  const [statusType, setStatusType] = useState<"" | "success" | "error">("");

  useEffect(() => {
    setThankYouUrl(`${window.location.origin}/gracias`);
  }, []);

  function setFormStatus(text: string, type: "" | "success" | "error" = "") {
    setStatus(text);
    setStatusType(type);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const honey = form.querySelector<HTMLInputElement>('input[name="_honey"]');
    if (honey?.value) {
      return;
    }

    const nombre = (form.elements.namedItem("nombre") as HTMLInputElement).value.trim();
    const telefono = (form.elements.namedItem("telefono") as HTMLInputElement).value.trim();
    const correo = (form.elements.namedItem("correo_paciente") as HTMLInputElement).value.trim();
    const sintoma = (form.elements.namedItem("sintoma") as HTMLSelectElement).value;
    const mensaje = (form.elements.namedItem("mensaje") as HTMLTextAreaElement).value.trim();
    const subjectInput = form.querySelector<HTMLInputElement>('input[name="_subject"]');
    const replyInput = form.querySelector<HTMLInputElement>('input[name="_replyto"]');
    const nextInput = form.querySelector<HTMLInputElement>('input[name="_next"]');
    const urlInput = form.querySelector<HTMLInputElement>('input[name="_url"]');

    if (!nombre || !telefono || !sintoma || !mensaje) {
      setFormStatus(ui.errorRequired, "error");
      return;
    }

    if (subjectInput) {
      subjectInput.value = `${ui.subjectPrefix} ${sintoma} — ${nombre}`;
    }
    if (replyInput && correo) {
      replyInput.value = correo;
    }

    const redirectUrl = `${window.location.origin}/gracias`;
    if (nextInput) {
      nextInput.value = redirectUrl;
    }
    if (urlInput) {
      urlInput.value = window.location.href;
    }

    setFormStatus(ui.sending, "");
    form.submit();
  }

  return (
    <div className="contact-form-wrap">
      <h3 className="form-title">{ui.title}</h3>
      <p className="form-desc">{ui.desc}</p>

      <form
        id="consulta-form"
        className="consulta-form"
        action={`https://formsubmit.co/${SITE.formEmail}`}
        method="POST"
        encType="application/x-www-form-urlencoded"
        noValidate
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="_subject" value={ui.hiddenSubject} />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="true" />
        <input type="hidden" name="_next" value={thankYouUrl} readOnly />
        <input type="hidden" name="_url" defaultValue="" readOnly />

        <div className="form-row">
          <label htmlFor="nombre">
            {ui.name} <span aria-hidden="true">*</span>
          </label>
          <input type="text" id="nombre" name="nombre" required autoComplete="name" placeholder={ui.namePlaceholder} />
        </div>
        <div className="form-row">
          <label htmlFor="telefono">
            {ui.phone} <span aria-hidden="true">*</span>
          </label>
          <input type="tel" id="telefono" name="telefono" required autoComplete="tel" placeholder="+57 300 000 0000" />
        </div>
        <div className="form-row">
          <label htmlFor="email-paciente">{ui.emailOptional}</label>
          <input
            type="email"
            id="email-paciente"
            name="correo_paciente"
            autoComplete="email"
            placeholder={ui.emailPlaceholder}
          />
        </div>
        <div className="form-row">
          <label htmlFor="sintoma">
            {ui.symptom} <span aria-hidden="true">*</span>
          </label>
          <select id="sintoma" name="sintoma" required defaultValue="">
            <option value="">{ui.selectPlaceholder}</option>
            {ui.symptoms.map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="mensaje">
            {ui.message} <span aria-hidden="true">*</span>
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={4}
            required
            placeholder={ui.messagePlaceholder}
          />
        </div>
        <input type="text" name="_honey" className="form-honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <input type="hidden" name="_replyto" defaultValue="" />
        <button type="submit" className="btn btn--primary btn--large" id="form-submit-btn">
          {ui.submit}
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
          {ui.noteBefore}{" "}
          <a href={buildWaUrl("general")} className="contact-link" target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          .
        </p>
      </form>
    </div>
  );
}
