export type ReservationStory = {
  slug: string;
  title: string;
  description: string;
};

export type ReservationDetails = {
  date: Date | null;
  selectedTimeIndices: number[];
  adults: number;
  children: number;
};

export type ReservationDraft = {
  story: ReservationStory;
  details: ReservationDetails;
};

export const reservationStories: ReservationStory[] = [
  {
    slug: "heungbu",
    title: "흥부와 놀부",
    description:
      "흥부네 가족처럼, 착한 마음씨로 행복을 얻는 이야기를 가족과 함께 담아보세요.",
  },
  {
    slug: "kongjwi",
    title: "콩쥐 팥쥐",
    description: "착한 콩쥐가 어려움을 이겨내고 행복을 찾아가는 이야기",
  },
  {
    slug: "simcheong",
    title: "심청전",
    description: "아버지의 눈을 뜨게 하려 인당수에 몸을 던진 효녀 이야기",
  },
  {
    slug: "chunhyang",
    title: "춘향전",
    description: "춘향과 몽룡의 사랑과 약속을 그린 고전 로맨스 이야기",
  },
  {
    slug: "rabbit",
    title: "토끼와 거북이",
    description: "영리한 토끼와 성실한 거북이가 경주를 벌이는 이야기",
  },
];

export const defaultReservationStory = reservationStories[0];

export const defaultReservationDetails: ReservationDetails = {
  date: new Date(2026, 4, 28),
  selectedTimeIndices: [5, 6, 7],
  adults: 1,
  children: 1,
};
