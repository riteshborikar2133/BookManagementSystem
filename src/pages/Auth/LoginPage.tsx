// src/pages/Auth/LoginPage.tsx

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BookOpen, ArrowLeft, GitGraph, Earth, Mail, Lock } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);

    if (success) {
      setError("");
      navigate("/books");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    // Fixed container height on desktop to strictly prevent full-page scaling bugs
    <div className="h-screen w-screen flex flex-col md:flex-row bg-white dark:bg-slate-950 transition-colors duration-300 overflow-hidden">
      {/* ================= LEFT SIDE ================= */}
      {/* Fixed full height on desktop, naturally hidden on mobile */}
      <div className="hidden md:flex md:w-1/2 h-full relative bg-primary-500 overflow-hidden items-center justify-center p-12 select-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-500/20 rounded-full blur-2xl -ml-10 -mb-10"></div>

        <div className="relative z-10 max-w-md text-white">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-bold tracking-tight">BookMS</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl font-bold leading-tight mb-6">
            Welcome back to your
            <br />
            book dashboard.
          </h2>

          {/* Description */}
          <p className="text-primary-100 text-lg leading-relaxed mb-8">
            Organize, manage, and track your books with a modern and responsive
            management system.
          </p>

          {/* Users */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-primary-500 bg-slate-200"
                />
              ))}
            </div>
            <p className="text-sm text-primary-50">
              Trusted by thousands of readers.
            </p>
          </div>
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      {/* Scrollable container on mobile devices, independent scrolling on desktop */}
      <div className="flex-1 h-full overflow-y-auto flex flex-col justify-between p-6 sm:p-12 md:p-16 lg:p-10 ">
        {/* Top Spacer / Mobile Logo */}
        <div className="w-full flex items-center justify-between mb-8 md:mb-0">
          <div className="md:hidden flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary-500" />
            <span className="text-xl font-bold dark:text-white">BookMS</span>
          </div>
        </div>

        {/* Form Wrap Center Context */}
        <div className="max-w-sm w-full mx-auto my-auto space-y-6 md:space-y-8">
          {/* Header */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary-500 transition-colors mb-4 md:mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>

            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              Sign In
            </h1>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 md:mt-2">
              Login using dummy credentials:
              <br />
              <span className="font-semibold">admin / admin</span>
            </p>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-2 md:py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all font-medium text-sm dark:text-slate-300 cursor-pointer">
              <Earth className="w-4 h-4" />
              Google
            </button>

            <button className="flex items-center justify-center gap-2 py-2 md:py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all font-medium text-sm dark:text-slate-300 cursor-pointer">
              <GitGraph className="w-4 h-4" />
              GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-100 dark:border-slate-800"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-950 px-2 text-slate-400">
                Or continue with username
              </span>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-4 md:space-y-5" onSubmit={handleLogin}>
            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                Username
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all dark:text-white"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs md:text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all dark:text-white"
                  required
                />
              </div>
            </div>

            {/* Error Message Space Preservation */}
            <div className="min-h-[20px]">
              {error && (
                <p className="text-xs md:text-sm text-red-500 animate-fadeIn">
                  {error}
                </p>
              )}
            </div>

            {/* Button */}
            <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-primary-500/20 transition-all active:scale-[0.98] cursor-pointer">
              Sign In to BookMS
            </button>
          </form>

          {/* Form Quick Demo Footer */}
          <p className="text-center text-xs md:text-sm text-slate-500 dark:text-slate-400">
            Demo Login:{" "}
            <span className="font-semibold text-primary-500">
              admin / admin
            </span>
          </p>
        </div>

        {/* Bottom Footer */}
        <p className="mt-4 md:mt-0 text-center text-xs text-slate-400">
          Secure authentication system enabled.
          <br />
          &copy; {new Date().getFullYear()} BookMS.
        </p>
      </div>
    </div>
  );
}
