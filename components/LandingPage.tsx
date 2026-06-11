"use client";

import {
  AudioLines,
  Brain,
  CircleAlert,
  Flame,
  Mail,
  MapPin,
  Orbit,
  Phone,
  ScanFace,
  UnfoldVertical,
  Zap,
} from "lucide-react";
import { useEffect } from "react";
import ConsultaForm from "@/components/ConsultaForm";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MissionsGrid, { type MissionCard } from "@/components/MissionsGrid";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { useInstagramStats } from "@/hooks/useInstagramStats";
import { useReveal } from "@/hooks/useReveal";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import type { ContactContent, HeroContent } from "@/lib/content";
import { buildWaUrl } from "@/lib/site";

function statClass(value: string) {
  if (value === "…") return "ig-stat-value is-loading";
  if (value === "Ver perfil") return "ig-stat-value is-fallback";
  return "ig-stat-value";
}

type Props = {
  hero: HeroContent;
  contact: ContactContent;
  missions: MissionCard[];
};

export default function LandingPage({ hero, contact, missions }: Props) {
  useReveal();
  useScrollSpy();
  const igStats = useInstagramStats();

  useEffect(() => {
    document.querySelectorAll(".symptom-card").forEach((card) => {
      card.addEventListener("click", function (this: HTMLElement) {
        document.querySelectorAll(".symptom-card").forEach((c) => c.classList.remove("is-tapped"));
        this.classList.add("is-tapped");
        setTimeout(() => this.classList.remove("is-tapped"), 400);
      });
    });
  }, []);

  return (
    <>
      <a className="skip-link" href="#inicio">
        Saltar al contenido
      </a>

      <Header />
      <WhatsAppFloat />

      <main>
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero-media">
            <img
              src="/images/hero-fondo.png"
              alt="Dr. Kevin Ernesto en su consultorio, quiropráctico especialista en cuidado cervical superior"
              className="hero-img"
              width={900}
              height={1200}
              fetchPriority="high"
            />
            <div className="hero-overlay" />
          </div>

          <div className="hero-content container">
            <p className="hero-eyebrow reveal">{hero.eyebrow}</p>
            <h1 className="hero-title reveal" id="hero-title">
              {hero.title}
            </h1>
            <p className="hero-subtitle reveal">{hero.subtitle}</p>
            <div className="hero-actions reveal">
              <a
                href={contact.diagnosticoFormUrl}
                className="btn btn--primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Agenda tu consulta de diagnóstico hoy
              </a>
              <a href="#causa" className="btn btn--ghost">
                Entender la causa
              </a>
            </div>
          </div>

          <a href="#causa" className="hero-scroll" aria-label="Ir a la siguiente sección">
            <span className="hero-scroll-icon" />
          </a>
        </section>

        <section className="section section--tint" id="causa" aria-labelledby="causa-title">
          <div className="container">
            <div className="causa-split">
              <div className="causa-gallery reveal" aria-label="Fotos del Dr. Kevin en la clínica">
                <figure className="causa-photo causa-photo--main">
                  <img
                    src="/images/dr-kevin-metodo.png"
                    alt="Dr. Kevin Ernesto junto a cartilla del sistema nervioso autónomo"
                    width={600}
                    height={800}
                    loading="lazy"
                  />
                  <figcaption>Sistema nervioso y columna cervical</figcaption>
                </figure>
                <figure className="causa-photo causa-photo--accent">
                  <img
                    src="/images/dr-kevin-nosotros.png"
                    alt="Dr. Kevin Ernesto en consultorio"
                    width={500}
                    height={600}
                    loading="lazy"
                  />
                </figure>
              </div>

              <div className="causa-body">
                <div className="section-header section-header--left reveal">
                  <span className="section-tag">Elevación de conciencia</span>
                  <h2 id="causa-title">Tu dolor no es un error de tu cuerpo, es una falla de comunicación.</h2>
                </div>

                <div className="causa-text reveal">
                  <p>
                    Tus vértebras cervicales — los huesos de tu cuello — tienen una función primordial: ser la
                    armadura que protege los nervios que viajan desde tu cerebro hacia todo tu cuerpo.
                  </p>
                  <p>
                    ¿Qué sucede cuando vives bajo altos niveles de estrés, sufres un accidente o un golpe
                    traumático? La tensión muscular aumenta y, si una o más vértebras cervicales se salen de su
                    posición natural, se origina el siguiente <strong>efecto dominó de la enfermedad</strong>:
                  </p>
                </div>

                <ol className="efecto-grid reveal" aria-label="Efecto dominó de la enfermedad">
                  {[
                    { icon: UnfoldVertical, num: "01", title: "Desalineación", text: "La vértebra pierde su eje." },
                    {
                      icon: Zap,
                      num: "02",
                      title: "Presión neurológica",
                      text: "El hueso «pellizca» o presiona el nervio.",
                    },
                    {
                      icon: Flame,
                      num: "03",
                      title: "Inflamación",
                      text: "El nervio se inflama y la señal del cerebro se interrumpe.",
                    },
                    {
                      icon: CircleAlert,
                      num: "04",
                      title: "Disfunción",
                      text: "Aparecen los malestares crónicos que te impiden vivir tranquilo.",
                    },
                  ].map(({ icon: Icon, num, title, text }) => (
                    <li className="efecto-card" key={num}>
                      <span className="icon-wrap" aria-hidden="true">
                        <Icon size={22} strokeWidth={2} />
                      </span>
                      <div>
                        <span className="efecto-num">{num}</span>
                        <h3>{title}</h3>
                        <p>{text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className="section section--white" id="especialidad" aria-labelledby="especialidad-title">
          <div className="container">
            <div className="section-intro-split reveal">
              <div className="section-header section-header--left">
                <span className="section-tag">Nuestra especialidad</span>
                <h2 id="especialidad-title">Especialistas en cuidados cervicales superiores</h2>
              </div>
              <p className="section-lead section-lead--wide">
                A diferencia de la quiropráctica tradicional que se enfoca en toda la espalda, en{" "}
                <strong>Quiropráctica de Colombia</strong> nos especializamos en la zona más crítica de tu
                sistema nervioso: las cervicales. Tratamos con éxito disfunciones causadas por la compresión
                neurológica, tales como:
              </p>
            </div>

            <ul className="symptoms-grid">
              {[
                { icon: Orbit, title: "Vértigo y mareos", text: "Sensación de inestabilidad constante." },
                {
                  icon: Brain,
                  title: "Migrañas y cefaleas",
                  text: "Dolores de cabeza crónicos e incapacitantes.",
                },
                { icon: AudioLines, title: "Tinnitus", text: "Zumbido interno y molesto en los oídos." },
                {
                  icon: ScanFace,
                  title: "Neuralgia del trigémino",
                  text: "Dolores punzantes, como «corrientazos», en un lado de la cara.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <li className="symptom-card reveal" key={title}>
                  <div className="symptom-icon" aria-hidden="true">
                    <Icon size={23} strokeWidth={2} />
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              ))}
            </ul>

            <div className="section-cta reveal">
              <a
                href={buildWaUrl("sintomas")}
                className="btn btn--primary btn-wa"
                target="_blank"
                rel="noopener noreferrer"
              >
                ¿Te identificas con estos síntomas? Habla con un especialista
              </a>
            </div>
          </div>
        </section>

        <section className="section section--tint" id="metodo" aria-labelledby="metodo-title">
          <div className="container metodo-grid">
            <div className="metodo-media reveal">
              <img
                src="/images/hero-fondo.png"
                alt="Dr. Kevin Ernesto en consultorio durante evaluación clínica"
                className="section-photo"
                width={600}
                height={800}
                loading="lazy"
              />
            </div>

            <div className="metodo-content reveal">
              <span className="section-tag">Nuestra solución</span>
              <h2 id="metodo-title">No es un «traqueo de huesos». Es precisión neurológica.</h2>
              <p>
                Nuestro método es un vehículo natural y no invasivo. No adivinamos ni hacemos movimientos
                bruscos. A través de un diagnóstico clínico avanzado, identificamos exactamente qué vértebra
                cervical está interfiriendo con tu sistema nervioso.
              </p>
              <p>
                Aplicamos un ajuste específico para restaurar la posición de la vértebra, eliminar la presión
                sobre el nervio y permitir que la inteligencia natural de tu cuerpo haga lo que mejor sabe
                hacer: funcionar al 100% de su capacidad y sanar.
              </p>

              <ul className="metodo-pillars">
                <li>
                  <strong>Diagnóstico avanzado</strong>
                  <span>Identificación exacta de la vértebra afectada</span>
                </li>
                <li>
                  <strong>Ajuste específico</strong>
                  <span>Sin movimientos bruscos ni adivinanzas</span>
                </li>
                <li>
                  <strong>Sanación natural</strong>
                  <span>El cuerpo recupera su capacidad al 100%</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="section section--white" id="nosotros" aria-labelledby="nosotros-title">
          <div className="container nosotros-grid">
            <div className="nosotros-content reveal">
              <span className="section-tag">Quiénes somos</span>
              <h2 id="nosotros-title">Elevando el estándar de la salud en Colombia</h2>
              <p>
                <strong>Quiropráctica de Colombia</strong>, liderada por el <strong>Dr. Kevin Ernesto</strong>,
                nació con una misión clara: sacar a las personas del ciclo infinito de la medicación temporal y
                ofrecerles una solución natural, real y sostenible.
              </p>
              <p>
                Somos una clínica especializada en el cuidado neurológico estructural. Entendemos que el cuerpo
                humano no tiene límites cuando su sistema de comunicación está libre de interferencias. Nuestro
                compromiso es brindarte un cuidado quiropráctico de primer nivel, basado en ciencia, biomecánica y
                resultados objetivos.
              </p>

              <div className="trust-badges">
                <div className="trust-badge">
                  <span className="trust-badge-value">100%</span>
                  <span className="trust-badge-label">Enfoque natural</span>
                </div>
                <div className="trust-badge">
                  <span className="trust-badge-value">C1–C3</span>
                  <span className="trust-badge-label">Zona cervical superior</span>
                </div>
                <div className="trust-badge">
                  <span className="trust-badge-value">Dr. Kevin</span>
                  <span className="trust-badge-label">Liderazgo clínico</span>
                </div>
              </div>
            </div>

            <div className="nosotros-media reveal">
              <img
                src="/images/dr-kevin-nosotros.png"
                alt="Dr. Kevin Ernesto en la clínica, frente a cartilla del sistema nervioso autónomo"
                className="section-photo section-photo--tall"
                width={600}
                height={800}
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section className="section section--white" id="misiones" aria-labelledby="misiones-title">
          <div className="container">
            <div className="section-header reveal">
              <span className="section-tag">Misiones</span>
              <h2 id="misiones-title">Próximas misiones y eventos</h2>
              <p className="section-lead">
                Capacitaciones, viajes y experiencias que puedes reservar en línea.
              </p>
            </div>
            <div className="reveal">
              <MissionsGrid missions={missions} />
            </div>
            {missions.length > 0 && (
              <p className="missions-more reveal">
                <a href="/misiones" className="btn btn--ghost">
                  Ver todas las misiones
                </a>
              </p>
            )}
          </div>
        </section>

        <section className="section section--redes" id="redes" aria-labelledby="redes-title">
          <div className="container">
            <div className="section-header reveal">
              <span className="section-tag section-tag--light">Comunidad</span>
              <h2 id="redes-title">Síguenos en Instagram</h2>
              <p className="section-lead">
                Contenido educativo, casos clínicos y actualidad de la clínica y del Dr. Kevin.
              </p>
            </div>

            <div className="ig-grid">
              <article className="ig-card reveal">
                <div className="ig-card-head">
                  <img src="/images/logo.png" alt="" className="ig-avatar" width={48} height={48} />
                  <div>
                    <h3>Quiropráctica de Colombia</h3>
                    <a
                      href="https://www.instagram.com/quiropracticadecolombia?igsh=MXhzYnY2MTd1ZTJjdA=="
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @quiropracticadecolombia
                    </a>
                  </div>
                </div>
                <ul className="ig-stats" aria-label="Métricas del perfil de la clínica">
                  <li>
                    <span className={statClass(igStats["clinic-followers"])}>{igStats["clinic-followers"]}</span>
                    <span className="ig-stat-label">Seguidores</span>
                  </li>
                  <li>
                    <span className={statClass(igStats["clinic-posts"])}>{igStats["clinic-posts"]}</span>
                    <span className="ig-stat-label">Publicaciones</span>
                  </li>
                  <li>
                    <span className={statClass(igStats["clinic-following"])}>{igStats["clinic-following"]}</span>
                    <span className="ig-stat-label">Siguiendo</span>
                  </li>
                </ul>
                <ul className="ig-logros">
                  <li>Educación sobre salud cervical y neurológica</li>
                  <li>Casos y enfoque de la clínica en Colombia</li>
                  <li>Comunidad oficial de pacientes y seguidores</li>
                </ul>
                <a
                  href="https://www.instagram.com/quiropracticadecolombia?igsh=MXhzYnY2MTd1ZTJjdA=="
                  className="btn btn--outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver perfil de la clínica
                </a>
              </article>

              <article className="ig-card reveal">
                <div className="ig-card-head">
                  <img
                    src="/images/dr-kevin-metodo.png"
                    alt=""
                    className="ig-avatar ig-avatar--photo"
                    width={48}
                    height={48}
                  />
                  <div>
                    <h3>Dr. Kevin Ernesto Castro</h3>
                    <a
                      href="https://www.instagram.com/kevinfixme?igsh=MW82dzRuODkxb2ZxMA=="
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      @kevinfixme
                    </a>
                  </div>
                </div>
                <ul className="ig-stats" aria-label="Métricas del perfil del doctor">
                  <li>
                    <span className={statClass(igStats["doctor-followers"])}>{igStats["doctor-followers"]}</span>
                    <span className="ig-stat-label">Seguidores</span>
                  </li>
                  <li>
                    <span className={statClass(igStats["doctor-posts"])}>{igStats["doctor-posts"]}</span>
                    <span className="ig-stat-label">Publicaciones</span>
                  </li>
                  <li>
                    <span className={statClass(igStats["doctor-following"])}>{igStats["doctor-following"]}</span>
                    <span className="ig-stat-label">Siguiendo</span>
                  </li>
                </ul>
                <ul className="ig-logros">
                  <li>Quiropráctico específico — precisión neurológica</li>
                  <li>Contenido profesional y cercano con pacientes</li>
                  <li>Referencias clínicas y trayectoria del Dr. Kevin</li>
                </ul>
                <a
                  href="https://www.instagram.com/kevinfixme?igsh=MW82dzRuODkxb2ZxMA=="
                  className="btn btn--outline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver perfil del doctor
                </a>
              </article>
            </div>
          </div>
        </section>

        <section className="section section--white section--contact" id="contacto" aria-labelledby="contacto-title">
          <div className="container">
            <div className="contact-layout reveal">
              <div className="contact-card">
                <div className="contact-intro">
                  <span className="section-tag section-tag--light">Contacto</span>
                  <h2 id="contacto-title">Da el primer paso hacia tu bienestar</h2>
                  <p className="contact-lead">Deja de tratar los síntomas y empieza a corregir la causa.</p>
                </div>

                <div className="contact-details">
                  <div className="contact-item">
                    <span className="contact-icon" aria-hidden="true">
                      <MapPin size={20} strokeWidth={2} />
                    </span>
                    <div>
                      <h3>Dirección</h3>
                      <p>
                        Centro Comercial Gabianelly, Cl. 84 #46 Local #7, 2.º piso,
                        <br />
                        Nte. Centro Histórico, Barranquilla, Atlántico
                      </p>
                      <a
                        href="https://maps.app.goo.gl/7UGYRBFWCHzx1WNH7?g_st=aw"
                        className="contact-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Abrir en Google Maps
                      </a>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon" aria-hidden="true">
                      <Phone size={20} strokeWidth={2} />
                    </span>
                    <div>
                      <h3>WhatsApp</h3>
                      <p>
                        <a
                          href={buildWaUrl("general")}
                          className="contact-link"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          +57 312 849 3003
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon" aria-hidden="true">
                      <Mail size={20} strokeWidth={2} />
                    </span>
                    <div>
                      <h3>Correo</h3>
                      <p>
                        <a href="mailto:quiropracticadecolombia@gmail.com" className="contact-link">
                          quiropracticadecolombia@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="contact-actions">
                  <a
                    href={buildWaUrl("cita")}
                    className="btn btn--primary btn--large"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Agendar mi primera cita por WhatsApp
                  </a>
                </div>
              </div>

              <ConsultaForm />
            </div>

            <div className="map-block reveal" id="ubicacion" aria-labelledby="mapa-title">
              <h3 id="mapa-title" className="map-title">
                Ubicación de la clínica
              </h3>
              <p className="map-address">
                Centro Comercial Gabianelly · Cl. 84 #46 Local #7, 2.º piso · Barranquilla, Atlántico
              </p>
              <div className="map-frame-wrap">
                <iframe
                  title="Mapa — Quiropráctica de Colombia, Barranquilla"
                  className="map-frame"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  src="https://maps.google.com/maps?q=Quiropractica+de+Colombia+SAS,+Centro+Comercial+Gabianelly,+Cl.+84+%2346+Local+%237,+Segundo+Piso,+Barranquilla,+Atlantico,+Colombia&hl=es&z=17&output=embed"
                />
              </div>
              <a
                href="https://maps.app.goo.gl/7UGYRBFWCHzx1WNH7?g_st=aw"
                className="btn btn--outline map-link-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir ubicación en Google Maps
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
