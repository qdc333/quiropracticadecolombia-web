"use client";

import CmsIcon from "@/lib/cms/CmsIcon";
import { Mail, MapPin, Phone } from "lucide-react";
import { useLocale } from "@/components/LocaleProvider";
import {
  CONTACT_CARD_UI_EN,
  CONTACT_CARD_UI_ES,
  HERO_UI_EN,
  HERO_UI_ES,
  INSTAGRAM_UI_EN,
  INSTAGRAM_UI_ES,
  LANDING_UI_EN,
  LANDING_UI_ES,
} from "@/lib/i18n/content-en";
import { localizeSiteContent } from "@/lib/i18n/localize-content";
import { useEffect, useMemo, useRef } from "react";
import { useMatchMediaHeight } from "@/hooks/useMatchMediaHeight";
import MisionesSection from "@/components/MisionesSection";
import VisionMisionSection from "@/components/VisionMisionSection";
import Footer from "@/components/Footer";
import GoogleReviewsSection from "@/components/GoogleReviewsSection";
import Header from "@/components/Header";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { useInstagramStats } from "@/hooks/useInstagramStats";
import { useReveal } from "@/hooks/useReveal";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import ConsultaForm from "@/components/ConsultaForm";
import { useLiveSiteContent } from "@/hooks/useLiveSiteContent";
import type { SiteContent } from "@/lib/cms/types";
import { buildWaUrl } from "@/lib/site";

function statClass(value: string) {
  if (value === "…") return "ig-stat-value is-loading";
  if (value === "Ver perfil") return "ig-stat-value is-fallback";
  return "ig-stat-value";
}

type Props = {
  initialContent: SiteContent;
};

export default function LandingPage({ initialContent }: Props) {
  useScrollSpy();
  const igStats = useInstagramStats();
  const site = useLiveSiteContent(initialContent);
  const { locale } = useLocale();
  const localized = useMemo(() => localizeSiteContent(site, locale), [site, locale]);
  const heroUi = locale === "en" ? HERO_UI_EN : HERO_UI_ES;
  const landingUi = locale === "en" ? LANDING_UI_EN : LANDING_UI_ES;
  const contactCardUi = locale === "en" ? CONTACT_CARD_UI_EN : CONTACT_CARD_UI_ES;
  const instagramUi = locale === "en" ? INSTAGRAM_UI_EN : INSTAGRAM_UI_ES;
  const mapEmbedLang = locale === "en" ? "en" : "es";
  useReveal(`${localized.updatedAt}-${locale}`);

  const causaBodyRef = useRef<HTMLDivElement>(null);
  const causaMediaRef = useRef<HTMLDivElement>(null);
  const metodoContentRef = useRef<HTMLDivElement>(null);
  const metodoMediaRef = useRef<HTMLDivElement>(null);
  const nosotrosContentRef = useRef<HTMLDivElement>(null);
  const nosotrosMediaRef = useRef<HTMLDivElement>(null);
  const mediaHeightKey = `${localized.updatedAt}-${locale}`;
  useMatchMediaHeight(causaBodyRef, causaMediaRef, [mediaHeightKey]);
  useMatchMediaHeight(metodoContentRef, metodoMediaRef, [mediaHeightKey]);
  useMatchMediaHeight(nosotrosContentRef, nosotrosMediaRef, [mediaHeightKey], { heightScale: 1.14 });
  const {
    hero,
    contact,
    contactPage,
    visionMision,
    misiones,
    googleReviews,
    images,
    causa,
    especialidad,
    metodo,
    nosotros,
    redes,
  } = localized;

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
        {landingUi.skipToContent}
      </a>

      <Header />
      <WhatsAppFloat />

      <main>
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero-media">
            <img
              src={images.hero}
              alt={landingUi.heroImgAlt}
              className="hero-img"
              width={682}
              height={1024}
              fetchPriority="high"
              decoding="async"
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
                {heroUi.ctaPrimary}
              </a>
              <a href="#causa" className="btn btn--ghost">
                {heroUi.ctaSecondary}
              </a>
            </div>
          </div>

          <a href="#vision" className="hero-scroll" aria-label={heroUi.scrollNext}>
            <span className="hero-scroll-icon" />
          </a>
        </section>

        <VisionMisionSection content={visionMision} />

        <section className="section section--tint" id="causa" aria-labelledby="causa-title">
          <div className="container">
            <div className="causa-split">
              <div
                ref={causaMediaRef}
                className="causa-gallery doctor-side-media reveal"
                aria-label={landingUi.causaGalleryAria}
              >
                <figure className="causa-photo causa-photo--main">
                  <img
                    src={images.causa}
                    alt={landingUi.causaImgAlt}
                    width={600}
                    height={800}
                    loading="lazy"
                  />
                  <figcaption>{causa.figcaption}</figcaption>
                </figure>
              </div>

              <div className="causa-body" ref={causaBodyRef}>
                <div className="section-header section-header--left reveal">
                  <span className="section-tag">{causa.tag}</span>
                  <h2 id="causa-title">{causa.title}</h2>
                </div>

                <div className="causa-text reveal">
                  {causa.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>

                <ol className="efecto-grid reveal" aria-label={landingUi.causaStepsAria}>
                  {causa.steps.map((step) => (
                    <li className="efecto-card" key={step.num}>
                      <span className="icon-wrap">
                        <CmsIcon name={step.icon} />
                      </span>
                      <div>
                        <span className="efecto-num">{step.num}</span>
                        <h3>{step.title}</h3>
                        <p>{step.text}</p>
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
                <span className="section-tag">{especialidad.tag}</span>
                <h2 id="especialidad-title">{especialidad.title}</h2>
              </div>
              <p className="section-lead section-lead--wide">{especialidad.lead}</p>
            </div>

            <ul className="symptoms-grid">
              {especialidad.symptoms.map((symptom) => (
                <li className="symptom-card reveal" key={symptom.title}>
                  <div className="symptom-icon">
                    <CmsIcon name={symptom.icon} size={23} />
                  </div>
                  <h3>{symptom.title}</h3>
                  <p>{symptom.text}</p>
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
                {especialidad.ctaLabel}
              </a>
            </div>
          </div>
        </section>

        <section className="section section--tint" id="metodo" aria-labelledby="metodo-title">
          <div className="container metodo-grid">
            <div ref={metodoMediaRef} className="metodo-media doctor-side-media reveal">
              <img
                src={images.metodo}
                alt={landingUi.metodoImgAlt}
                className="section-photo section-photo--tall"
                width={600}
                height={800}
                loading="lazy"
              />
            </div>

            <div ref={metodoContentRef} className="metodo-content reveal">
              <span className="section-tag">{metodo.tag}</span>
              <h2 id="metodo-title">{metodo.title}</h2>
              <div className="section-prose">
                {metodo.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>

              <ul className="metodo-pillars">
                {metodo.pillars.map((pillar) => (
                  <li key={pillar.title}>
                    <span className="icon-wrap">
                      <CmsIcon name={pillar.icon} />
                    </span>
                    <div>
                      <strong>{pillar.title}</strong>
                      <span>{pillar.text}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <MisionesSection content={misiones} locale={locale} />

        <section className="section section--tint" id="nosotros" aria-labelledby="nosotros-title">
          <div className="container nosotros-grid">
            <div ref={nosotrosContentRef} className="nosotros-content reveal">
              <span className="section-tag">{nosotros.tag}</span>
              <h2 id="nosotros-title">{nosotros.title}</h2>
              <div className="section-prose">
                {nosotros.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>

              <div className="trust-badges">
                {nosotros.badges.map((badge) => (
                  <div className="trust-badge" key={badge.label}>
                    <span className="trust-badge-icon">
                      <CmsIcon name={badge.icon} size={20} />
                    </span>
                    <span className="trust-badge-value">{badge.value}</span>
                    <span className="trust-badge-label">{badge.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div ref={nosotrosMediaRef} className="nosotros-media doctor-side-media doctor-side-media--nosotros reveal">
              <img
                src={images.nosotros}
                alt={landingUi.nosotrosImgAlt}
                className="section-photo section-photo--full"
                width={600}
                height={800}
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <GoogleReviewsSection content={googleReviews} locale={locale} />

        <section className="section section--redes" id="redes" aria-labelledby="redes-title">
          <div className="container">
            <div className="section-header reveal">
              <span className="section-tag section-tag--light">{redes.tag}</span>
              <h2 id="redes-title">{redes.title}</h2>
              <p className="section-lead">{redes.lead}</p>
            </div>

            <div className="ig-grid">
              <article className="ig-card reveal">
                <div className="ig-card-head">
                  <img src={redes.clinic.avatar} alt="" className="ig-avatar" width={48} height={48} />
                  <div>
                    <h3>{redes.clinic.title}</h3>
                    <a href={redes.clinic.url} target="_blank" rel="noopener noreferrer">
                      {redes.clinic.handle}
                    </a>
                  </div>
                </div>
                <ul className="ig-stats" aria-label="Métricas del perfil de la clínica">
                  <li>
                    <span className={statClass(igStats["clinic-followers"])}>{igStats["clinic-followers"]}</span>
                    <span className="ig-stat-label">{instagramUi.followers}</span>
                  </li>
                  <li>
                    <span className={statClass(igStats["clinic-posts"])}>{igStats["clinic-posts"]}</span>
                    <span className="ig-stat-label">{instagramUi.posts}</span>
                  </li>
                  <li>
                    <span className={statClass(igStats["clinic-following"])}>{igStats["clinic-following"]}</span>
                    <span className="ig-stat-label">{instagramUi.following}</span>
                  </li>
                </ul>
                <ul className="ig-logros">
                  {redes.clinic.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a href={redes.clinic.url} className="btn btn--outline" target="_blank" rel="noopener noreferrer">
                  {redes.clinic.buttonLabel}
                </a>
              </article>

              <article className="ig-card reveal">
                <div className="ig-card-head">
                  <img
                    src={redes.doctor.avatar}
                    alt=""
                    className="ig-avatar ig-avatar--photo"
                    width={48}
                    height={48}
                  />
                  <div>
                    <h3>{redes.doctor.title}</h3>
                    <a href={redes.doctor.url} target="_blank" rel="noopener noreferrer">
                      {redes.doctor.handle}
                    </a>
                  </div>
                </div>
                <ul className="ig-stats" aria-label="Métricas del perfil del doctor">
                  <li>
                    <span className={statClass(igStats["doctor-followers"])}>{igStats["doctor-followers"]}</span>
                    <span className="ig-stat-label">{instagramUi.followers}</span>
                  </li>
                  <li>
                    <span className={statClass(igStats["doctor-posts"])}>{igStats["doctor-posts"]}</span>
                    <span className="ig-stat-label">{instagramUi.posts}</span>
                  </li>
                  <li>
                    <span className={statClass(igStats["doctor-following"])}>{igStats["doctor-following"]}</span>
                    <span className="ig-stat-label">{instagramUi.following}</span>
                  </li>
                </ul>
                <ul className="ig-logros">
                  {redes.doctor.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a href={redes.doctor.url} className="btn btn--outline" target="_blank" rel="noopener noreferrer">
                  {redes.doctor.buttonLabel}
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
                  <span className="section-tag section-tag--light">{contactPage.tag}</span>
                  <h2 id="contacto-title">{contactPage.title}</h2>
                  <p className="contact-lead">{contactPage.lead}</p>
                </div>

                <div className="contact-details">
                  <div className="contact-item">
                    <span className="contact-icon" aria-hidden="true">
                      <MapPin size={20} strokeWidth={2} />
                    </span>
                    <div>
                      <h3>{contactCardUi.addressTitle}</h3>
                      <p>
                        {contactCardUi.addressLines[0]}
                        <br />
                        {contactCardUi.addressLines[1]}
                      </p>
                      <a
                        href={contact.mapsUrl}
                        className="contact-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {contactCardUi.openMaps}
                      </a>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon" aria-hidden="true">
                      <Phone size={20} strokeWidth={2} />
                    </span>
                    <div>
                      <h3>{contactCardUi.whatsappTitle}</h3>
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
                      <h3>{contactCardUi.emailTitle}</h3>
                      <p>
                        <a href={`mailto:${contact.contactEmail}`} className="contact-link">
                          {contact.contactEmail}
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
                    {contactCardUi.bookWhatsApp}
                  </a>
                </div>
              </div>

              <ConsultaForm locale={locale} />
            </div>

            <div className="map-block reveal" id="ubicacion" aria-labelledby="mapa-title">
              <h3 id="mapa-title" className="map-title">
                {contactPage.mapTitle}
              </h3>
              <p className="map-address">{contactPage.mapAddress}</p>
              <div className="map-frame-wrap">
                <iframe
                  title={contactCardUi.mapIframeTitle}
                  className="map-frame"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  src={`https://maps.google.com/maps?q=Quiropractica+de+Colombia+SAS,+Centro+Comercial+Gabianelly,+Cl.+84+%2346+Local+%237,+Segundo+Piso,+Barranquilla,+Atlantico,+Colombia&hl=${mapEmbedLang}&z=17&output=embed`}
                />
              </div>
              <a
                href={contact.mapsUrl}
                className="btn btn--outline map-link-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                {contactPage.mapButtonLabel}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer contact={contact} logoSrc={images.logo} redes={redes} />
    </>
  );
}
