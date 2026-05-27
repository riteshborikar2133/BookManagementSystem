# BookMS 📚

A modern **Book Management System** built using **React + TypeScript + Tailwind CSS + Zustand + JSON Server**.

BookMS allows users to:

- Explore books
- Manage book collections
- Add / Edit / Delete books
- View detailed book information
- Read community reviews/comments
- Login authentication (mock)
- Dark / Light theme support

---

# 🚀 Tech Stack

- React
- TypeScript
- Tailwind CSS v4
- React Router DOM
- Zustand
- Axios
- Lucide React Icons
- JSON Server (Mock Backend)

---

# ✨ Features

## Public Features

- Landing Page
- Explore Books Page
- Public Explore Layout
- Dark / Light Theme Toggle
- Responsive UI

## Authentication

- Mock Login System
- Protected Routes
- Zustand Auth Store

## Book Management

- View Books
- Add Books
- Edit Books
- Delete Books
- Search & Filter Books
- Grid/List View

## Book Details Modal

- Book Information
- Rating Display
- Community Comments
- Review Section

---

# 📂 Project Structure

```bash
src/
│
├── api/
│   └── axiosInstance.ts
│
├── components/
│   ├── books/
│   │   ├── AddBookModal.tsx
│   │   ├── EditBookModal.tsx
│   │   ├── DeleteBookModal.tsx
│   │   └── BookDetailsModal.tsx
│
├── layout/
│   ├── MainLayout.tsx
│   └── PublicLayout.tsx
│
├── pages/
│   ├── Landing/
│   ├── Auth/
│   └── Books/
│
├── services/
│   ├── authService.ts
│   └── bookService.ts
│
├── store/
│   ├── useAuthStore.ts
│   └── useThemeStore.ts
│
├── types/
│   ├── book.ts
│   ├── user.ts
│   └── comment.ts
│
└── App.tsx
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone <your-repository-url>
cd book-management-system
```

## 2️⃣ Install Dependencies

```bash
npm install
```

## 3️⃣ Start JSON Server

Create a `db.json` file in the root directory.

Run:

```bash
npx json-server --watch db.json --port 3000
```

Backend will run on:

```bash
http://localhost:3000
```

## 4️⃣ Start React App

```bash
npm run dev
```

Frontend will run on:

```bash
http://localhost:5173
```

---

# 🔐 Demo Login Credentials

## Admin

```bash
username: admin
password: admin
```



---

# 🗄️ Mock Database Structure

## Users

```json
{
  "id": "1",
  "name": "Admin User",
  "username": "admin",
  "email": "admin@bookms.com",
  "password": "admin",
  "role": "admin"
}
```

## Books

```json
{
  "id": "1",
  "title": "Atomic Habits",
  "author": "James Clear",
  "genre": "Self Help",
  "year": 2018,
  "rating": 4.8,
  "description": "A practical guide...",
  "image": "book-image-url",
  "comments": []
}
```

## Comments

```json
{
  "id": "1",
  "bookId": "1",
  "userId": "2",
  "username": "Ritesh Borikar",
  "comment": "Amazing book!",
  "rating": 5,
  "createdAt": "2026-05-20T10:30:00Z"
}
```

---

# 🔗 API Endpoints

## Books

| Method | Endpoint   |
| ------ | ---------- |
| GET    | /books     |
| GET    | /books/:id |
| POST   | /books     |
| PUT    | /books/:id |
| DELETE | /books/:id |

## Users

| Method | Endpoint |
| ------ | -------- |
| GET    | /users   |

---

# 🎨 UI Highlights

- Fully Responsive
- Modern Dashboard UI
- Animated Modals
- Elegant Dark Theme
- Smooth Hover Effects
- Glassmorphism Inspired Design

---

# 🔒 Protected Routes

Authenticated routes:

```bash
/books
/manage
```

Public routes:

```bash
/
/login
/explore
```

---

# 🧠 Zustand Stores

## Theme Store

Handles:

- Dark mode
- Theme toggling

## Auth Store

Handles:

- Login state
- User session
- Authentication checks

---

# 📸 Main Components

## AddBookModal

Used to create new books.

## EditBookModal

Used to update existing books.

## DeleteBookModal

Confirmation modal before deleting a book.

## BookDetailsModal

Displays:

- Book info
- Description
- Reviews
- Ratings

---

# 🛠️ Future Improvements

- Real Backend Integration
- JWT Authentication
- Pagination
- Book Categories
- Wishlist System
- Borrowing System
- Review Submission
- Image Upload Support
- Admin Dashboard Analytics

---

# 👨‍💻 Author

Developed by **Ritesh Borikar**

Skills:

- React
- TypeScript
- MERN Stack
- UI/UX
- Tailwind CSS
- Zustand

---

# 📄 License

This project is for learning and portfolio purposes.
