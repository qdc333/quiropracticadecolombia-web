import { Manrope, Newsreader } from "next/font/google";
/* Estilos del sitio y del admin van en cada layout hijo — evita duplicar CSS y caché rota en dev */

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO">
      <body className={`${manrope.variable} ${newsreader.variable}`}>{children}</body>
    </html>
  );
}
