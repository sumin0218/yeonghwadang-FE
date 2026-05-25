import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Header } from "@/components/Header";
import { ReservationStepHeader } from "@/components/ReservationStepHeader";
import type { ReservationDraft } from "@/data/reservation";
import "./ReservationConfirmPage.css";

type ReservationConfirmPageProps = {
  reservation: ReservationDraft;
};

const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

export function ReservationConfirmPage({
  reservation,
}: ReservationConfirmPageProps) {
  const [showCompleteOverlay, setShowCompleteOverlay] = useState(false);
  const navigate = useNavigate();
  const { story, details } = reservation;

  useEffect(() => {
    setShowCompleteOverlay(false);
    const timer = window.setTimeout(() => {
      setShowCompleteOverlay(true);
    }, 5000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [reservation]);

  const dateLabel = formatDate(details.date);
  const timeLabel = formatTimeRange(details.selectedTimeIndices);
  const guestLabel = `성인 ${details.adults}명, 아동 ${details.children}명 (총 ${
    details.adults + details.children
  }명)`;

  return (
    <main
      className="reservation-confirm-page"
      aria-labelledby="reservation-confirm-title"
    >
      <Header left={<Link to="/reservation/date-time" className="header__back">&lt; 예약</Link>} />

      <ReservationStepHeader stepIndex={2} titleId="reservation-confirm-title" />

      <section className="reservation-confirm-page__section">
        <h2 className="reservation-confirm-page__section-title">선택한 동화</h2>
        <div className="reservation-confirm-story">
          <div className="reservation-confirm-story__thumb" aria-hidden="true" />
          <div className="reservation-confirm-story__body">
            <p className="reservation-confirm-story__title">{story.title}</p>
            <p className="reservation-confirm-story__description">
              {story.description}
            </p>
          </div>
        </div>
      </section>

      <section className="reservation-confirm-page__section">
        <h2 className="reservation-confirm-page__section-title">예약 정보</h2>
        <dl className="reservation-confirm-info">
          <div className="reservation-confirm-info__row">
            <dt>날짜</dt>
            <dd>{dateLabel}</dd>
          </div>
          <div className="reservation-confirm-info__row">
            <dt>시간</dt>
            <dd>{timeLabel}</dd>
          </div>
          <div className="reservation-confirm-info__row">
            <dt>인원</dt>
            <dd>{guestLabel}</dd>
          </div>
        </dl>
      </section>

      <section className="reservation-confirm-page__section">
        <h2 className="reservation-confirm-page__section-title">안내사항</h2>
        <ul className="reservation-confirm-notice">
          <li>
            예약일로부터 1주일 전까지만 무료 취소 및 변경이 가능하며,
            이후에는 취소 수수료가 발생할 수 있습니다.
          </li>
          <li>
            촬영 최소 20분 전 방문 부탁드립니다. 한복 선택 및 환복, 준비
            시간이 20분으로 제한되어있습니다.
          </li>
          <li>
            개인사정 등으로 예약시간에 늦으시면 촬영은 취소되며, 환불이
            불가합니다.
          </li>
          <li>촬영 시간은 예약시간 정시에 시작됩니다.</li>
          <li>촬영장비와 촬영장 오염 문제로 식음료 반입이 불가합니다.</li>
          <li>촬영장 내부는 신발 탈의 후 이용이 가능합니다.</li>
        </ul>
      </section>

      {showCompleteOverlay && (
        <div className="reservation-complete-overlay" role="status">
          <p className="reservation-complete-overlay__title">
            예약이 완료되었어요!
          </p>
          <p className="reservation-complete-overlay__text">
            홈 화면으로 돌아가요.
            <br />홈 탭에서 예약내역을 확인할 수 있어요.
          </p>
          <button
            type="button"
            className="reservation-complete-overlay__button"
            onClick={() => navigate("/home")}
          >
            홈으로
          </button>
        </div>
      )}
    </main>
  );
}

function formatDate(date: Date | null) {
  if (!date) {
    return "날짜를 선택해주세요.";
  }

  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${
    weekdays[date.getDay()]
  })`;
}

function formatTimeRange(selectedTimeIndices: number[]) {
  if (selectedTimeIndices.length === 0) {
    return "시간을 선택해주세요.";
  }

  const sortedIndices = [...selectedTimeIndices].sort((a, b) => a - b);
  const startHour = 11 + sortedIndices[0];
  const endHour = 11 + sortedIndices[sortedIndices.length - 1] + 1;
  const duration = endHour - startHour;

  return `${formatHour(startHour)} - ${formatHour(endHour)} (${duration}시간)`;
}

function formatHour(hour: number) {
  const period = hour < 12 ? "오전" : "오후";
  const displayHour = hour <= 12 ? hour : hour - 12;
  return `${period} ${displayHour}:00`;
}
