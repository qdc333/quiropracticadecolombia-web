import Link from "next/link";
import { notFound } from "next/navigation";
import MissionPurchase from "@/components/MissionPurchase";
import { getMissionBySlug } from "@/lib/api";

export default async function MissionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const mission = await getMissionBySlug(slug);
  if (!mission) notFound();

  return (
    <main className="mission-detail">
      <div className="container">
        <nav className="missions-breadcrumb">
          <Link href="/">Inicio</Link>
          <span> / </span>
          <Link href="/misiones">Misiones</Link>
          <span> / </span>
          <span>{mission.title}</span>
        </nav>

        <div className="mission-detail__grid">
          <div className="mission-detail__media">
            {mission.imageUrl ? (
              <img src={mission.imageUrl} alt={mission.title} />
            ) : (
              <div className="mission-card__placeholder" />
            )}
          </div>

          <div className="mission-detail__info">
            {mission.badge && <span className="mission-card__badge">{mission.badge}</span>}
            {mission.dateLabel && <p className="mission-card__date">{mission.dateLabel}</p>}
            <h1>{mission.title}</h1>
            {mission.summary && <p className="mission-detail__summary">{mission.summary}</p>}
            <MissionPurchase mission={mission} />
          </div>
        </div>

        {mission.description && (
          <section className="mission-detail__desc">
            <h2>Detalles de la misión</h2>
            <div className="mission-detail__text">
              {mission.description.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
