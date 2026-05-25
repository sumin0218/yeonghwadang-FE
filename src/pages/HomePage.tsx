import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Header } from "@/components/Header";
import "./HomePage.css";

const books = [
  {
    slug: "heungbu",
    title: "흥부와 놀부",
    age: "3인 이상",
    genre: "가족",
    cover: "/images/book-cover.png",
  },
  {
    slug: "assi",
    title: "아씨와 들쇠",
    age: "2인 남녀",
    genre: "코믹",
    cover: "/images/book-cover.png",
  },
  {
    title: "흥부와 놀부",
    age: "3인 이상",
    genre: "가족",
    cover: "/images/book-cover.png",
  },
  {
    title: "아씨의 하루",
    age: "2인 남녀",
    genre: "코믹",
    cover: "/images/book-cover.png",
  },
  {
    title: "흥부와 놀부",
    age: "3인 이상",
    genre: "가족",
    cover: "/images/book-cover.png",
  },
  {
    title: "아씨의 하루",
    age: "2인 남녀",
    genre: "코믹",
    cover: "/images/book-cover.png",
  },
];

export function HomePage() {
  const [languageOpen, setLanguageOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <main className="home-page" aria-labelledby="home-title">
      <Header
        left={
          <button
            type="button"
            className="header-button"
            aria-expanded={languageOpen}
            aria-haspopup="true"
            onClick={() => {
              setLanguageOpen((current) => !current);
              setMenuOpen(false);
            }}>
            <span className="header-button__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm3.31 4.16a7.978 7.978 0 0 1 2.45 5.84H16.4a13.038 13.038 0 0 0-1.09-3.7 8.006 8.006 0 0 1 0-2.14zM7.69 6.16a7.905 7.905 0 0 0-1.09 3.7H5.24a7.978 7.978 0 0 1 2.45-5.84 8.008 8.008 0 0 1 0 2.14zM4 12a8.002 8.002 0 0 1 8-8c.8 0 1.58.12 2.31.32a12.9 12.9 0 0 1 .84 3.57h-7.1A12.9 12.9 0 0 1 4 12zm2.54 1.7h2.78a13.036 13.036 0 0 0 1.09 3.7 8.006 8.006 0 0 1 0 2.14 7.905 7.905 0 0 0-3.87-5.84zM12 20a7.978 7.978 0 0 1-2.45-5.84h3.9A7.978 7.978 0 0 1 12 20zm2.45-7.84h-4.9a12.87 12.87 0 0 1-.84-3.57h6.58a12.87 12.87 0 0 1-.84 3.57zM16.4 14.14a7.978 7.978 0 0 1-2.45 5.84 8.01 8.01 0 0 1 0-2.14h2.45z" />
              </svg>
            </span>
            KR
            <span className="header-button__caret">▾</span>
          </button>
        }
        center={
          <img
            src="/images/header-logo.png"
            alt="영화당 로고"
            className="brand-logo"
          />
        }
        right={
          <button
            type="button"
            className="header-button"
            aria-expanded={menuOpen}
            aria-haspopup="true"
            onClick={() => {
              setMenuOpen((current) => !current);
              setLanguageOpen(false);
            }}>
            <span className="header-button__icon">☰</span>
          </button>
        }
      />

      <div className="popover-wrapper">
        {languageOpen && (
          <div
            className="popover-panel popover-panel--left"
            role="menu"
            aria-label="언어 선택 메뉴">
            <div className="popover-heading">현재 언어</div>
            <button type="button" className="popover-item active">
              <span>한국어</span>
              <span className="popover-item__icon" aria-hidden="true">
                ✓
              </span>
            </button>
            <button type="button" className="popover-item">
              <span>English (영어)</span>
              <span className="popover-item__icon" aria-hidden="true">
                ↗
              </span>
            </button>
          </div>
        )}

        {menuOpen && (
          <div
            className="popover-panel popover-panel--right"
            role="menu"
            aria-label="사용자 메뉴">
            <div className="popover-heading">현재 로그인</div>
            <div className="popover-user">지예 님</div>
            <button
              type="button"
              className="popover-item"
              onClick={() => {
                setMenuOpen(false);
                navigate("/reservation/select");
              }}>
              <span>예약</span>
              <span className="popover-item__icon" aria-hidden="true">
                ↗
              </span>
            </button>
            <button type="button" className="popover-item">
              <span>촬영 가이드</span>
              <span className="popover-item__icon" aria-hidden="true">
                ↗
              </span>
            </button>
            <button
              type="button"
              className="popover-item"
              onClick={() => {
                setMenuOpen(false);
                navigate("/my-fairytales");
              }}>
              <span>나의 동화</span>
              <span className="popover-item__icon" aria-hidden="true">
                ↗
              </span>
            </button>
            <button type="button" className="popover-item">
              <span>영화당 아카이브</span>
              <span className="popover-item__icon" aria-hidden="true">
                ↗
              </span>
            </button>
          </div>
        )}
      </div>

      <section className="home-user">
        <p className="home-user__greeting">
          안녕하세요, 지예님 <br />
          오늘은 어떤 동화의 주인공이 되어볼까요?
        </p>
      </section>

      <section className="book-grid" aria-label="추천 동화 목록">
        {books.map((book, index) => {
          const isLink = Boolean(book.slug);
          const linkTo = book.slug ? `/books/${book.slug}` : "";

          const card = (
            <article className="book-card">
              <img
                src={book.cover}
                alt={`${book.title} 표지`}
                className="book-card__cover"
              />
              <div className="book-card__info">
                <p className="book-card__title">{book.title}</p>
                <div className="book-card__tags">
                  <span className="badge">{book.age}</span>
                  <span className="badge">{book.genre}</span>
                </div>
              </div>
            </article>
          );

          return isLink ? (
            <Link
              key={`${book.title}-${index}`}
              to={linkTo}
              className="book-card-link">
              {card}
            </Link>
          ) : (
            <div key={`${book.title}-${index}`}>{card}</div>
          );
        })}
      </section>
    </main>
  );
}
