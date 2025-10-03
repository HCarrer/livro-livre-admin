import { auth, db } from "+/authentication/firebase";
import { IBook } from "@/components/pages/home/rent-modal-steps/BookConfirmationStep";
import { GoogleAuthProvider } from "firebase/auth/cordova";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { getBookByFields } from "./books";

export const rentBook = async (
  book: IBook,
): Promise<{
  success: boolean;
  status: number;
}> => {
  try {
    const user = auth.currentUser;
    if (!user) return { success: false, status: 404 };
    const { title, author, publisher } = book;
    const bookDocRef = collection(db, "books");
    const q = query(
      bookDocRef,
      where("title", "==", title.toLowerCase()),
      where("author", "==", author.toLowerCase()),
      where("publisher", "==", publisher.toLowerCase()),
    );
    const querySnapshot = await getDocs(q);
    const bookId = querySnapshot.docs[0].id;
    if (!bookId) return { success: false, status: 404 };

    const rentCollection = collection(db, "rents");

    // busca pelo aluguel
    const rentQuery = query(
      rentCollection,
      where("book", "==", bookId),
      where("user", "==", user.uid),
      where("returnedAt", "==", null),
    );
    const rentQueryResult = (await getDocs(rentQuery)).docs;
    // se encontrar aluguel, ve se ja foi entregue
    if (rentQueryResult.length) {
      const rentPending = rentQueryResult[0].exists();
      if (rentPending) return { success: false, status: 401 };
    }

    const rentDocRef = doc(rentCollection);
    await setDoc(rentDocRef, {
      user: user.uid,
      book: bookId,
      rentAt: new Date(),
      rentLocation: "geolocalização 1",
      returnedAt: null,
      returnLocation: null,
      // Adicione outros campos padrão conforme necessário
    });
    return { success: true, status: 200 };
  } catch (error) {
    console.error("Error logging in with Google: ", error);
    return {
      success: false,
      status: 500,
    };
  }
};
