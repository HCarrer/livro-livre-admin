import { db } from "+/authentication/firebase";
import { IBook } from "@/interfaces/fireStore";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const getBookByFields = async (
  title: string,
  author: string,
  publisher: string,
): Promise<IBook | null> => {
  try {
    const bookDocRef = collection(db, "books");
    const q = query(
      bookDocRef,
      where("title", "==", title.toLowerCase()),
      where("author", "==", author.toLowerCase()),
      where("publisher", "==", publisher.toLowerCase()),
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return null;
    }
    const book = querySnapshot.docs[0].data();
    return {
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      releaseDate: book.releaseDate,
      cover: book.cover,
    };
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
};

export const getBookById = async (docId: string): Promise<IBook | null> => {
  try {
    const bookDocRef = doc(db, "books", docId);
    const querySnapshot = await getDoc(bookDocRef);
    if (!querySnapshot.exists()) {
      return null;
    }
    const book = querySnapshot.data();
    return {
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      releaseDate: book.releaseDate,
      cover: book.cover,
    };
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
};
