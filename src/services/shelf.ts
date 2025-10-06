import { db } from "+/authentication/firebase";
import { IBookShelf } from "@/interfaces/fireStore";
import { doc, getDoc } from "firebase/firestore";

export const getShelfById = async (
  docId: string,
): Promise<IBookShelf | null> => {
  try {
    const bookshelfDocRef = doc(db, "bookshelves", docId);
    const querySnapshot = await getDoc(bookshelfDocRef);
    if (!querySnapshot.exists()) {
      return null;
    }
    const bookshelf = querySnapshot.data();
    const { alias, location, creationDate } = bookshelf;
    return {
      alias,
      location,
      creationDate,
    };
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
};
