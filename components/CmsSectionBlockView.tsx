import type { CmsSectionBlock } from "@/lib/cms/types";

type Props = {
  id: string;
  section: CmsSectionBlock;
  variant?: "tint" | "white";
  layout?: "center" | "split";
};

export default function CmsSectionBlockView({
  id,
  section,
  variant = "tint",
  layout = "center",
}: Props) {
  const sectionClass = variant === "white" ? "section section--white" : "section section--tint";

  if (layout === "split" && section.image?.src) {
    return (
      <section className={sectionClass} id={id} aria-labelledby={`${id}-title`}>
        <div className="container cms-split">
          <div className="cms-split-media reveal">
            <img
              src={section.image.src}
              alt={section.image.alt}
              className="section-photo section-photo--tall"
              width={600}
              height={800}
              loading="lazy"
            />
          </div>
          <div className="cms-split-body reveal">
            <span className="section-tag">{section.tag}</span>
            <h2 id={`${id}-title`}>{section.title}</h2>
            {section.lead && <p className="section-lead">{section.lead}</p>}
            <div className="section-prose">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={sectionClass} id={id} aria-labelledby={`${id}-title`}>
      <div className="container">
        <div className="section-intro-split reveal">
          <div className="section-header section-header--left">
            <span className="section-tag">{section.tag}</span>
            <h2 id={`${id}-title`}>{section.title}</h2>
          </div>
          {section.lead && <p className="section-lead section-lead--wide">{section.lead}</p>}
        </div>
        <div className="section-prose cms-section-body cms-section-body--left reveal">
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
