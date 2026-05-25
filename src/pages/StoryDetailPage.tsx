import { Link, useParams } from "react-router-dom";
import "./StoryDetailPage.css";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { Header } from "@/components/Header";

const storyData = {
  heungbu: {
    title: "흥부와 놀부",
    age: "3인 이상",
    genre: "가족",
    tags: ["3인 이상", "가족", "교훈", "5컷"],
    cover: "/images/book-cover.png",
    description:
      "그리고 가난하지만 착한 흥부네 가족이\n제비의 은혜를 갚아 큰 복을 받는 이야기",
    detail:
      "1. 화목한 흥부네 아침\n2. 다친 제비와의 만남\n3. 제비가 돌아다 준 박씨\n4. 슬근슬근 박 타는 시간\n5. 쏟아지는 보물과 행복",
  },
  assi: {
    title: "아씨와 돌쇠",
    age: "2인 남녀",
    genre: "코믹",
    tags: ["2인 남녀", "코믹", "로맨스", "5컷"],
    cover: "/images/book-cover.png",
    description:
      "짝사랑에 진심인 돌쇠와\n그런 돌쇠가 가끔 황당한 아씨의\n현실 코믹 로맨스",
    detail:
      "1. 화목한 흥부네 아침\n2. 다친 제비와의 만남\n3. 제비가 돌아다 준 박씨\n4. 슬근슬근 박 타는 시간\n5. 쏟아지는 보물과 행복",
  },
};

export function StoryDetailPage() {
  const { slug } = useParams();
  const story = slug ? storyData[slug as keyof typeof storyData] : undefined;

  if (!story) {
    return <NotFoundPage />;
  }

  return (
    <main className="detail-page">
      <Header left={<Link to="/" className="header__back">&lt; 영화당</Link>} />

      <img
        src={story.cover}
        alt={`${story.title} 표지`}
        className="detail-page__cover"
      />

      <div className="detail-page__content">
        <div className="detail-page__tags">
          {story.tags.map((tag) => (
            <span key={tag} className="badge">
              {tag}
            </span>
          ))}
        </div>

        <h1 className="detail-page__title">{story.title}</h1>
        <p className="detail-page__description">{story.description}</p>

        <div className="detail-page__summary">
          <h3>따라찍기 5컷</h3>
          <p>{story.detail}</p>
        </div>

        <Link to={`/books/${slug}/scene/1`} className="detail-page__scene-link">
          장면 보기
        </Link>
      </div>
    </main>
  );
}
