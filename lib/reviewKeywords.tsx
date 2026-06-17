import { Fragment, type ReactNode } from "react";

const REVIEW_KEYWORDS = [
  "calidad de vida",
  "sin malestar",
  "sin miedo",
  "sin dolor",
  "mil por ciento",
  "totalmente alineada",
  "completamente recuperada",
  "recuperación",
  "recuperada",
  "recuperado",
  "recuperé",
  "recuperar",
  "recuperó",
  "autoestima",
  "alineación",
  "alineada",
  "alineado",
  "alineados",
  "disminuyeron",
  "disminuido",
  "disminuidos",
  "recomendados",
  "recomiendo",
  "recomendado",
  "equilibrada",
  "equilibrio",
  "mejoría",
  "mejorado",
  "mejorada",
  "mejoraron",
  "mejoró",
  "mejora",
  "sanación",
  "sanar",
  "sanada",
  "sanado",
  "sanó",
  "bienestar",
  "increíble",
  "diferencia",
  "consciente",
  "conciencia",
  "efectivo",
  "efectiva",
  "armonía",
  "descanso",
  "energía",
  "sonrisa",
  "alivio",
  "aliviado",
  "salud",
  "sana",
  "sano",
  "plena",
  "pleno",
  "paz",
  "mejor",
  "10/10",
];

const keywordPattern = new RegExp(
  `(${REVIEW_KEYWORDS.map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
  "gi"
);

export function highlightReviewText(text: string): ReactNode {
  const parts = text.split(keywordPattern).filter(Boolean);

  return parts.map((part, partIndex) => {
    const isKeyword = REVIEW_KEYWORDS.some((keyword) => keyword.toLowerCase() === part.toLowerCase());

    if (isKeyword) {
      return (
        <mark key={`${part}-${partIndex}`} className="review-keyword">
          {part}
        </mark>
      );
    }

    return <Fragment key={`${part}-${partIndex}`}>{part}</Fragment>;
  });
}
