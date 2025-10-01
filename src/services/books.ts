import { db } from "+/authentication/firebase";
import { IBook } from "@/components/pages/home/rent-modal-steps/BookConfirmationStep";
import { collection, getDocs, query, where } from "firebase/firestore";

export const getBook = async (
  title: string,
  author: string,
  publisher: string,
): Promise<IBook | null> => {
  try {
    const bookDocRef = collection(db, "books");
    const q = query(
      bookDocRef,
      where("title", "==", title.toLocaleLowerCase()),
      where("author", "==", author.toLocaleLowerCase()),
      where("publisher", "==", publisher.toLocaleLowerCase()),
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: unknown) {
    return null;
  }
};
