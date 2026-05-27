import { Outlet, useNavigate } from "react-router-dom";
import { BookOpen, LogIn, Sun, Moon } from "lucide-react";

import { useThemeStore } from "../store/useThemeStore";

export default function PublicExploreLayout() {
  const navigate = useNavigate();

  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* ================= NAVBAR ================= */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="p-2 bg-primary-500 rounded-xl text-white">
              <BookOpen className="w-5 h-5" />
            </div>

            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Book<span className="text-primary-500">MS</span>
            </span>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:ring-2 ring-primary-500/20 transition-all"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Login Button */}
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold transition-all shadow-lg shadow-primary-500/10"
            >
              <LogIn className="w-4 h-4" />
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* ================= PAGE CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
