// src/components/books/BookDetailsModal.tsx

import { useEffect } from "react";
import {
  X,
  Star,
  BookOpen,
  Calendar,
  User,
  MessageSquare,
  ArrowRight,
  Bookmark,
} from "lucide-react";
import type { Book } from "../../types/book";

interface BookDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
}

export default function BookDetailsModal({
  isOpen,
  onClose,
  book,
}: BookDetailsModalProps) {
  /* ================= BODY SCROLL LOCK ================= */
  useEffect(() => {
    if (isOpen && book) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, book]);

  if (!isOpen || !book) return null;
  console.log({ book });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity cursor-pointer"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl h-full max-h-[85vh] rounded-[32px] overflow-hidden bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in-95 duration-300 flex flex-col lg:flex-row z-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2.5 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-primary-500 hover:scale-110 transition-all shadow-sm cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ================= LEFT SIDE (Cover Canvas - Rigid & Locked) ================= */}
        {/* Removed overflow-y-auto, added overflow-hidden and shrink-0 to completely block scroll actions */}
        <div className="relative w-full lg:w-[45%] bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center p-8 lg:p-12 overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800 shrink-0 lg:h-full select-none">
          {/* Brand Accent Backgrounds */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary-500/10 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary-500/10 rounded-full blur-[100px]" />

          {/* Floating Book Cover Effect */}
          <div className="relative group perspective-1000 w-full max-w-[240px] lg:max-w-none flex justify-center">
            {/* Switched max-height parameters from rigid values to modern viewport-aware dimensions */}
            <div className="relative w-full max-w-[240px] aspect-[2/3] lg:h-[380px] lg:w-64 rounded-[24px] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] dark:shadow-none flex flex-col items-center justify-center overflow-hidden transition-transform duration-500 group-hover:rotate-y-6">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5" />

              <div className="relative z-10 flex flex-col items-center text-center px-6">
                <div className="w-14 h-14 lg:w-18 lg:h-18 bg-primary-500/10 rounded-2xl flex items-center justify-center mb-4 lg:mb-6">
                  <BookOpen className="w-7 h-7 lg:w-9 lg:h-9 text-primary-500" />
                </div>
                <h2 className="text-lg lg:text-xl font-black text-slate-900 dark:text-white tracking-tight leading-tight line-clamp-2">
                  {book.title}
                </h2>
                <div className="h-1 w-10 bg-primary-500/30 rounded-full my-3" />
                <p className="text-slate-500 dark:text-slate-400 text-xs lg:text-sm font-medium truncate max-w-full">
                  {book.author}
                </p>
              </div>

              {/* Cover Footer Texture */}
              <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-slate-50 dark:from-slate-900 to-transparent opacity-50" />
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE (Details Scroll Zone) ================= */}
        <div className="flex-1 flex flex-col min-h-0 h-full overflow-hidden bg-white dark:bg-slate-950">
          <div className="flex-1 overflow-y-auto p-8 lg:p-12 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
            {/* Meta Header */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3.5 py-1.5 rounded-xl bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-widest border border-primary-500/10">
                {book.genre}
              </span>
              <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3 py-1.5 rounded-xl text-xs font-bold border border-amber-500/10">
                <Star className="w-3.5 h-3.5 fill-current" />
                4.8 Rating
              </div>
            </div>

            <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-[1.1] mb-4">
              {book.title}
            </h1>

            <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed mb-8 max-w-xl">
              An insightful journey into the world of {book.genre}, exploring
              complex themes with remarkable clarity.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="p-4 rounded-[24px] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 group hover:border-primary-500/20 transition-all">
                <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
                  <User className="w-4 h-4 text-primary-500" />
                  Primary Author
                </div>
                <p className="text-base font-bold text-slate-900 dark:text-white truncate">
                  {book.author}
                </p>
              </div>

              <div className="p-4 rounded-[24px] bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 group hover:border-primary-500/20 transition-all">
                <div className="flex items-center gap-3 text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">
                  <Calendar className="w-4 h-4 text-primary-500" />
                  Release Year
                </div>
                <p className="text-base font-bold text-slate-900 dark:text-white">
                  {book.year}
                </p>
              </div>
            </div>

            {/* Description Section */}
            <div className="mb-10">
              <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-2">
                The Premise <ArrowRight className="w-3 h-3 text-primary-500" />
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">
                This volume represents a significant addition to our collection.
                It offers readers a sophisticated framework for understanding
                its core subject matter, blending practical application with
                academic rigor. A cornerstone for any serious collector.
              </p>
            </div>

            {/* Reviews Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary-500/10 rounded-lg">
                    <MessageSquare className="w-5 h-5 text-secondary-500" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Community Reviews
                  </h3>
                </div>
                <button className="text-sm font-bold text-primary-500 hover:underline cursor-pointer">
                  Write a review
                </button>
              </div>

              <div className="grid gap-4">
                {book.comments?.map((review) => (
                  <div
                    key={review.id}
                    className="p-5 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/30 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-[10px] font-black shadow-md">
                          {review.username
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>

                        <div>
                          <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                            {review.username}
                          </h4>

                          <div className="flex items-center gap-0.5 mt-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-2.5 h-2.5 ${
                                  i < review.rating
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-slate-200 dark:text-slate-700"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
                      "{review.comment}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Persistent Sticky Action Bar */}
          <div className="p-6 lg:px-12 bg-slate-50 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 flex items-center gap-4 shrink-0">
            <button className="flex-1 px-6 py-3.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-black rounded-2xl hover:scale-[1.01] active:scale-[0.99] transition-all shadow-xl text-sm flex items-center justify-center gap-2 group cursor-pointer">
              Borrow Book
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="p-3.5 border border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-500 hover:text-primary-500 hover:border-primary-500 rounded-2xl transition-all cursor-pointer">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
