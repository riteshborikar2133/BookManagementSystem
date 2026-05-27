import { Trash2, X } from "lucide-react";
import type { Book } from "../../types/book";
import { deleteBook } from "../../services/bookService";

interface DeleteBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book | null;
  refreshBooks: () => void;
}

export default function DeleteBookModal({
  isOpen,
  onClose,
  book,
  refreshBooks,
}: DeleteBookModalProps) {
  if (!isOpen || !book) return null;

  const handleDelete = async () => {
    try {
      await deleteBook(book.id!);

      refreshBooks();
      onClose();
    } catch (error) {
      console.error("Failed to delete book:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-all"
        >
          <X className="w-5 h-5 text-slate-500" />
        </button>

        <div className="p-8 text-center">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-5">
            <Trash2 className="w-8 h-8 text-red-500" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Delete Book
          </h2>

          {/* Description */}
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Are you sure you want to permanently delete
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {" "}
              "{book.title}"
            </span>
            ? This action cannot be undone.
          </p>

          {/* Actions */}
          <div className="mt-8 flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-100 dark:hover:bg-slate-900 transition-all"
            >
              Cancel
            </button>

            <button
              onClick={handleDelete}
              className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold shadow-lg shadow-red-500/20 transition-all active:scale-[0.98]"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
