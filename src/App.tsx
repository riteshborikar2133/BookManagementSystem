// src/App.tsx

import { useEffect } from "react";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/Landing/LandingPage";
import LoginPage from "./pages/Auth/LoginPage";

import ExploreBooksPage from "./pages/Books/ExploreBooksPage";

import { useThemeStore } from "./store/useThemeStore";
import { useAuthStore } from "./store/useAuthStore";
import MainLayout from "./layout/MainLayout";
import ManageBooksPage from "./pages/Books/ManageBooksPage";
import PublicExploreLayout from "./layout/PublicExploreLayout";

/* ================= APP ================= */

function App() {
  const { isDarkMode } = useThemeStore();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  /* ================= THEME SYNC ================= */

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}

        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/explore" element={<PublicExploreLayout />}>
          <Route index element={<ExploreBooksPage />} />
        </Route>

        {/* ================= PROTECTED ROUTES ================= */}

        <Route
          path="/"
          element={isAuthenticated ? <MainLayout /> : <Navigate to="/login" />}
        >
          {/* ================= EXPLORE ================= */}

          <Route path="books" element={<ExploreBooksPage />} />

          {/* ================= MANAGE ================= */}

          <Route path="manage" element={<ManageBooksPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
