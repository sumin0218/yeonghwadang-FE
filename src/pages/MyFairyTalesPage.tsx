import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { TopBar } from "@/components/TopBar";
import "./MyFairyTalesPage.css";

const myBooks = [
  {
    id: 1,
    title: "흥부와 놀부",
    cover: "/images/book-cover.png",
    href: "/my-fairytales/heungbu",
  },
  { id: 2, title: "아씨의 하루", cover: "/images/book-cover.png" },
  { id: 3, title: "흥부와 놀부", cover: "/images/book-cover.png" },
  { id: 4, title: "아씨의 하루", cover: "/images/book-cover.png" },
  { id: 5, title: "흥부와 놀부", cover: "/images/book-cover.png" },
  { id: 6, title: "아씨의 하루", cover: "/images/book-cover.png" },
];

const filters = ["전체", "최근", "장르별", "제작중"];

export function MyFairyTalesPage() {
  const [activeFilter, setActiveFilter] = useState(filters[0]);
  const navigate = useNavigate();

  return (
    <main className="my-fairytales-page" aria-labelledby="my-fairytales-title">
      <TopBar
        className="my-fairytales-topbar"
        left={
          <button
            type="button"
            className="topbar-button"
            onClick={() => navigate("/home")}
            aria-label="뒤로가기"
          >
            <span className="my-fairytales-topbar__back" aria-hidden="true">
              &lt;
            </span>
          </button>
        }
        center={
          <h1 id="my-fairytales-title" className="topbar-title">
            나의 동화
          </h1>
        }
        right={
          <button type="button" className="topbar-button" aria-label="메뉴 열기">
            <span className="topbar-button__icon">☰</span>
          </button>
        }
      />

      <section className="my-fairytales-intro">
        <p>
          안녕하세요 지예님,
          <br />이 곳에선 내가 만든 동화를 모아볼 수 있어요.
        </p>
      </section>

      <section className="my-fairytales-library">
        <div className="my-fairytales-filterbar" aria-label="나의 동화 필터">
          <div className="my-fairytales-filterbar__group">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`my-fairytales-filter ${
                  activeFilter === filter ? "my-fairytales-filter--active" : ""
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <button type="button" className="my-fairytales-sort">
            최근 제작순
          </button>
        </div>

        <div className="my-fairytales-grid">
          {myBooks.map((book) => {
            const card = (
              <article className="my-fairytales-book">
                <img
                  src={book.cover}
                  alt={`${book.title} 표지`}
                  className="my-fairytales-book__cover"
                />
                <p className="my-fairytales-book__title">{book.title}</p>
              </article>
            );

            return book.href ? (
              <Link
                key={book.id}
                to={book.href}
                className="my-fairytales-book-link"
              >
                {card}
              </Link>
            ) : (
              <div key={book.id}>{card}</div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
