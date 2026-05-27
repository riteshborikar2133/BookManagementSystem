// src/pages/Books/ManageBooksPage.tsx

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Grid2X2,
  List,
  BookOpen,
  Star,
  Plus,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import type { Book } from "../../types/book";
import { getBooks } from "../../services/bookService";
import BookDetailsModal from "../../components/books/BookDetailsModal";
import AddBookModal from "../../components/books/AddBookModal";
import EditBookModal from "../../components/books/EditBookModal";
import DeleteBookModal from "../../components/books/DeleteBookModal";

export default function ManageBooksPage() {
  const [booksData, setBooksData] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [view, setView] = useState<"grid" | "list">("grid");

  /* ================= DETAILS MODAL ================= */
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  /* ================= ADD MODAL ================= */
  const [isAddOpen, setIsAddOpen] = useState(false);

  /* ================= EDIT MODAL ================= */
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editBook, setEditBook] = useState<Book | null>(null);

  /* ================= DELETE MODAL ================= */
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteBookData, setDeleteBookData] = useState<Book | null>(null);

  /* ================= FETCH BOOKS ================= */
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await getBooks();
      setBooksData(data);
    } catch (error) {
      console.error("Failed to fetch books management dataset:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  /* ================= GENRES ================= */
  const genres = useMemo(() => {
    return ["All", ...Array.from(new Set(booksData.map((book) => book.genre)))];
  }, [booksData]);

  /* ================= FILTERED ================= */
  const filteredBooks = useMemo(() => {
    return booksData.filter((book) => {
      const matchesSearch = book.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesGenre = genre === "All" || book.genre === genre;

      return matchesSearch && matchesGenre;
    });
  }, [booksData, search, genre]);

  /* ================= VIEW BOOK ================= */
  const handleViewBook = (book: Book) => {
    setSelectedBook(book);
    setIsDetailsOpen(true);
  };

  /* ================= EDIT BOOK ================= */
  const handleEditBook = (book: Book) => {
    setEditBook(book);
    setIsEditOpen(true);
  };

  /* ================= DELETE BOOK ================= */
  const handleDeleteBook = (book: Book) => {
    setDeleteBookData(book);
    setIsDeleteOpen(true);
  };

  /* ================= LOADING EMPTY SKELETON ================= */
  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse">
          Loading system database...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-1 transition-colors duration-300">
      {/* ================= HEADER & CONTROL PIPELINE ================= */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 pb-2 border-b border-slate-100 dark:border-slate-900">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Manage Books
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium">
            Add, edit, modify and supervise your global catalog distribution.
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
          {/* Search Field Wrapper */}
          <div className="relative w-full sm:w-64 md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search directory..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-sm dark:text-white outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 focus:bg-white dark:focus:bg-slate-950 transition-all placeholder-slate-400 font-medium"
            />
          </div>

          {/* Genre Selection Form */}
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

          {/* Flexible Presentation View Controls */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-900 rounded-xl p-1 border border-slate-200/20">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-lg transition-all cursor-pointer ${
                view === "grid"
                  ? "bg-white dark:bg-slate-800 text-primary-500 shadow-sm"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
              title="Grid format"
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
              title="List format"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Primary Blueprint Addition Button */}
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 text-sm font-bold transition-all shadow-lg shadow-slate-900/10 active:scale-[0.98] cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            Add Book
          </button>
        </div>
      </div>

      {/* ================= DATA GRID MATRIX RENDERER ================= */}
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
            {/* Visual Book Cover Canvas */}
            <div
              className={`rounded-xl bg-gradient-to-br from-primary-500/5 to-secondary-500/5 dark:from-primary-500/10 dark:to-secondary-500/5 flex items-center justify-center border border-slate-100 dark:border-slate-900/60 shrink-0 group-hover:from-primary-500/10 group-hover:to-secondary-500/10 transition-colors ${
                view === "grid"
                  ? "h-48 w-full mb-5"
                  : "w-20 h-20 md:w-24 md:h-24"
              }`}
            >
              <BookOpen className="w-8 h-8 text-primary-500 stroke-[1.5]" />
            </div>

            {/* Core Card Layout Payload */}
            <div className="flex-1 flex flex-col justify-between h-full min-w-0">
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

                <h2 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-primary-500 transition-colors truncate">
                  {book.title}
                </h2>

                <p className="text-slate-400 dark:text-slate-500 text-sm font-medium mt-0.5 truncate">
                  by{" "}
                  <span className="text-slate-600 dark:text-slate-400 font-semibold">
                    {book.author}
                  </span>
                </p>

                <p className="text-xs text-slate-400 mt-2">
                  Published: {book.year}
                </p>
              </div>

              {/* Management Configuration Action Deck */}
              <div
                className={`flex items-center gap-2 ${
                  view === "grid" ? "mt-5" : "mt-3 md:mt-0 ml-auto sm:ml-0"
                }`}
              >
                {/* View Panel Details Trigger */}
                <button
                  onClick={() => handleViewBook(book)}
                  className="flex items-center justify-center gap-2 flex-1 px-4 py-2 bg-slate-950 hover:bg-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800 text-white rounded-xl text-xs font-semibold transition-all cursor-pointer active:scale-[0.98]"
                >
                  <Eye className="w-4 h-4 stroke-[1.8]" />
                  View
                </button>

                {/* Edit Form Modifier Switch */}
                <button
                  onClick={() => handleEditBook(book)}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-blue-500 hover:border-blue-500/30 dark:hover:bg-blue-500/10 hover:bg-blue-50/50 transition-all cursor-pointer active:scale-[0.95]"
                  title="Modify Entry"
                >
                  <Pencil className="w-4 h-4" />
                </button>

                {/* Destructive Deletion Target Control */}
                <button
                  onClick={() => handleDeleteBook(book)}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-red-500 hover:border-red-500/30 dark:hover:bg-red-500/10 hover:bg-red-50/50 transition-all cursor-pointer active:scale-[0.95]"
                  title="Remove Entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ================= VACANT COMPONENT EMPTY PANELS ================= */}
      {filteredBooks.length === 0 && (
        <div className="py-24 text-center max-w-sm mx-auto animate-fadeIn">
          <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center justify-center mx-auto border border-slate-100 dark:border-slate-800">
            <BookOpen className="w-7 h-7 text-slate-300 dark:text-slate-600" />
          </div>

          <h3 className="text-lg font-bold mt-5 text-slate-900 dark:text-white">
            No matching entities found
          </h3>

          <p className="text-sm text-slate-400 dark:text-slate-500 mt-1 font-medium">
            We couldn't track items aligning with your search metrics. Redefine
            query targets.
          </p>
        </div>
      )}

      {/* ================= OVERLAY WINDOW portals ================= */}
      <BookDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        book={selectedBook}
      />

      <AddBookModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        refreshBooks={fetchBooks}
      />
      <EditBookModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        book={editBook}
        refreshBooks={fetchBooks}
      />
      <DeleteBookModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        book={deleteBookData}
        refreshBooks={fetchBooks}
      />
    </div>
  );
}
