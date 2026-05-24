import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import "./ReservationSelectPage.css";

export function ReservationDateTimePage() {
  const navigate = useNavigate();

  return (
    <main className="reservation-page" aria-labelledby="reservation-date-title">
      <PageHeader backTo="/reservation/select" backLabel="< 예약" />

      <section className="reservation-page__header">
        <p className="reservation-page__step">예약 진행 2/3</p>
        <h1 className="reservation-page__title" id="reservation-date-title">
          날짜와 인원을 선택해주세요.
        </h1>
      </section>

      <p className="reservation-card__description" style={{ marginTop: 12 }}>
        다음 단계에서는 촬영 날짜, 시간을 정하고 인원을 선택할 수 있어요.
      </p>

      <div className="reservation-page__footer" style={{ marginTop: 40 }}>
        <button
          type="button"
          className="reservation-page__next"
          onClick={() => navigate("/home")}>
          홈으로 이동
        </button>
      </div>
    </main>
  );
}
