import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";

export function LoginPage() {
  const navigate = useNavigate();

  return (
    <main className="login-page">
      <header className="login-header">
        <Link to="/" className="login-back">
          {"<"}
        </Link>
        <div className="login-title">로그인</div>
        <div className="login-filler" />
      </header>

      <form
        className="login-form"
        onSubmit={(event) => {
          event.preventDefault();
          navigate("/home");
        }}>
        <label className="login-field">
          <input type="email" placeholder="아이디 (이메일주소)" />
        </label>
        <label className="login-field">
          <input type="password" placeholder="비밀번호" />
        </label>

        <div className="login-help">
          <Link to="/" className="login-help__link">
            ID / PW 찾기
          </Link>
        </div>

        <button type="submit" className="login-button">
          로그인
        </button>
      </form>

      <div className="login-social">
        <div className="login-social__divider">
          <span>SNS로 간편하게 로그인하세요</span>
        </div>
        <div className="login-social__icons">
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="login-footer">
        <button
          type="button"
          className="login-footer__button"
          onClick={() => navigate("/home")}>
          회원 가입
        </button>
        <Link to="/" className="login-footer__link">
          비회원 예약조회
        </Link>
      </div>
    </main>
  );
}
