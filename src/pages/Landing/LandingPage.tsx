import { useEffect } from "react";
import {
  BookOpen,
  Shield,
  Layers,
  ArrowRight,
  Star,
  Sun,
  Moon,
} from "lucide-react";

import { useThemeStore } from "../../store/useThemeStore";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  // Theme Sync
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-sans selection:bg-secondary-100 transition-colors duration-300">
      {/* ================= NAVBAR ================= */}

      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-slate-950/80 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary-500 rounded-xl text-white">
              <BookOpen className="w-6 h-6" />
            </div>

            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Book<span className="text-primary-500">MS</span>
            </span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
            <a
              href="#features"
              className="hover:text-primary-500 transition-colors"
            >
              Features
            </a>

            <a
              href="#dashboard"
              className="hover:text-primary-500 transition-colors"
            >
              Dashboard
            </a>

            <a
              href="#about"
              className="hover:text-primary-500 transition-colors"
            >
              About
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:ring-2 ring-primary-500/20 transition-all"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Login */}
            <button
              className="text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-primary-600 transition-colors"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>

            {/* Explore */}
            <button
              onClick={() => navigate("/explore")}
              className="text-sm font-semibold bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg shadow-sm transition-all shadow-primary-500/10"
            >
              Explore
            </button>
          </div>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}

      <header className="relative overflow-hidden bg-gradient-to-b from-primary-50 dark:from-primary-950/20 via-white dark:via-slate-950 to-white dark:to-slate-950 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-100 dark:bg-secondary-900/30 text-secondary-700 dark:text-secondary-300 text-xs font-semibold tracking-wide uppercase">
              <Star className="w-3.5 h-3.5 fill-current" />
              Smart Book Management System
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
              Manage your books,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-secondary-500">
                smarter & faster.
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              A modern platform to organize, track, add, edit, and manage your
              entire book collection with a clean and responsive dashboard.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <button
                onClick={() => navigate("/explore")}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-primary-500/20 transition-all group"
              >
                Explore Books
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="w-full sm:w-auto bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold px-6 py-3 rounded-xl transition-all">
                Learn More
              </button>
            </div>
          </div>

          {/* ================= DASHBOARD PREVIEW ================= */}

          <div id="dashboard" className="relative lg:ml-4">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl blur-2xl opacity-10 dark:opacity-20 animate-pulse"></div>

            <div className="relative bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-800 text-slate-400 font-mono text-xs">
              {/* Window Controls */}
              <div className="flex items-center gap-2 pb-4 border-b border-slate-800 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>

                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>

                <div className="w-3 h-3 rounded-full bg-green-500"></div>

                <span className="text-slate-500 ml-2">
                  book-management-dashboard.tsx
                </span>
              </div>

              {/* Preview Content */}

              <p className="text-emerald-400">// Fetching book collection...</p>

              <p className="text-slate-200 mt-1">
                const books = await BookMS.getAllBooks();
              </p>

              <p className="text-slate-200">
                const stats = await BookMS.getDashboardStats();
              </p>

              <p className="text-secondary-500 mt-3">{"{"}</p>

              <p className="pl-4 text-slate-300">
                totalBooks: <span className="text-amber-400">12,480</span>,
              </p>

              <p className="pl-4 text-slate-300">
                availableBooks: <span className="text-amber-400">10,932</span>,
              </p>

              <p className="pl-4 text-slate-300">
                borrowedBooks: <span className="text-rose-500">1,548</span>
              </p>

              <p className="text-secondary-500">{"}"}</p>

              <p className="text-primary-500 mt-4">
                ✓ Dashboard synced successfully
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* ================= FEATURES SECTION ================= */}

      <section
        id="features"
        className="py-24 border-t border-slate-100 dark:border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Everything needed to manage your books
            </h2>

            <p className="text-slate-600 dark:text-slate-400">
              Powerful features designed to simplify book management, tracking,
              and collection organization.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary-100 dark:hover:border-primary-900 hover:bg-primary-50/20 dark:hover:bg-primary-900/10 transition-all group">
              <div className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-xl w-fit group-hover:bg-primary-500 group-hover:text-white transition-all">
                <Layers className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mt-6 mb-2">
                Easy Book Management
              </h3>

              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Add, edit, delete, and organize books seamlessly through a clean
                and responsive dashboard interface.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary-100 dark:hover:border-primary-900 hover:bg-primary-50/20 dark:hover:bg-primary-900/10 transition-all group">
              <div className="p-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-xl w-fit group-hover:bg-primary-500 group-hover:text-white transition-all">
                <Shield className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mt-6 mb-2">
                Secure Authentication
              </h3>

              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Protected login system with secure access for admins to manage
                books and dashboard operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}

      <section className="mx-6 my-12">
        <div className="max-w-7xl mx-auto bg-slate-900 dark:bg-slate-900/50 rounded-3xl p-12 md:p-16 border border-slate-800 relative overflow-hidden text-center space-y-6">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-600/10 rounded-full blur-3xl pointer-events-none"></div>

          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Ready to view your book collection?
          </h2>

          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
            Start managing your books with a modern, responsive, and fast book
            management platform.
          </p>

          <div className="pt-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-white hover:bg-slate-100 text-slate-900 font-semibold px-8 py-3.5 rounded-xl transition-all shadow-md cursor-pointer"
            >
              Explore
            </button>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-slate-100 dark:border-slate-800 py-8 text-center text-xs text-slate-500 dark:text-slate-500">
        <p>
          &copy; {new Date().getFullYear()} BookMS. Built with React, TypeScript
          & Tailwind CSS v4.
        </p>
      </footer>
    </div>
  );
}
