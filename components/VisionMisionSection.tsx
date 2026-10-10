import type { VisionMisionBlock, VisionMisionContent } from "@/lib/cms/types";

type Props = {
  content: VisionMisionContent;
};

function CompactSection({
  id,
  sectionClass,
  block,
}: {
  id: string;
  sectionClass: string;
  block: VisionMisionBlock;
}) {
  const hasImage = Boolean(block.image?.src);
  const maxParagraphs = id === "mision" ? 3 : 2;
  const paragraphs = block.paragraphs.slice(0, maxParagraphs);
  const mediaClass =
    id === "vision" ? " vision-zone-media--map" : id === "mision" ? " vision-zone-media--illustration" : "";

  return (
    <section className={`section ${sectionClass}`} id={id} aria-labelledby={`${id}-heading`}>
      <div className="container">
        <div className={`vision-zone reveal${hasImage ? " vision-zone--split" : ""}`}>
          <div className="vision-zone-heading">
            <div className="section-header section-header--left">
              <span className="section-tag">{block.title}</span>
              <h2 id={`${id}-heading`}>{block.heading || block.title}</h2>
            </div>
          </div>

          {hasImage && block.image && (
            <figure className={`vision-zone-media${mediaClass}`}>
              <img
                src={block.image.src}
                alt={block.image.alt}
                width={id === "vision" ? 390 : 520}
                height={id === "vision" ? 520 : 390}
                loading="lazy"
              />
            </figure>
          )}

          <div className="vision-zone-copy">
            <p className="vision-zone-statement">{block.statement}</p>
            {paragraphs.length > 0 && (
              <div className="section-prose vision-zone-prose">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function VisionMisionSection({ content }: Props) {
  const { vision, mision } = content;

  return (
    <>
      <CompactSection id="vision" sectionClass="section--tint" block={vision} />
      <CompactSection id="mision" sectionClass="section--white" block={mision} />
    </>
  );
}
