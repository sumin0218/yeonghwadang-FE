import { useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Header } from "@/components/Header";
import { ReservationStepHeader } from "@/components/ReservationStepHeader";
import { reservationStories, type ReservationStory } from "@/data/reservation";
import "./ReservationSelectPage.css";

const CARD_WIDTH = 180;
const CARD_GAP = 12;

type ReservationSelectPageProps = {
  selectedStory: ReservationStory;
  onSelectStory: (story: ReservationStory) => void;
};

export function ReservationSelectPage({
  selectedStory,
  onSelectStory,
}: ReservationSelectPageProps) {
  const initialIndex = Math.max(
    0,
    reservationStories.findIndex((story) => story.slug === selectedStory.slug),
  );
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const touchStartX = useRef(0);
  const touchStartTime = useRef(0);
  const didSwipe = useRef(false);
  const navigate = useNavigate();

  const trackTransform = useMemo(() => {
    const cardStep = CARD_WIDTH + CARD_GAP;
    return `translateX(calc(50% - ${CARD_WIDTH / 2}px - ${
      activeIndex * cardStep
    }px))`;
  }, [activeIndex]);

  const moveToStory = (nextIndex: number) => {
    const safeIndex = Math.max(0, Math.min(reservationStories.length - 1, nextIndex));
    setActiveIndex(safeIndex);
    onSelectStory(reservationStories[safeIndex]);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    touchStartX.current = event.clientX;
    touchStartTime.current = Date.now();
    didSwipe.current = false;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLElement>) => {
    const diffX = event.clientX - touchStartX.current;
    const elapsed = Date.now() - touchStartTime.current;
    const isSwipe = Math.abs(diffX) > 42 || Math.abs(diffX) / elapsed > 0.45;

    if (!isSwipe) {
      return;
    }

    didSwipe.current = true;

    if (diffX < 0) {
      moveToStory(activeIndex + 1);
      return;
    }

    moveToStory(activeIndex - 1);
  };

  return (
    <main className="reservation-page" aria-labelledby="reservation-title">
      <Header left={<Link to="/home" className="header__back">&lt; 예약</Link>} />

      <ReservationStepHeader stepIndex={0} titleId="reservation-title" />

      <section
        className="reservation-carousel"
        aria-label="예약 동화 선택"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <div className="reservation-carousel__wrap">
          <div
            className="reservation-carousel__track"
            style={{ transform: trackTransform }}
          >
            {reservationStories.map((story, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={story.slug}
                  type="button"
                  className={`reservation-card ${
                    isActive ? "reservation-card--active" : ""
                  }`}
                  onClick={() => {
                    if (didSwipe.current) {
                      return;
                    }

                    moveToStory(index);
                  }}
                  aria-pressed={isActive}
                >
                  <div className="reservation-card__cover" aria-hidden="true" />
                  <div className="reservation-card__body">
                    <p className="reservation-card__title">{story.title}</p>
                    <span className="reservation-card__divider" />
                    <p className="reservation-card__description">
                      {story.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <div className="dots" aria-hidden="true">
        {reservationStories.map((story, index) => (
          <span
            key={story.slug}
            className={`dot ${index === activeIndex ? "dot--active" : ""}`}
          />
        ))}
      </div>

      <div className="reservation-page__footer">
        <button
          type="button"
          className="reservation-page__next"
          onClick={() => navigate("/reservation/date-time")}
        >
          다음 단계로
        </button>
      </div>
    </main>
  );
}
