import { auth, db } from "+/authentication/firebase";
import { IBook } from "@/components/pages/home/rent-modal-steps/BookConfirmationStep";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
  serverTimestamp,
} from "firebase/firestore";

export const rentBook = async (
  book: IBook,
  rentLocation: string,
): Promise<{ success: boolean; status: number }> => {
  try {
    const user = auth.currentUser;
    if (!user) return { success: false, status: 401 };

    const { title, author, publisher } = book;
    if (!title || !author || !publisher) return { success: false, status: 400 };

    const bookDocRef = collection(db, "books");
    const q = query(
      bookDocRef,
      where("title", "==", title.trim().toLowerCase()),
      where("author", "==", author.trim().toLowerCase()),
      where("publisher", "==", publisher.trim().toLowerCase()),
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return { success: false, status: 404 };

    const bookId = querySnapshot.docs[0].id;

    const rentCollection = collection(db, "rents");
    const rentQuery = query(
      rentCollection,
      where("book", "==", bookId),
      where("user", "==", user.uid),
      where("returnedAt", "==", null),
    );
    const rentQueryResult = await getDocs(rentQuery);
    if (!rentQueryResult.empty) return { success: false, status: 409 };

    const rentDocRef = doc(rentCollection);
    await setDoc(rentDocRef, {
      user: user.uid,
      book: bookId,
      rentAt: serverTimestamp(),
      rentLocation,
      returnedAt: null,
      returnLocation: null,
    });

    return { success: true, status: 200 };
  } catch (error) {
    console.error("Error renting book: ", error);
    return { success: false, status: 500 };
  }
};
