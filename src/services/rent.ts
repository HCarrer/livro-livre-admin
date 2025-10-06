import { auth, db } from "+/authentication/firebase";
import { getNearestShelf } from "@/helpers/geoLocation";
import { IBook, IRent } from "@/interfaces/fireStore";
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
  rentLocation: GeolocationCoordinates,
): Promise<{ success: boolean; status: number; message: string }> => {
  try {
    const user = auth.currentUser;
    if (!user || !user.email)
      return { success: false, status: 401, message: "User not authenticated" };

    const { title, author, publisher } = book;
    if (!title || !author || !publisher)
      return { success: false, status: 400, message: "Invalid book data" };

    const bookDocRef = collection(db, "books");
    const q = query(
      bookDocRef,
      where("title", "==", title.toLowerCase()),
      where("author", "==", author.toLowerCase()),
      where("publisher", "==", publisher.toLowerCase()),
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty)
      return { success: false, status: 404, message: "Book not found" };

    const foundBook = querySnapshot.docs[0];
    const bookId = foundBook.id;

    const rentCollection = collection(db, "rents");
    const rentQuery = query(
      rentCollection,
      where("book", "==", bookId),
      where("user", "==", user.email),
      where("status", "==", "pendingReturn"),
    );
    const rentQueryResult = await getDocs(rentQuery);
    if (!rentQueryResult.empty)
      return { success: false, status: 409, message: "Pending book return" };

    const nearestShelf = await getNearestShelf(
      rentLocation.latitude,
      rentLocation.longitude,
    );

    if (!nearestShelf)
      return {
        success: false,
        status: 404,
        message: "No shelf found near the provided location",
      };

    const rentDocRef = doc(rentCollection);
    const rentData: IRent = {
      user: user.email,
      book: bookId,
      bookName: title,
      rentAt: serverTimestamp(),
      rentShelf: nearestShelf.id,
      returnedAt: null,
      returnShelf: null,
      status: "pendingReturn",
    };
    await setDoc(rentDocRef, rentData);

    return { success: true, status: 200, message: "Book rented successfully" };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: `Error renting book: ${error}`,
    };
  }
};
