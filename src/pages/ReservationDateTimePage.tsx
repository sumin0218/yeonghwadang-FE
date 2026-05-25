import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PageHeader } from "@/components/PageHeader";
import type { ReservationDetails } from "@/data/reservation";
import "./ReservationDateTimePage.css";

type ReservationDateTimePageProps = {
  details: ReservationDetails;
  onUpdateDetails: (details: ReservationDetails) => void;
};

export function ReservationDateTimePage({
  details,
  onUpdateDetails,
}: ReservationDateTimePageProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 16));
  const [selectedDate, setSelectedDate] = useState<Date | null>(details.date);
  const [selectedTimeIndices, setSelectedTimeIndices] = useState<number[]>(
    details.selectedTimeIndices,
  );
  const [adults, setAdults] = useState(details.adults);
  const [children, setChildren] = useState(details.children);
  const navigate = useNavigate();

  const timeSlots = Array.from({ length: 11 }, (_, index) => `${11 + index}:00`);

  const handleTimeSelect = (index: number) => {
    if (selectedTimeIndices.length === 0) {
      setSelectedTimeIndices([index]);
      return;
    }

    if (selectedTimeIndices.length === 1) {
      const start = Math.min(selectedTimeIndices[0], index);
      const end = Math.max(selectedTimeIndices[0], index);

      if (end - start < 2) {
        setSelectedTimeIndices([start, end]);
      }
      return;
    }

    if (selectedTimeIndices.length === 2) {
      const start = selectedTimeIndices[0];
      const end = selectedTimeIndices[1];

      if (index === start - 1) {
        setSelectedTimeIndices([index, start, end]);
        return;
      }

      if (index === end + 1) {
        setSelectedTimeIndices([start, end, index]);
        return;
      }
    }

    setSelectedTimeIndices([index]);
  };

  const handleNext = () => {
    onUpdateDetails({
      date: selectedDate,
      selectedTimeIndices,
      adults,
      children,
    });
    navigate("/reservation/confirm");
  };

  const goToPreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
    );
  };

  const goToNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
    );
  };

  const renderCalendarDays = () => {
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0,
    ).getDate();
    const firstDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1,
    ).getDay();
    const days = [];

    for (let index = 0; index < firstDay; index += 1) {
      days.push(
        <div
          key={`empty-${index}`}
          className="calendar__day calendar__day--empty"
        />,
      );
    }

    for (let day = 1; day <= daysInMonth; day += 1) {
      const dayDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day,
      );
      const isSelected =
        selectedDate && selectedDate.toDateString() === dayDate.toDateString();

      days.push(
        <button
          key={day}
          type="button"
          className={`calendar__day ${
            isSelected ? "calendar__day--selected" : ""
          }`}
          onClick={() => setSelectedDate(dayDate)}
        >
          {day}
        </button>,
      );
    }

    return days;
  };

  return (
    <main
      className="reservation-page reservation-page--step2"
      aria-labelledby="reservation-title"
    >
      <PageHeader backTo="/reservation/select" backLabel="< 예약" />

      <p className="reservation-page__step">예약 진행 2 / 3</p>

      <section className="reservation-page__header">
        <h1 className="reservation-page__title" id="reservation-title">
          날짜와 시간,
          <br />
          인원을 선택해주세요.
        </h1>
      </section>

      <section className="calendar">
        <div className="calendar__header">
          <button
            type="button"
            className="calendar__nav-btn"
            onClick={goToPreviousMonth}
          >
            &lt;
          </button>
          <h2 className="calendar__title">
            {currentDate.getFullYear()}년{" "}
            {String(currentDate.getMonth() + 1).padStart(2, "0")}월
          </h2>
          <button
            type="button"
            className="calendar__nav-btn"
            onClick={goToNextMonth}
          >
            &gt;
          </button>
        </div>
        <div className="calendar__grid">{renderCalendarDays()}</div>
      </section>

      <section className="time-slots">
        <div className="time-slots__track">
          {timeSlots.map((time, index) => (
            <button
              key={time}
              type="button"
              className={`time-slot ${
                selectedTimeIndices.includes(index) ? "time-slot--active" : ""
              }`}
              onClick={() => handleTimeSelect(index)}
            >
              {time.split(":")[0]}
            </button>
          ))}
        </div>
      </section>

      <section className="guests">
        <div className="guest-row">
          <span className="guest-label">성인</span>
          <div className="guest-control">
            <button
              type="button"
              className="guest-btn"
              onClick={() => setAdults(Math.max(0, adults - 1))}
            >
              -
            </button>
            <span className="guest-count">{adults}</span>
            <button
              type="button"
              className="guest-btn"
              onClick={() => setAdults(adults + 1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="guest-row">
          <span className="guest-label">아동</span>
          <div className="guest-control">
            <button
              type="button"
              className="guest-btn"
              onClick={() => setChildren(Math.max(0, children - 1))}
            >
              -
            </button>
            <span className="guest-count">{children}</span>
            <button
              type="button"
              className="guest-btn"
              onClick={() => setChildren(children + 1)}
            >
              +
            </button>
          </div>
        </div>

        <p className="guest-note">* 함께 촬영할 인원을 선택해주세요.</p>
      </section>

      <div className="reservation-page__footer">
        <button
          type="button"
          className="reservation-page__next"
          onClick={handleNext}
        >
          다음 단계로
        </button>
      </div>
    </main>
  );
}
