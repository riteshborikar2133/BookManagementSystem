// src/services/bookService.ts

import axiosInstance from "../api/axiosInstance";
import type { Book } from "../types/book";

/* ================= GET ALL BOOKS ================= */

export const getBooks = async (): Promise<Book[]> => {
  const response = await axiosInstance.get("/");

  return response.data;
};

/* ================= GET BOOK BY ID ================= */

export const getBookById = async (id: string): Promise<Book> => {
  const response = await axiosInstance.get(`/${id}`);

  return response.data;
};

/* ================= ADD BOOK ================= */

export const addBook = async (book: Book): Promise<Book> => {
  const response = await axiosInstance.post("/", book);

  return response.data;
};

/* ================= UPDATE BOOK ================= */

export const updateBook = async (id: string, book: Book): Promise<Book> => {
  const response = await axiosInstance.put(`/${id}`, book);

  return response.data;
};

/* ================= DELETE BOOK ================= */

export const deleteBook = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/${id}`);
};
