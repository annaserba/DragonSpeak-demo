import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppShell } from "../../widgets/app-shell/AppShell";
import { ArchitecturePage } from "../../pages/architecture/ArchitecturePage";
import { HomePage } from "../../pages/home/HomePage";
import { QuestPage } from "../../pages/quest/QuestPage";
import { VocabularyPage } from "../../pages/vocabulary/VocabularyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "quest", element: <QuestPage /> },
      { path: "vocabulary", element: <VocabularyPage /> },
      { path: "architecture", element: <ArchitecturePage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
