import { Link } from "react-router-dom";
import "./SplashPage.css";

export function SplashPage() {
  return (
    <main className="splash-page">
      <section className="splash-hero">
        <p className="splash-hero__text">
          당신이
          <br />
          주인공이 되는 곳,
          <br />
          <span className="splash-hero__brand">영화당에서.</span>
        </p>
      </section>

      <div className="splash-logo">
        <img src="/images/first-logo.png" alt="영화당 로고" />
      </div>

      <div className="splash-action">
        <Link to="/login" className="splash-action__link">
          지금 시작하기 <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}
