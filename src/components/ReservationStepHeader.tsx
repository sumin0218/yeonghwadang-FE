import { RESERVATION_STEPS } from "@/data/reservation";
import "./ReservationStepHeader.css";

type Props = {
  stepIndex: number;
  titleId?: string;
};

export function ReservationStepHeader({ stepIndex, titleId = "reservation-title" }: Props) {
  const step = RESERVATION_STEPS[stepIndex];

  return (
    <>
      <p className="reservation-step-header__label">
        예약 진행 {step.step} / {RESERVATION_STEPS.length}
      </p>
      <section className="reservation-step-header__section">
        <h1 id={titleId} className="reservation-step-header__title">
          {step.title[0]}
          <br />
          {step.title[1]}
        </h1>
        {step.description && (
          <p className="reservation-step-header__description">{step.description}</p>
        )}
      </section>
    </>
  );
}
