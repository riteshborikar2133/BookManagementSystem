export interface Comment {
  id: string;
  bookId: string;
  userId: string;
  username: string;
  comment: string;
  rating: number;
  createdAt: string;
}

export interface Book {
  id?: string;
  title: string;
  author: string;
  genre: string;
  year: number;

  rating?: number;
  description?: string;
  image?: string;

  comments?: Comment[];
}
