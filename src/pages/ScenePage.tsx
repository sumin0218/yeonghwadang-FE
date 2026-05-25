import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./ScenePage.css";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { Header } from "@/components/Header";

const sceneData = {
  heungbu: {
    title: "흥부와 놀부",
    pages: [
      {
        title: "화목한 흥부네 아침",
        description:
          "다친 제비의 다리를\n정성껏 고쳐주었더니,\n글쎄 제비가 감사의 마음으로\n신비한 박씨를 물어다 주었답니다.",
      },
      {
        title: "지붕 위 대왕 박",
        description:
          "박 씨를 심었더니, 하룻밤 새에\n지붕 위에 커다란 박이 주렁주렁!\n우리 가족 다같이 영차영차,\n박을 타볼까요?",
      },
      {
        title: "쏟아지는 금은보화",
        description:
          "슬근슬근 톱질하세!\n쩍- 하고 박이 갈라지는 순간,\n눈부신 금은보화가 쏟아져 나와\n마당을 가득 채웠습니다.",
      },
      {
        title: "흥부네 잔칫날",
        description:
          "배고픔은 이제 안녕!\n고소한 쌀밥과 맛있는 고기가\n가득한 잔칫상 앞에서\n온 가족이 배불리 먹으며\n웃음꽃을 피웁니다.",
      },
      {
        title: "영원한 행복",
        description:
          "착한 마음씨로 대박을 터뜨린\n흥부네 가족은\n오래오래 행복하게 살았답니다.\n우리 가족의 행복도\n이 박처럼 영원하기를!",
      },
    ],
  },
  assi: {
    title: "아씨와 돌쇠",
    pages: [
      {
        title: "첫 만남의 설렘",
        description:
          "돌쇠는 아씨에게 한눈에 반했어요.\n조심스럽게 말을 건네며\n떨리는 마음을 숨기지 못했습니다.",
      },
      {
        title: "장난스러운 고백",
        description:
          "아씨를 웃기려고 장난을 치다\n오히려 혼이 난 돌쇠.\n그의 진심은 잘 전달될까요?",
      },
      {
        title: "달콤한 데이트",
        description:
          "둘은 작은 정원에서\n함께 시간을 보냈습니다.\n햇살처럼 따뜻한 웃음이 가득했어요.",
      },
      {
        title: "어색한 고백",
        description:
          "돌쇠의 고백은 어색했지만,\n아씨는 그의 진심을 느꼈습니다.\n두 사람의 마음은 조금씩 가까워졌습니다.",
      },
      {
        title: "행복한 마무리",
        description:
          "서로를 이해하며\n함께 걷는 길이 생겼습니다.\n그들의 이야기는 이제 시작입니다.",
      },
    ],
  },
};

type StorySlug = keyof typeof sceneData;

export function ScenePage() {
  const { slug, pageId } = useParams();
  const navigate = useNavigate();
  const story = slug && sceneData[slug as StorySlug];
  const currentPage = pageId ? Number(pageId) : NaN;
  const isLastPage = story ? currentPage === story.pages.length : false;
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    setShowOverlay(false);
    if (!isLastPage) {
      return;
    }

    const timer = window.setTimeout(() => {
      setShowOverlay(true);
    }, 3000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isLastPage, currentPage]);

  if (
    !story ||
    Number.isNaN(currentPage) ||
    currentPage < 1 ||
    currentPage > story.pages.length
  ) {
    return <NotFoundPage />;
  }

  const page = story.pages[currentPage - 1];
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < story.pages.length;

  const goPrev = () => {
    if (hasPrev) {
      navigate(`/books/${slug}/scene/${currentPage - 1}`);
    } else {
      navigate(`/books/${slug}`);
    }
  };

  const goNext = () => {
    if (hasNext) {
      navigate(`/books/${slug}/scene/${currentPage + 1}`);
    }
  };

  return (
    <main className="scene-page">
      <div
        className="scene-page__touch-zone scene-page__touch-zone--left"
        onClick={goPrev}
        role="button"
        aria-label="이전 페이지로 이동"
      />
      <div
        className="scene-page__touch-zone scene-page__touch-zone--right"
        onClick={goNext}
        role="button"
        aria-label="다음 페이지로 이동"
      />

      <div className="scene-page__body">
        <Header left={<Link to={`/books/${slug}`} className="header__back">&lt; {story.title}</Link>} />

        <div className="scene-page__progress">
          <span className="scene-page__counter">
            {currentPage}/{story.pages.length}
          </span>
          <div className="scene-page__bars">
            {story.pages.map((_, index) => (
              <span
                key={index}
                className={`scene-page__bar ${index + 1 === currentPage ? "scene-page__bar--active" : ""}`}
              />
            ))}
          </div>
        </div>

        <section className="scene-page__content">
          <h1 className="scene-page__title">{page.title}</h1>
          <img
            src="/images/transparent.png"
            alt="장면 이미지"
            className="scene-page__image"
          />
          <p className="scene-page__description">{page.description}</p>
        </section>
      </div>

      {showOverlay && (
        <div className="scene-page__overlay">
          <button
            type="button"
            className="scene-page__action-button"
            onClick={() => navigate("/reservation/select")}>
            예약하러 갈래요!
          </button>
          <button
            type="button"
            className="scene-page__secondary-button"
            onClick={() => navigate("/home")}>
            홈 화면으로 돌아갈래요
          </button>
        </div>
      )}
    </main>
  );
}
