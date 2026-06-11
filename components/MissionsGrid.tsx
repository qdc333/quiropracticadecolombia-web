import Link from "next/link";
import { formatPrice } from "@/lib/content";

export type MissionCard = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  priceCents: number;
  currency: string;
  imageUrl: string | null;
  badge: string | null;
  dateLabel: string | null;
};

export default function MissionsGrid({ missions }: { missions: MissionCard[] }) {
  if (missions.length === 0) {
    return (
      <p className="missions-empty">
        Próximamente publicaremos nuevas misiones y eventos. Vuelve pronto.
      </p>
    );
  }

  return (
    <div className="missions-grid">
      {missions.map((m) => (
        <Link key={m.id} href={`/misiones/${m.slug}`} className="mission-card">
          <div className="mission-card__media">
            {m.badge && <span className="mission-card__badge">{m.badge}</span>}
            {m.imageUrl ? (
              <img src={m.imageUrl} alt={m.title} />
            ) : (
              <div className="mission-card__placeholder" />
            )}
          </div>
          <div className="mission-card__body">
            {m.dateLabel && <p className="mission-card__date">{m.dateLabel}</p>}
            <h3>{m.title}</h3>
            {m.summary && <p>{m.summary}</p>}
            <p className="mission-card__price">{formatPrice(m.priceCents, m.currency)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
