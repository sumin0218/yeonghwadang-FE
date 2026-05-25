import { Route, Routes } from "react-router-dom";
import { useState } from "react";

import { AppLayout } from "@/components/AppLayout";
import {
  defaultReservationDetails,
  defaultReservationStory,
  type ReservationDetails,
  type ReservationStory,
} from "@/data/reservation";
import { FairyTaleArchivePage } from "@/pages/FairyTaleArchivePage";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { MyFairyTalesPage } from "@/pages/MyFairyTalesPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ReservationConfirmPage } from "@/pages/ReservationConfirmPage";
import { ReservationDateTimePage } from "@/pages/ReservationDateTimePage";
import { ReservationSelectPage } from "@/pages/ReservationSelectPage";
import { ScenePage } from "@/pages/ScenePage";
import { SplashPage } from "@/pages/SplashPage";
import { StoryDetailPage } from "@/pages/StoryDetailPage";

export default function App() {
  const [selectedStory, setSelectedStory] = useState<ReservationStory>(
    defaultReservationStory,
  );
  const [reservationDetails, setReservationDetails] =
    useState<ReservationDetails>(defaultReservationDetails);

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<SplashPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="my-fairytales" element={<MyFairyTalesPage />} />
        <Route path="my-fairytales/heungbu" element={<FairyTaleArchivePage />} />
        <Route
          path="reservation/select"
          element={
            <ReservationSelectPage
              selectedStory={selectedStory}
              onSelectStory={setSelectedStory}
            />
          }
        />
        <Route
          path="reservation/date-time"
          element={
            <ReservationDateTimePage
              details={reservationDetails}
              onUpdateDetails={setReservationDetails}
            />
          }
        />
        <Route
          path="reservation/confirm"
          element={
            <ReservationConfirmPage
              reservation={{
                story: selectedStory,
                details: reservationDetails,
              }}
            />
          }
        />
        <Route path="books/:slug" element={<StoryDetailPage />} />
        <Route path="books/:slug/scene/:pageId" element={<ScenePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
