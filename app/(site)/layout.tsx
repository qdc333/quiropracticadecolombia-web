import { LocaleProvider } from "@/components/LocaleProvider";
import type { Metadata, Viewport } from "next";
import "../styles/shared.css";
import "../globals.css";

function resolveSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return new URL("https://www.quiropracticadecolombia.com");
  try {
    return new URL(raw.includes("://") ? raw : `https://${raw}`);
  } catch {
    return new URL("https://www.quiropracticadecolombia.com");
  }
}

const siteUrl = resolveSiteUrl().origin;

export const metadata: Metadata = {
  title: "Quiropráctica de Colombia | Dr. Kevin Ernesto",
  description:
    "Quiropráctica de Colombia — Especialistas en cuidados cervicales superiores en Barranquilla. Tratamiento natural para vértigo, migrañas, tinnitus y más.",
  metadataBase: resolveSiteUrl(),
  robots: "index, follow",
  openGraph: {
    title: "Quiropráctica de Colombia | Dr. Kevin Ernesto",
    description:
      "Especialistas en cuidados cervicales superiores. Agenda tu consulta de diagnóstico en Barranquilla.",
    type: "website",
    locale: "es_CO",
    images: ["/images/hero-fondo.png"],
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#9e4a4a",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Quiropráctica de Colombia",
  description:
    "Especialistas en cuidados cervicales superiores. Tratamiento natural para vértigo, migrañas, tinnitus y neuralgia del trigémino en Barranquilla.",
  url: siteUrl,
  image: `${siteUrl}/images/hero-fondo.png`,
  telephone: "+57-312-849-3003",
  email: "quiropracticadecolombia@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Centro Comercial Gabianelly, Cl. 84 #46 Local #7, 2.º piso",
    addressLocality: "Barranquilla",
    addressRegion: "Atlántico",
    addressCountry: "CO",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 11.0084,
    longitude: -74.8217,
  },
  sameAs: [
    "https://www.instagram.com/quiropracticadecolombia",
    "https://www.instagram.com/kevinfixme",
  ],
  medicalSpecialty: "Chiropractic",
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-root">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LocaleProvider>{children}</LocaleProvider>
    </div>
  );
}
