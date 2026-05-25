import { useState } from "react";

import { PageHeader } from "@/components/PageHeader";
import "./FairyTaleArchivePage.css";

const pages = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  image: "/images/first-logo.png",
}));

pages[2] = {
  id: 3,
  image: "/images/transparent.png",
};

type TurnDirection = "next" | "prev" | null;

export function FairyTaleArchivePage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [turnDirection, setTurnDirection] = useState<TurnDirection>(null);

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === pages.length - 1;

  const turnPage = (direction: Exclude<TurnDirection, null>) => {
    if (turnDirection) {
      return;
    }

    if (direction === "prev" && isFirstPage) {
      return;
    }

    if (direction === "next" && isLastPage) {
      return;
    }

    setTurnDirection(direction);
    window.setTimeout(() => {
      setCurrentPage((page) => page + (direction === "next" ? 1 : -1));
      setTurnDirection(null);
    }, 360);
  };

  return (
    <main className="archive-page" aria-labelledby="archive-title">
      <PageHeader backTo="/my-fairytales" backLabel="< 동화책 보관함" />

      <section className="archive-page__heading">
        <h1 id="archive-title">흥부와 놀부</h1>
        <p>2026. 05. 23</p>
      </section>

      <section className="archive-book" aria-label="동화책 사진 보기">
        <button
          type="button"
          className="archive-book__turn-zone archive-book__turn-zone--left"
          onClick={() => turnPage("prev")}
          disabled={isFirstPage}
          aria-label="이전 장 보기"
        />
        <div
          className={`archive-book__spread ${
            turnDirection ? `archive-book__spread--turn-${turnDirection}` : ""
          }`}>
          <img
            src={pages[currentPage].image}
            alt={`흥부와 놀부 ${currentPage + 1}번째 장면`}
            className="archive-book__image"
          />
          <span className="archive-book__page-shadow archive-book__page-shadow--left" />
          <span className="archive-book__page-shadow archive-book__page-shadow--right" />
          {turnDirection && (
            <span className="archive-book__turning-page" aria-hidden="true" />
          )}
        </div>
        <button
          type="button"
          className="archive-book__turn-zone archive-book__turn-zone--right"
          onClick={() => turnPage("next")}
          disabled={isLastPage}
          aria-label="다음 장 보기"
        />
      </section>

      <section className="archive-page__bottom">
        {isLastPage ? (
          <button type="button" className="archive-page__download">
            다운로드하기
          </button>
        ) : (
          <p>
            모든 장면을 확인한 뒤
            <br />
            동화책으로 저장할 수 있어요.
          </p>
        )}
      </section>

      <div className="archive-page__indicator" aria-hidden="true">
        {pages.map((page, index) => (
          <span
            key={page.id}
            className={index === currentPage ? "is-active" : undefined}
          />
        ))}
      </div>
    </main>
  );
}
