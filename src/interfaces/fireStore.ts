import { FieldValue, Timestamp } from "firebase/firestore";

export interface IUser {
  email: string | null;
  name: string | null;
  profilePicture: string | null;
  token: string | null;
  hasClosedWelcomeBanner: boolean;
  createdAt: Timestamp | FieldValue | null;
  updatedAt: Timestamp | FieldValue | null;
}

export interface IBook {
  title: string;
  author: string;
  publisher: string;
  releaseDate: number;
  cover: string;
}

export interface IBookShelf {
  alias: string;
  creationDate: Timestamp;
  location: GeolocationCoordinates;
}

export interface IRent {
  user: string;
  book: string;
  bookName: string;
  rentAt: Timestamp | FieldValue;
  rentShelf: string;
  returnedAt: Timestamp | FieldValue | null;
  returnShelf: string | null;
  status: "pendingReturn" | "returned";
}
