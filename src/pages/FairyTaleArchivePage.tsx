import { useState, useRef, useEffect } from "react";
import { PageFlip } from "page-flip";

import { Link } from "react-router-dom";

import { Header } from "@/components/Header";
import "./FairyTaleArchivePage.css";

const pageImages = [
  "/images/first-logo.png",
  "/images/first-logo.png",
  "/images/transparent.png",
  "/images/first-logo.png",
  "/images/first-logo.png",
];

export function FairyTaleArchivePage() {
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const isLastPage = currentPage === pageImages.length - 1;

  useEffect(() => {
    const wrapper = containerRef.current;
    if (!wrapper) return;

    const inner = document.createElement("div");
    wrapper.appendChild(inner);

    const width = Math.min(window.innerWidth, 430);
    const height = Math.min(window.innerHeight * 0.65, 520);

    const pf = new PageFlip(inner, {
      width,
      height,
      size: "fixed",
      drawShadow: true,
      flippingTime: 600,
      usePortrait: true,
      useMouseEvents: true,
      mobileScrollSupport: false,
      swipeDistance: 30,
      showPageCorners: true,
      showCover: false,
    });

    pf.loadFromImages(pageImages);
    pf.on("flip", (e) => setCurrentPage(e.data));

    return () => {
      pf.destroy();
    };
  }, []);

  return (
    <main className="archive-page" aria-labelledby="archive-title">
      <Header left={<Link to="/my-fairytales" className="header__back">&lt; 동화책 보관함</Link>} />

      <section className="archive-page__heading">
        <h1 id="archive-title">흥부와 놀부</h1>
        <p>2026. 05. 23</p>
      </section>

      <section className="archive-book">
        <div
          ref={containerRef}
          className="archive-book__container"
          role="img"
          aria-label="흥부와 놀부 동화 그림"
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
        {pageImages.map((_, index) => (
          <span
            key={index}
            className={index === currentPage ? "is-active" : undefined}
          />
        ))}
      </div>
    </main>
  );
}
