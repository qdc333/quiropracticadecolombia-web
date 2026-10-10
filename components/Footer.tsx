"use client";

import { useLocale } from "@/components/LocaleProvider";
import type { RedesContent } from "@/lib/cms/types";
import type { ContactContent } from "@/lib/content";
import { getFooterColumns, getFooterUi } from "@/lib/i18n/footer";
import { buildWaUrl } from "@/lib/site";

type Props = {
  contact: ContactContent;
  logoSrc: string;
  redes: RedesContent;
};

export default function Footer({ contact, logoSrc, redes }: Props) {
  const { locale } = useLocale();
  const ui = getFooterUi(locale);
  const columns = getFooterColumns(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <a href="#inicio" className="footer-logo" aria-label="Quiropráctica de Colombia — Inicio">
            <img src={logoSrc} alt="" width={48} height={48} className="footer-logo-img" />
            <span className="footer-logo-text">
              Quiropráctica
              <small>de Colombia</small>
            </span>
          </a>
          <p className="footer-tagline">{ui.tagline}</p>
        </div>

        {columns.map((column) => (
          <div className="footer-col" key={column.title}>
            <h3 className="footer-col-title">{column.title}</h3>
            <ul className="footer-links">
              {column.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="footer-col footer-col--contact">
          <h3 className="footer-col-title">{ui.columns.contact}</h3>
          <ul className="footer-links footer-links--contact">
            <li>
              <a href="#contacto">{ui.contactBook}</a>
            </li>
            <li>
              <a href={buildWaUrl("general")} target="_blank" rel="noopener noreferrer">
                {ui.contactWhatsApp}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.contactEmail}`}
                className="footer-link-email"
                title={contact.contactEmail}
              >
                {ui.contactEmail}
              </a>
            </li>
            <li>
              <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer">
                {ui.contactLocation}
              </a>
            </li>
          </ul>
          <p className="footer-address">{contact.address}</p>
        </div>

        <div className="footer-col">
          <h3 className="footer-col-title">{ui.columns.social}</h3>
          <ul className="footer-links">
            <li>
              <a href={redes.clinic.url} target="_blank" rel="noopener noreferrer">
                {redes.clinic.handle}
              </a>
            </li>
            <li>
              <a href={redes.doctor.url} target="_blank" rel="noopener noreferrer">
                {redes.doctor.handle}
              </a>
            </li>
            <li>
              <a href="#redes">{locale === "en" ? "Social section" : "Sección Redes"}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copy">
            © {year}{" "}
            <a href="#inicio" className="footer-copy-brand">
              Quiropráctica de Colombia
            </a>
            {" · "}
            Dr. Kevin Ernesto. {ui.rights}
          </p>
          <a href="#inicio" className="footer-top">
            {ui.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}
