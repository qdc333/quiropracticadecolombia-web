import Link from "next/link";

export const metadata = {
  title: "Solicitud enviada | Quiropráctica de Colombia",
};

export default function GraciasPage() {
  return (
    <div className="gracias-page">
      <div className="gracias-card">
        <h1>¡Solicitud enviada!</h1>
        <p>Recibimos tu información. El doctor revisará tu caso y te contactará pronto.</p>
        <p>Si es urgente, también puedes escribir por WhatsApp.</p>
        <Link href="/#contacto">Volver al sitio</Link>
      </div>
    </div>
  );
}
