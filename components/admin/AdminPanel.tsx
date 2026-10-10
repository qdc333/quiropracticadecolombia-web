"use client";

import AdminMisionesMissionsEditor from "@/components/admin/AdminMisionesMissionsEditor";
import type { CmsImage, CmsSectionBlock, SiteContent } from "@/lib/cms/types";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

type Props = {
  initialContent: SiteContent;
};

type TabId =
  | "hero"
  | "vision"
  | "mision-corp"
  | "reviews"
  | "causa"
  | "especialidad"
  | "metodo"
  | "misiones"
  | "nosotros"
  | "redes"
  | "contact"
  | "images";

function lines(value: string) {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function visionMisionBlockFromForm(form: FormData, prefix: "vision" | "mision") {
  const imageSrc = String(form.get(`${prefix}-image-src`) || "").trim();
  const heading = String(form.get(`${prefix}-heading`) || "").trim();
  return {
    title: String(form.get(`${prefix}-block-title`) || ""),
    heading: heading || undefined,
    statement: String(form.get(`${prefix}-statement`) || ""),
    paragraphs: lines(String(form.get(`${prefix}-paragraphs`) || "")),
    image: imageSrc
      ? {
          src: imageSrc,
          alt: String(form.get(`${prefix}-image-alt`) || ""),
        }
      : undefined,
  };
}

function sectionFromForm(form: FormData, prefix: string): CmsSectionBlock {
  const imageSrc = String(form.get(`${prefix}-image-src`) || "").trim();
  return {
    tag: String(form.get(`${prefix}-tag`) || ""),
    title: String(form.get(`${prefix}-title`) || ""),
    lead: String(form.get(`${prefix}-lead`) || "") || undefined,
    paragraphs: lines(String(form.get(`${prefix}-paragraphs`) || "")),
    image: imageSrc
      ? {
          src: imageSrc,
          alt: String(form.get(`${prefix}-image-alt`) || ""),
        }
      : undefined,
  };
}

function SectionBlockFields({
  prefix,
  section,
  withImage,
  onUpload,
}: {
  prefix: string;
  section: CmsSectionBlock;
  withImage?: boolean;
  onUpload: (input: HTMLInputElement, targetId: string) => void;
}) {
  return (
    <>
      <label>Etiqueta</label>
      <input name={`${prefix}-tag`} defaultValue={section.tag} />
      <label>Título</label>
      <input name={`${prefix}-title`} defaultValue={section.title} />
      <label>Lead</label>
      <textarea name={`${prefix}-lead`} rows={2} defaultValue={section.lead || ""} />
      <label>Párrafos (uno por línea)</label>
      <textarea name={`${prefix}-paragraphs`} rows={8} defaultValue={section.paragraphs.join("\n")} />
      {withImage && (
        <>
          <label htmlFor={`${prefix}-image-src`}>Foto (URL)</label>
          <input
            id={`${prefix}-image-src`}
            name={`${prefix}-image-src`}
            defaultValue={section.image?.src || ""}
            placeholder="/images/cms/tu-foto.jpg"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(event) => onUpload(event.currentTarget, `${prefix}-image-src`)}
          />
          <label>Texto alternativo de la foto</label>
          <input name={`${prefix}-image-alt`} defaultValue={section.image?.alt || ""} />
          <p className="admin-hint">Si subes foto aquí, la sección se muestra con imagen al lado del texto.</p>
        </>
      )}
    </>
  );
}

export default function AdminPanel({ initialContent }: Props) {
  const [content, setContent] = useState(initialContent);
  const [tab, setTab] = useState<TabId>("hero");
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [misionesMissionsDraft, setMisionesMissionsDraft] = useState(initialContent.misiones.missions);
  const missionsDraftRef = useRef(initialContent.misiones.missions);

  const handleMisionesMissionsChange = useCallback((missions: typeof initialContent.misiones.missions) => {
    missionsDraftRef.current = missions;
    setMisionesMissionsDraft(missions);
  }, []);

  async function saveFromForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setStatus("");

    const form = new FormData(event.currentTarget);
    let next: SiteContent = { ...content };

    try {
      if (tab === "hero") {
        next = {
          ...next,
          hero: {
            eyebrow: String(form.get("hero-eyebrow") || ""),
            title: String(form.get("hero-title") || ""),
            subtitle: String(form.get("hero-subtitle") || ""),
          },
        };
      }

      if (tab === "vision") {
        next = {
          ...next,
          visionMision: {
            ...next.visionMision,
            vision: visionMisionBlockFromForm(form, "vision"),
          },
        };
      }

      if (tab === "mision-corp") {
        next = {
          ...next,
          visionMision: {
            ...next.visionMision,
            mision: visionMisionBlockFromForm(form, "mision"),
          },
        };
      }

      if (tab === "misiones") {
        next = {
          ...next,
          misiones: {
            ...content.misiones,
            tag: String(form.get("misiones-tag") || ""),
            title: String(form.get("misiones-title") || ""),
            lead: String(form.get("misiones-lead") || "") || undefined,
            paragraphs: lines(String(form.get("misiones-paragraphs") || "")),
            archiveCtaLabel: String(form.get("misiones-archive-cta") || ""),
            introImage: {
              src: String(form.get("misiones-intro-image-src") || ""),
              alt: String(form.get("misiones-intro-image-alt") || ""),
            },
            photos: content.misiones.photos,
            ctaLabel: String(form.get("misiones-cta") || ""),
            arte: {
              tag: String(form.get("misiones-arte-tag") || ""),
              title: String(form.get("misiones-arte-title") || ""),
              paragraphs: lines(String(form.get("misiones-arte-paragraphs") || "")),
              image: {
                src: String(form.get("misiones-arte-image-src") || ""),
                alt: String(form.get("misiones-arte-image-alt") || ""),
              },
            },
            archiveTitle: String(form.get("misiones-archive-title") || ""),
            archiveLead: String(form.get("misiones-archive-lead") || "") || undefined,
            archiveParagraphs: lines(String(form.get("misiones-archive-paragraphs") || "")),
            archiveImage: {
              src: String(form.get("misiones-archive-image-src") || ""),
              alt: String(form.get("misiones-archive-image-alt") || ""),
            },
            missions: missionsDraftRef.current,
          },
        };
      }

      if (tab === "causa") {
        next = {
          ...next,
          causa: {
            tag: String(form.get("causa-tag") || ""),
            title: String(form.get("causa-title") || ""),
            figcaption: String(form.get("causa-figcaption") || ""),
            paragraphs: lines(String(form.get("causa-paragraphs") || "")),
            steps: JSON.parse(String(form.get("causa-steps-json") || "[]")),
          },
        };
      }

      if (tab === "especialidad") {
        next = {
          ...next,
          especialidad: {
            tag: String(form.get("esp-tag") || ""),
            title: String(form.get("esp-title") || ""),
            lead: String(form.get("esp-lead") || ""),
            ctaLabel: String(form.get("esp-cta") || ""),
            symptoms: JSON.parse(String(form.get("esp-symptoms-json") || "[]")),
          },
        };
      }

      if (tab === "metodo") {
        next = {
          ...next,
          metodo: {
            tag: String(form.get("metodo-tag") || ""),
            title: String(form.get("metodo-title") || ""),
            paragraphs: lines(String(form.get("metodo-paragraphs") || "")),
            pillars: JSON.parse(String(form.get("metodo-pillars-json") || "[]")),
          },
        };
      }

      if (tab === "nosotros") {
        next = {
          ...next,
          nosotros: {
            tag: String(form.get("nos-tag") || ""),
            title: String(form.get("nos-title") || ""),
            paragraphs: lines(String(form.get("nos-paragraphs") || "")),
            badges: JSON.parse(String(form.get("nos-badges-json") || "[]")),
          },
        };
      }

      if (tab === "redes") {
        next = {
          ...next,
          redes: JSON.parse(String(form.get("redes-json") || "{}")),
        };
      }

      if (tab === "contact") {
        next = {
          ...next,
          contactPage: {
            tag: String(form.get("cp-tag") || ""),
            title: String(form.get("cp-title") || ""),
            lead: String(form.get("cp-lead") || ""),
            mapTitle: String(form.get("cp-map-title") || ""),
            mapAddress: String(form.get("cp-map-address") || ""),
            mapButtonLabel: String(form.get("cp-map-btn") || ""),
          },
          contact: {
            whatsapp: String(form.get("contact-whatsapp") || ""),
            contactEmail: String(form.get("contact-email") || ""),
            formEmail: String(form.get("contact-form-email") || ""),
            address: String(form.get("contact-address") || ""),
            mapsUrl: String(form.get("contact-maps") || ""),
            diagnosticoFormUrl: String(form.get("contact-diagnostico") || ""),
          },
        };
      }

      if (tab === "images") {
        next = {
          ...next,
          images: {
            hero: String(form.get("img-hero") || ""),
            causa: String(form.get("img-causa") || ""),
            metodo: String(form.get("img-metodo") || ""),
            nosotros: String(form.get("img-nosotros") || ""),
            logo: String(form.get("img-logo") || ""),
          },
        };
      }

      if (tab === "reviews") {
        next = { ...next, googleReviews: JSON.parse(String(form.get("reviews-json") || "{}")) };
      }
    } catch {
      setSaving(false);
      setStatus("Revisa el JSON o los campos de esta pestaña.");
      return;
    }

    next = {
      ...next,
      misiones: {
        ...next.misiones,
        missions: missionsDraftRef.current,
      },
    };

    const res = await fetch("/api/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });

    setSaving(false);

    if (!res.ok) {
      setStatus("Error al guardar.");
      return;
    }

    const saved = (await res.json()) as SiteContent;
    missionsDraftRef.current = saved.misiones.missions;
    setContent(saved);
    setMisionesMissionsDraft(saved.misiones.missions);
    setStatus(`Guardado · ${new Date(saved.updatedAt).toLocaleString("es-CO")}. El sitio se actualiza en unos segundos.`);
  }

  async function uploadImageFile(file: File): Promise<string | null> {
    const body = new FormData();
    body.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body });
    const data = (await res.json()) as { url?: string; error?: string };

    if (!res.ok || !data.url) {
      setStatus(data.error || "No se pudo subir la imagen.");
      return null;
    }

    setStatus(`Imagen subida: ${data.url} · Pulsa «Guardar cambios» abajo para que quede en Mongo y en la web.`);
    return data.url;
  }

  async function uploadImage(input: HTMLInputElement, targetId: string) {
    const file = input.files?.[0];
    if (!file) return;

    const url = await uploadImageFile(file);
    if (!url) return;

    const field = document.getElementById(targetId) as HTMLInputElement | null;
    if (field) field.value = url;
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  const tabs: { id: TabId; label: string }[] = [
    { id: "hero", label: "Inicio" },
    { id: "vision", label: "Visión" },
    { id: "mision-corp", label: "Misión" },
    { id: "reviews", label: "Reseñas" },
    { id: "causa", label: "La causa" },
    { id: "especialidad", label: "Especialidad" },
    { id: "metodo", label: "Método" },
    { id: "misiones", label: "Misiones quiroprácticas" },
    { id: "nosotros", label: "Nosotros" },
    { id: "redes", label: "Redes" },
    { id: "contact", label: "Contacto" },
    { id: "images", label: "Fotos del sitio" },
  ];

  return (
    <div className="admin-shell">
      <header className="admin-top">
        <div>
          <p className="admin-kicker">Panel privado</p>
          <h1>Administrador del sitio</h1>
          <p className="admin-hint">
            Lo que guardas aquí es lo mismo que ve el sitio público (textos, misiones, 3 álbumes de fotos por misión).
            En tu PC se guarda en <code>content/site-content.json</code>; en producción configura{" "}
            <code>MONGODB_URI</code> para editar desde el celular y que persista para todos.
          </p>
        </div>
        <div className="admin-top-actions">
          <Link href="/" className="btn btn--ghost" target="_blank" rel="noreferrer">
            Ver sitio
          </Link>
          <button type="button" className="btn btn--outline" onClick={logout}>
            Salir
          </button>
        </div>
      </header>

      <nav className="admin-tabs" aria-label="Secciones del sitio">
        {tabs.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`admin-tab${tab === item.id ? " is-active" : ""}`}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <form key={tab} className="admin-form" onSubmit={saveFromForm}>
        {tab === "hero" && (
          <>
            <label>Eyebrow</label>
            <input name="hero-eyebrow" defaultValue={content.hero.eyebrow} />
            <label>Título</label>
            <textarea name="hero-title" rows={3} defaultValue={content.hero.title} />
            <label>Subtítulo</label>
            <textarea name="hero-subtitle" rows={4} defaultValue={content.hero.subtitle} />
          </>
        )}

        {tab === "vision" && (
          <>
            <p className="admin-hint">Sección pública «Visión» (fondo rojo suave). Texto breve; máximo 2 párrafos visibles.</p>
            <label>Etiqueta</label>
            <input name="vision-block-title" defaultValue={content.visionMision.vision.title} />
            <label>Título visible</label>
            <input name="vision-heading" defaultValue={content.visionMision.vision.heading || ""} />
            <label>Declaración principal</label>
            <textarea name="vision-statement" rows={3} defaultValue={content.visionMision.vision.statement} />
            <label>Párrafos (uno por línea, máx. 2 visibles)</label>
            <textarea name="vision-paragraphs" rows={4} defaultValue={content.visionMision.vision.paragraphs.join("\n")} />
            <label htmlFor="vision-image-src">Foto visión (URL)</label>
            <input id="vision-image-src" name="vision-image-src" defaultValue={content.visionMision.vision.image?.src || ""} />
            <input type="file" accept="image/*" onChange={(event) => uploadImage(event.currentTarget, "vision-image-src")} />
            <label>Texto alternativo foto visión</label>
            <input name="vision-image-alt" defaultValue={content.visionMision.vision.image?.alt || ""} />
            {content.visionMision.vision.image?.src ? (
              <img
                src={content.visionMision.vision.image.src}
                alt=""
                className="admin-mission-preview"
              />
            ) : null}
          </>
        )}

        {tab === "mision-corp" && (
          <>
            <p className="admin-hint">
              Sección pública «Misión» (fondo blanco), debajo de Visión. Hasta 3 párrafos visibles; enfoque en el
              día a día en consulta (no repetir el mapa ni «Misiones quiroprácticas»).
            </p>
            <label>Etiqueta</label>
            <input name="mision-block-title" defaultValue={content.visionMision.mision.title} />
            <label>Título visible</label>
            <input name="mision-heading" defaultValue={content.visionMision.mision.heading || ""} />
            <label>Declaración principal</label>
            <textarea name="mision-statement" rows={3} defaultValue={content.visionMision.mision.statement} />
            <label>Párrafos (uno por línea, máx. 3 visibles)</label>
            <textarea name="mision-paragraphs" rows={6} defaultValue={content.visionMision.mision.paragraphs.join("\n")} />
            <label htmlFor="mision-image-src">Foto misión (URL)</label>
            <input id="mision-image-src" name="mision-image-src" defaultValue={content.visionMision.mision.image?.src || ""} />
            <input type="file" accept="image/*" onChange={(event) => uploadImage(event.currentTarget, "mision-image-src")} />
            <label>Texto alternativo foto misión</label>
            <input name="mision-image-alt" defaultValue={content.visionMision.mision.image?.alt || ""} />
            {content.visionMision.mision.image?.src ? (
              <img
                src={content.visionMision.mision.image.src}
                alt=""
                className="admin-mission-preview"
              />
            ) : null}
          </>
        )}

        {tab === "misiones" && (
          <>
            <h3 className="admin-subheading">Encabezado — /misiones-quiropracticas</h3>
            <p className="admin-hint">
              Lo que editas aquí es la zona superior de{" "}
              <Link href="/misiones-quiropracticas" target="_blank" rel="noreferrer">
                Ver todas las misiones
              </Link>
              : etiqueta, título, textos e ilustración al lado.
            </p>
            <label>Etiqueta pequeña (también en el home)</label>
            <input name="misiones-tag" defaultValue={content.misiones.tag} />
            <label>Título de la página</label>
            <input name="misiones-archive-title" defaultValue={content.misiones.archiveTitle} />
            <label>Lead</label>
            <textarea name="misiones-archive-lead" rows={2} defaultValue={content.misiones.archiveLead || ""} />
            <label>Intro (un párrafo por línea)</label>
            <textarea
              name="misiones-archive-paragraphs"
              rows={4}
              defaultValue={content.misiones.archiveParagraphs.join("\n")}
            />
            <label htmlFor="misiones-archive-image-src">Ilustración / foto (columna derecha)</label>
            <input
              id="misiones-archive-image-src"
              name="misiones-archive-image-src"
              defaultValue={content.misiones.archiveImage?.src || ""}
              placeholder="/images/cms/misiones-archivo-atlantico.png"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(event) => uploadImage(event.currentTarget, "misiones-archive-image-src")}
            />
            <label>Texto alternativo — ilustración</label>
            <input
              name="misiones-archive-image-alt"
              defaultValue={content.misiones.archiveImage?.alt || ""}
            />
            {content.misiones.archiveImage?.src ? (
              <img src={content.misiones.archiveImage.src} alt="" className="admin-mission-preview" />
            ) : null}
            <hr />
            <h3 className="admin-subheading">Sección misiones en el home</h3>
            <label>Título</label>
            <input name="misiones-title" defaultValue={content.misiones.title} />
            <label>Lead</label>
            <textarea name="misiones-lead" rows={2} defaultValue={content.misiones.lead || ""} />
            <label>Relato (un párrafo por línea)</label>
            <textarea
              name="misiones-paragraphs"
              rows={8}
              defaultValue={content.misiones.paragraphs.join("\n")}
            />
            <label>Botón — ver todas las misiones</label>
            <input name="misiones-archive-cta" defaultValue={content.misiones.archiveCtaLabel} />
            <label htmlFor="misiones-intro-image-src">Foto intro (columna derecha en home)</label>
            <input
              id="misiones-intro-image-src"
              name="misiones-intro-image-src"
              defaultValue={content.misiones.introImage?.src || ""}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(event) => uploadImage(event.currentTarget, "misiones-intro-image-src")}
            />
            <label>Texto alternativo — foto intro</label>
            <input
              name="misiones-intro-image-alt"
              defaultValue={content.misiones.introImage?.alt || ""}
            />
            {content.misiones.introImage?.src ? (
              <img src={content.misiones.introImage.src} alt="" className="admin-mission-preview" />
            ) : null}
            <p className="admin-hint">
              Si no hay foto, se muestra una tarjeta con tipos de salida al territorio.
            </p>
            <label>Texto del botón (WhatsApp general)</label>
            <input name="misiones-cta" defaultValue={content.misiones.ctaLabel} />
            <hr />
            <h3 className="admin-subheading">Desarrollo del arte (home — no es misión)</h3>
            <label>Etiqueta del bloque</label>
            <input name="misiones-arte-tag" defaultValue={content.misiones.arte.tag} />
            <label>Título</label>
            <input name="misiones-arte-title" defaultValue={content.misiones.arte.title} />
            <label>Texto (un párrafo por línea)</label>
            <textarea
              name="misiones-arte-paragraphs"
              rows={6}
              defaultValue={content.misiones.arte.paragraphs.join("\n")}
            />
            <label htmlFor="misiones-arte-image-src">Foto práctica (URL)</label>
            <input
              id="misiones-arte-image-src"
              name="misiones-arte-image-src"
              defaultValue={content.misiones.arte.image?.src || ""}
            />
            <input
              type="file"
              accept="image/*"
              onChange={(event) => uploadImage(event.currentTarget, "misiones-arte-image-src")}
            />
            <label>Texto alternativo de la foto</label>
            <input name="misiones-arte-image-alt" defaultValue={content.misiones.arte.image?.alt || ""} />
            {content.misiones.arte.image?.src ? (
              <img src={content.misiones.arte.image.src} alt="" className="admin-mission-preview" />
            ) : null}
            <hr />
            <h3 className="admin-subheading">Misiones de territorio</h3>
            <AdminMisionesMissionsEditor
              initialMissions={content.misiones.missions}
              contentVersion={content.version}
              missionsDraftRef={missionsDraftRef}
              onChange={handleMisionesMissionsChange}
              onUpload={uploadImageFile}
            />
          </>
        )}

        {tab === "causa" && (
          <>
            <label>Etiqueta</label>
            <input name="causa-tag" defaultValue={content.causa.tag} />
            <label>Título</label>
            <input name="causa-title" defaultValue={content.causa.title} />
            <label>Pie de foto</label>
            <input name="causa-figcaption" defaultValue={content.causa.figcaption} />
            <label>Párrafos</label>
            <textarea name="causa-paragraphs" rows={6} defaultValue={content.causa.paragraphs.join("\n")} />
            <label>Pasos (JSON)</label>
            <textarea name="causa-steps-json" rows={10} defaultValue={JSON.stringify(content.causa.steps, null, 2)} />
          </>
        )}

        {tab === "especialidad" && (
          <>
            <label>Etiqueta</label>
            <input name="esp-tag" defaultValue={content.especialidad.tag} />
            <label>Título</label>
            <input name="esp-title" defaultValue={content.especialidad.title} />
            <label>Lead</label>
            <textarea name="esp-lead" rows={4} defaultValue={content.especialidad.lead} />
            <label>Texto botón WhatsApp</label>
            <input name="esp-cta" defaultValue={content.especialidad.ctaLabel} />
            <label>Síntomas (JSON)</label>
            <textarea
              name="esp-symptoms-json"
              rows={10}
              defaultValue={JSON.stringify(content.especialidad.symptoms, null, 2)}
            />
          </>
        )}

        {tab === "metodo" && (
          <>
            <label>Etiqueta</label>
            <input name="metodo-tag" defaultValue={content.metodo.tag} />
            <label>Título</label>
            <input name="metodo-title" defaultValue={content.metodo.title} />
            <label>Párrafos</label>
            <textarea name="metodo-paragraphs" rows={6} defaultValue={content.metodo.paragraphs.join("\n")} />
            <label>Pilares (JSON)</label>
            <textarea
              name="metodo-pillars-json"
              rows={8}
              defaultValue={JSON.stringify(content.metodo.pillars, null, 2)}
            />
          </>
        )}

        {tab === "nosotros" && (
          <>
            <label>Etiqueta</label>
            <input name="nos-tag" defaultValue={content.nosotros.tag} />
            <label>Título</label>
            <input name="nos-title" defaultValue={content.nosotros.title} />
            <label>Párrafos</label>
            <textarea name="nos-paragraphs" rows={6} defaultValue={content.nosotros.paragraphs.join("\n")} />
            <label>Insignias (JSON)</label>
            <textarea name="nos-badges-json" rows={8} defaultValue={JSON.stringify(content.nosotros.badges, null, 2)} />
          </>
        )}

        {tab === "redes" && (
          <>
            <label>Redes (JSON completo)</label>
            <textarea name="redes-json" rows={22} defaultValue={JSON.stringify(content.redes, null, 2)} />
          </>
        )}

        {tab === "reviews" && (
          <>
            <label>Reseñas (JSON)</label>
            <textarea name="reviews-json" rows={18} defaultValue={JSON.stringify(content.googleReviews, null, 2)} />
          </>
        )}

        {tab === "contact" && (
          <>
            <label>Etiqueta contacto</label>
            <input name="cp-tag" defaultValue={content.contactPage.tag} />
            <label>Título contacto</label>
            <input name="cp-title" defaultValue={content.contactPage.title} />
            <label>Lead contacto</label>
            <textarea name="cp-lead" rows={2} defaultValue={content.contactPage.lead} />
            <label>Título mapa</label>
            <input name="cp-map-title" defaultValue={content.contactPage.mapTitle} />
            <label>Dirección mapa</label>
            <input name="cp-map-address" defaultValue={content.contactPage.mapAddress} />
            <label>Botón mapa</label>
            <input name="cp-map-btn" defaultValue={content.contactPage.mapButtonLabel} />
            <label>WhatsApp (número sin +)</label>
            <input name="contact-whatsapp" defaultValue={content.contact.whatsapp} />
            <label>Correo contacto</label>
            <input name="contact-email" defaultValue={content.contact.contactEmail} />
            <label>Correo formulario</label>
            <input name="contact-form-email" defaultValue={content.contact.formEmail} />
            <label>Dirección</label>
            <textarea name="contact-address" rows={2} defaultValue={content.contact.address} />
            <label>URL Google Maps</label>
            <input name="contact-maps" defaultValue={content.contact.mapsUrl} />
            <label>URL formulario diagnóstico</label>
            <input name="contact-diagnostico" defaultValue={content.contact.diagnosticoFormUrl} />
          </>
        )}

        {tab === "images" && (
          <>
            <p className="admin-hint">
              Fotos fijas del sitio (hero, secciones y logo). Visión y Misiones se editan en sus pestañas. Para
              Inicio (hero), usa una foto de al menos 1400 px de ancho (ideal 1920+) para que se vea nítida en PC.
            </p>
            {(
              [
                ["img-hero", "Inicio (hero)", content.images.hero],
                ["img-causa", "La causa", content.images.causa],
                ["img-metodo", "Método", content.images.metodo],
                ["img-nosotros", "Nosotros", content.images.nosotros],
                ["img-logo", "Logo", content.images.logo],
              ] as const
            ).map(([id, label, value]) => (
              <div className="admin-image-row" key={id}>
                <label htmlFor={id}>{label}</label>
                <input id={id} name={id} defaultValue={value} />
                <input type="file" accept="image/*" onChange={(event) => uploadImage(event.currentTarget, id)} />
              </div>
            ))}
          </>
        )}

        <div className="admin-form-actions">
          <button type="submit" className="btn btn--primary" disabled={saving}>
            {saving ? "Guardando…" : "Guardar cambios"}
          </button>
          {status && <p className="admin-status">{status}</p>}
        </div>
      </form>
    </div>
  );
}
