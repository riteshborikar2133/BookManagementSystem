// src/pages/Books/ExploreBooksPage.tsx

import { useEffect, useMemo, useState } from "react";

import { Search, Grid2X2, List, BookOpen, Star, Bookmark } from "lucide-react";

import { getBooks } from "../../services/bookService";

import type { Book } from "../../types/book";
import BookDetailsModal from "../../components/books/BookDetailsModal";

export default function ExploreBooksPage() {
  const [booksData, setBooksData] = useState<Book[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [genre, setGenre] = useState("All");

  const [view, setView] = useState<"grid" | "list">("grid");

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  /* ================= FETCH BOOKS ================= */

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();

        setBooksData(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  /* ================= GENRES ================= */

  const genres = useMemo(() => {
    return ["All", ...Array.from(new Set(booksData.map((book) => book.genre)))];
  }, [booksData]);

  /* ================= FILTERED BOOKS ================= */

  const filteredBooks = useMemo(() => {
    return booksData.filter((book) => {
      const matchesSearch = book.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesGenre = genre === "All" || book.genre === genre;

      return matchesSearch && matchesGenre;
    });
  }, [booksData, search, genre]);

  /* ================= VIEW MODAL ================= */

  const handleOpenModal = (book: Book) => {
    setSelectedBook(book);

    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

    setSelectedBook(null);
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-slate-500 dark:text-slate-400 font-medium">
          Loading books...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-1 transition-colors duration-300">
      {/* ================= HEADER & FILTERS ================= */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 pb-2 border-b border-slate-100 dark:border-slate-900">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Explore Books
          </h1>

          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium">
            Browse and explore your complete book collection.
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
          {/* Search Box */}

          <div className="relative w-full sm:w-64 md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

            <input
              type="text"
              placeholder="Search books..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-sm dark:text-white outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 focus:bg-white dark:focus:bg-slate-950 transition-all placeholder-slate-400 font-medium"
            />
          </div>

          {/* Genre Filter */}

          <div className="relative w-full sm:w-auto">
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full sm:w-44 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-sm font-semibold text-slate-700 dark:text-slate-300 outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 cursor-pointer transition-all appearance-none"
            >
              {genres.map((item) => (
                <option key={item} value={item} className="dark:bg-slate-900">
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* View Toggle Layout Switch */}

          <div className="flex items-center bg-slate-100 dark:bg-slate-900 rounded-xl p-1 border border-slate-200/20">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-lg transition-all cursor-pointer ${
                view === "grid"
                  ? "bg-white dark:bg-slate-800 text-primary-500 shadow-sm"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
              title="Grid view"
            >
              <Grid2X2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-lg transition-all cursor-pointer ${
                view === "list"
                  ? "bg-white dark:bg-slate-800 text-primary-500 shadow-sm"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
              title="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ================= BOOKS RENDERING ================= */}

      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
        }
      >
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className={`group rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-950/40 hover:border-primary-500/30 dark:hover:border-primary-500/30 hover:shadow-xl hover:shadow-slate-100/50 dark:hover:shadow-none hover:-translate-y-0.5 transition-all duration-300 overflow-hidden ${
              view === "list"
                ? "flex items-center gap-6 p-4 md:p-5"
                : "flex flex-col p-5"
            }`}
          >
            {/* Cover Mock Placeholder */}

            <div
              className={`rounded-xl bg-gradient-to-br from-primary-500/5 to-secondary-500/5 dark:from-primary-500/10 dark:to-secondary-500/5 flex items-center justify-center border border-slate-100 dark:border-slate-900/60 shrink-0 group-hover:from-primary-500/10 group-hover:to-secondary-500/10 transition-colors ${
                view === "grid"
                  ? "h-48 w-full mb-5"
                  : "w-20 h-20 md:w-24 md:h-24"
              }`}
            >
              <BookOpen className="w-8 h-8 text-primary-500 stroke-[1.5]" />
            </div>

            {/* Core Card Context Body */}

            <div className="flex-1 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="inline-flex px-2.5 py-0.5 rounded-md bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-bold tracking-wide uppercase">
                    {book.genre}
                  </span>

                  <div className="flex items-center gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-md text-xs font-bold">
                    <Star className="w-3 h-3 fill-current" />
                    4.5
                  </div>
                </div>

                <h2 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-primary-500 transition-colors">
                  {book.title}
                </h2>

                <p className="text-slate-400 dark:text-slate-500 text-sm font-medium mt-0.5">
                  by{" "}
                  <span className="text-slate-600 dark:text-slate-400 font-semibold">
                    {book.author}
                  </span>
                </p>

                <p className="text-xs text-slate-400 mt-2">
                  Published: {book.year}
                </p>
              </div>

              {/* Action Toolbar */}

              <div
                className={`flex items-center gap-2 ${
                  view === "grid" ? "mt-5" : "mt-3 md:mt-0 ml-auto sm:ml-0"
                }`}
              >
                <button
                  onClick={() => handleOpenModal(book)}
                  className="flex-1 px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 text-white font-semibold rounded-xl text-xs transition-all cursor-pointer active:scale-[0.98]"
                >
                  View Details
                </button>

                <button
                  className="p-2 border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-primary-500 hover:border-primary-500/30 dark:hover:bg-slate-900 rounded-xl transition-all cursor-pointer active:scale-[0.95]"
                  title="Bookmark item"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= VACANT EMPTY STATE ================= */}

      {filteredBooks.length === 0 && (
        <div className="py-24 text-center max-w-sm mx-auto animate-fadeIn">
          <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center mx-auto border border-slate-100 dark:border-slate-800">
            <BookOpen className="w-7 h-7 text-slate-300 dark:text-slate-600" />
          </div>

          <h3 className="text-lg font-bold mt-5 text-slate-900 dark:text-white">
            No matching books found
          </h3>

          <p className="text-sm text-slate-400 dark:text-slate-500 mt-1 font-medium">
            We couldn't find anything matching your search criteria. Try
            modifying your filters.
          </p>
        </div>
      )}

      <BookDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        book={selectedBook}
      />
    </div>
  );
}
