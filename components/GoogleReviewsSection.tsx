"use client";

import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { GoogleReviewsContent } from "@/lib/content";
import { REVIEWS_UI_EN, REVIEWS_UI_ES } from "@/lib/i18n/content-en";
import type { Locale } from "@/lib/i18n/locale";
import { highlightReviewText } from "@/lib/reviewKeywords";

type Props = {
  content: GoogleReviewsContent;
  locale?: Locale;
};

const AUTOPLAY_MS = 5000;

function ReviewStars({ rating, starsAria }: { rating: number; starsAria: (n: number) => string }) {
  return (
    <div className="review-card-stars" aria-label={starsAria(rating)}>
      {Array.from({ length: 5 }, (_, starIndex) => (
        <Star
          key={starIndex}
          size={16}
          strokeWidth={0}
          className={starIndex < rating ? "review-star is-filled" : "review-star"}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function GoogleReviewsSection({ content, locale = "es" }: Props) {
  const { mapsUrl, items } = content;
  const ui = locale === "en" ? REVIEWS_UI_EN : REVIEWS_UI_ES;
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [hasEntered, setHasEntered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const total = items.length;
  const current = items[index];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (total <= 1 || isPaused || !hasEntered) return;

    const timer = window.setTimeout(() => {
      setDirection("next");
      setIndex((currentIndex) => (currentIndex + 1) % total);
    }, AUTOPLAY_MS);

    return () => window.clearTimeout(timer);
  }, [index, isPaused, hasEntered, total]);

  function pauseAutoplay() {
    setIsPaused(true);
  }

  function resumeAutoplay() {
    setIsPaused(false);
  }

  function goPrev() {
    pauseAutoplay();
    setDirection("prev");
    setIndex((currentIndex) => (currentIndex - 1 + total) % total);
  }

  function goNext() {
    pauseAutoplay();
    setDirection("next");
    setIndex((currentIndex) => (currentIndex + 1) % total);
  }

  function goTo(nextIndex: number) {
    pauseAutoplay();
    setDirection(nextIndex > index ? "next" : "prev");
    setIndex(nextIndex);
  }

  return (
    <section
      ref={sectionRef}
      className={`section section--white reviews-section${hasEntered ? " reviews-section--entered" : ""}`}
      id="resenas"
      aria-labelledby="resenas-title"
    >
      <div className="container">
        <div className="reviews-header reviews-animate reviews-animate--1">
          <span className="section-tag">{ui.tag}</span>
          <h2 id="resenas-title">{ui.title}</h2>
          <p className="reviews-lead">{ui.lead}</p>
        </div>

        {total > 0 && (
          <div
            ref={stageRef}
            className="reviews-stage reviews-animate reviews-animate--2"
            onPointerEnter={pauseAutoplay}
            onPointerLeave={resumeAutoplay}
            onFocusCapture={pauseAutoplay}
            onBlurCapture={(event) => {
              if (!stageRef.current?.contains(event.relatedTarget as Node | null)) {
                resumeAutoplay();
              }
            }}
          >
            <div className="reviews-stack" aria-hidden="true">
              <div className="reviews-stack-card reviews-stack-card--back-2" />
              <div className="reviews-stack-card reviews-stack-card--back-1" />
            </div>

            <article
              key={index}
              className={`review-card review-card--${direction}`}
              aria-live="polite"
            >
              <ReviewStars rating={current.rating} starsAria={ui.starsAria} />
              <h3 className="review-card-author">{current.author}</h3>
              <p className="review-card-text">{highlightReviewText(current.text)}</p>

              {total > 1 && (
                <footer className="review-card-footer">
                  <button type="button" className="review-step" onClick={goPrev}>
                    {ui.prev}
                  </button>
                  <div className="review-progress" role="tablist" aria-label={ui.chooseReview}>
                    {items.map((_, dotIndex) => (
                      <button
                        key={dotIndex}
                        type="button"
                        role="tab"
                        className={`review-progress-dot${dotIndex === index ? " is-active" : ""}`}
                        aria-label={`Ver reseña de ${items[dotIndex].author}`}
                        aria-selected={dotIndex === index}
                        onClick={() => goTo(dotIndex)}
                      />
                    ))}
                  </div>
                  <button type="button" className="review-step" onClick={goNext}>
                    {ui.next}
                  </button>
                </footer>
              )}
            </article>
          </div>
        )}

        <div className="reviews-cta reviews-animate reviews-animate--3">
          <a
            href={mapsUrl}
            className="btn btn--outline reviews-maps-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            {ui.seeOnMaps}
          </a>
        </div>
      </div>
    </section>
  );
}
