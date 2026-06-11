import Link from "next/link";
import MissionsGrid from "@/components/MissionsGrid";
import { getMissions } from "@/lib/api";

export const metadata = {
  title: "Misiones y eventos | Quiropráctica de Colombia",
};

export default async function MisionesPage() {
  const missions = await getMissions();

  return (
    <main className="missions-page">
      <div className="container">
        <Link href="/" className="missions-breadcrumb">
          Inicio
        </Link>
        <header className="missions-page__header">
          <h1>Próximas misiones y eventos</h1>
          <p>Capacitaciones, viajes misioneros y experiencias que puedes reservar en línea.</p>
        </header>
        <MissionsGrid missions={missions} />
      </div>
    </main>
  );
}
