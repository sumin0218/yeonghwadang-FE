import { Route, Routes } from "react-router-dom";

import { AppLayout } from "@/components/AppLayout";
import { HomePage } from "@/pages/HomePage";
import { LoginPage } from "@/pages/LoginPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ReservationDateTimePage } from "@/pages/ReservationDateTimePage";
import { ReservationSelectPage } from "@/pages/ReservationSelectPage";
import { ScenePage } from "@/pages/ScenePage";
import { SplashPage } from "@/pages/SplashPage";
import { StoryDetailPage } from "@/pages/StoryDetailPage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<SplashPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="reservation/select" element={<ReservationSelectPage />} />
        <Route
          path="reservation/date-time"
          element={<ReservationDateTimePage />}
        />
        <Route path="books/:slug" element={<StoryDetailPage />} />
        <Route path="books/:slug/scene/:pageId" element={<ScenePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
