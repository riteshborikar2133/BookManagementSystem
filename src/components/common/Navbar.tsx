// src/components/common/Navbar.tsx

import { NavLink, useNavigate } from "react-router-dom";
import { BookOpen, LogOut, Moon, Sun, User } from "lucide-react";
import { useThemeStore } from "../../store/useThemeStore";
import { useAuthStore } from "../../store/useAuthStore";

const Navbar = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useThemeStore();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Shared classes for layout styling to keep logic readable
  const linkStyles = ({ isActive }: { isActive: boolean }) => `
    relative px-1 py-2 text-sm font-semibold transition-all duration-200 group
    ${
      isActive
        ? "text-primary-500"
        : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
    }
  `;

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md select-none transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          {/* ================= LEFT: Brand & Navigation ================= */}
          <div className="flex items-center gap-8 md:gap-10">
            {/* Logo */}
            <div
              className="flex items-center gap-2.5 group cursor-pointer"
              onClick={() => navigate("/books")}
            >
              <div className="p-2 rounded-xl bg-primary-500 text-white shadow-md shadow-primary-500/10 dark:shadow-none group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                Book<span className="text-primary-500">MS</span>
              </h1>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex items-center gap-6">
              <NavLink to="/books" className={linkStyles}>
                {({ isActive }) => (
                  <>
                    Explore
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-primary-500 transition-all duration-200 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                    />
                  </>
                )}
              </NavLink>

              <NavLink to="/manage" className={linkStyles}>
                {({ isActive }) => (
                  <>
                    Manage
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-primary-500 transition-all duration-200 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                    />
                  </>
                )}
              </NavLink>
            </div>
          </div>

          {/* ================= RIGHT: User Profile & Utility Actions ================= */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* User Profile Info Badge */}
            <div className="flex items-center gap-3 border-r border-slate-100 dark:border-slate-800/60 pr-3 sm:pr-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  {user?.username || "Guest User"}
                </p>
                <p className="text-[11px] font-medium text-slate-400 dark:text-slate-500 tracking-wider uppercase mt-0.5">
                  {user?.username || "Administrator"}
                </p>
              </div>

              {/* Profile Avatar Container */}
              <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center shadow-inner">
                <User className="w-4 h-4" />
              </div>
            </div>

            {/* Utility Group */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all cursor-pointer"
                aria-label="Toggle layout theme"
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 sm:px-4 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold shadow-md shadow-rose-500/10 hover:shadow-rose-500/20 transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-rose-500/20 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
