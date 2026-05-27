// src/components/books/AddBookModal.tsx

import { useState } from "react";

import {
  X,
  BookOpen,
  User,
  Calendar,
  Layers,
  Plus,
} from "lucide-react";

import { addBook } from "../../services/bookService";

interface AddBookModalProps {
  isOpen: boolean;

  onClose: () => void;

  refreshBooks: () => void;
}

export default function AddBookModal({
  isOpen,
  onClose,
  refreshBooks,
}: AddBookModalProps) {

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      title: "",
      author: "",
      genre: "",
      year: "",
    });

  if (!isOpen) return null;

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement
    >
  ) => {

    const { name, value } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= HANDLE SUBMIT ================= */

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      await addBook({
        title: formData.title,
        author: formData.author,
        genre: formData.genre,
        year: Number(formData.year),
      });

      refreshBooks();

      onClose();

      setFormData({
        title: "",
        author: "",
        genre: "",
        year: "",
      });

    } catch (error) {

      console.error(
        "Failed to add book:",
        error
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">

      {/* Modal */}

      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-2xl animate-in fade-in zoom-in-95 duration-200">

        {/* Close Button */}

        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 p-2 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
        >

          <X className="w-5 h-5 dark:text-white" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">

          {/* ================= LEFT SIDE ================= */}

          <div className="relative bg-gradient-to-br from-primary-500/10 to-secondary-500/10 border-r border-slate-200 dark:border-slate-800 flex items-center justify-center p-10">

            <div className="absolute top-10 right-10 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl"></div>

            {/* Mock Cover */}

            <div className="relative w-72 h-[420px] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col items-center justify-center overflow-hidden">

              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5"></div>

              <BookOpen className="w-20 h-20 text-primary-500 mb-6" />

              <div className="text-center px-6">

                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">

                  {formData.title ||
                    "Book Title"}
                </h2>

                <p className="text-slate-500 dark:text-slate-400 mt-2">

                  {formData.author ||
                    "Author Name"}
                </p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDE ================= */}

          <div className="p-8 overflow-y-auto">

            <div className="mb-8">

              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">

                Add New Book
              </h2>

              <p className="text-slate-500 dark:text-slate-400 mt-2">

                Fill the details to add
                a new book into your
                collection.
              </p>
            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* TITLE */}

              <div>

                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">

                  Book Title
                </label>

                <div className="relative">

                  <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={
                      handleChange
                    }
                    placeholder="Enter title"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 dark:text-white outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
                  />
                </div>
              </div>

              {/* AUTHOR */}

              <div>

                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">

                  Author
                </label>

                <div className="relative">

                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={
                      handleChange
                    }
                    placeholder="Enter author"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 dark:text-white outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
                  />
                </div>
              </div>

              {/* GENRE */}

              <div>

                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">

                  Genre
                </label>

                <div className="relative">

                  <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                  <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={
                      handleChange
                    }
                    placeholder="Enter genre"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 dark:text-white outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
                  />
                </div>
              </div>

              {/* YEAR */}

              <div>

                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">

                  Published Year
                </label>

                <div className="relative">

                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={
                      handleChange
                    }
                    placeholder="Enter year"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 dark:text-white outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
                  />
                </div>
              </div>

              {/* BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary-500/20 transition-all active:scale-[0.98] disabled:opacity-70"
              >

                <Plus className="w-4 h-4" />

                {loading
                  ? "Adding Book..."
                  : "Add Book"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}