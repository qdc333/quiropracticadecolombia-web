import type { Metadata, Viewport } from "next";
import { Manrope, Newsreader } from "next/font/google";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body-next",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-display-next",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://REEMPLAZA-TU-URL";

export const metadata: Metadata = {
  title: "Quiropráctica de Colombia | Dr. Kevin Ernesto",
  description:
    "Quiropráctica de Colombia — Especialistas en cuidados cervicales superiores en Barranquilla. Tratamiento natural para vértigo, migrañas, tinnitus y más.",
  metadataBase: new URL(siteUrl),
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
    <div className={`site-root ${manrope.variable} ${newsreader.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </div>
  );
}
