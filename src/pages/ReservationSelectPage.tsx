import { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PageHeader } from "@/components/PageHeader";
import "./ReservationSelectPage.css";

const CARD_WIDTH = 180;
const CARD_GAP = 12;

const stories = [
  {
    slug: "heungbu",
    title: "흥부와 놀부",
    description: "가난하지만 화목한 흥부네 가족이 제비의 은혜를 갚은 뒤, 큰 복을 받는 이야기",
  },
  {
    slug: "kongjwi",
    title: "콩쥐 팥쥐",
    description: "착한 콩쥐가 어려움을 이겨내고 행복을 찾아가는 이야기",
  },
  {
    slug: "simcheong",
    title: "심청전",
    description: "아버지의 눈을 뜨게 하려 인당수에 몸을 던진 효녀 이야기",
  },
  {
    slug: "chunhyang",
    title: "춘향전",
    description: "춘향과 몽룡의 사랑과 약속을 그린 고전 로맨스 이야기",
  },
  {
    slug: "rabbit",
    title: "토끼와 거북이",
    description: "영리한 토끼와 성실한 거북이가 경주를 벌이는 이야기",
  },
];

export function ReservationSelectPage() {
  const [activeIndex, setActiveIndex] = useState(0);
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
    setActiveIndex(Math.max(0, Math.min(stories.length - 1, nextIndex)));
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
      <PageHeader backTo="/home" backLabel="< 예약" />

      <p className="reservation-page__step">예약 진행 1 / 3</p>

      <section className="reservation-page__header">
        <h1 className="reservation-page__title" id="reservation-title">
          촬영할 동화를
          <br />
          선택해주세요.
        </h1>
      </section>

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
            {stories.map((story, index) => {
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
        {stories.map((story, index) => (
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
