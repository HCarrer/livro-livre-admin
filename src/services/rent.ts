import { auth, db } from "+/authentication/firebase";
import { getNearestShelf } from "@/helpers/geoLocation";
import { IRentHistoryFacets } from "@/interfaces/facets";
import { IBook, IRent } from "@/interfaces/fireStore";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
  serverTimestamp,
  getDoc,
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
    console.error("Error renting book:", error);
    return {
      success: false,
      status: 500,
      message: "An unexpected error occurred while renting the book.",
    };
  }
};

export const getRentHistoryFacets = async (): Promise<{
  success: boolean;
  status: number;
  facets: IRentHistoryFacets;
}> => {
  try {
    const user = auth.currentUser;
    if (!user || !user.email)
      return {
        success: false,
        status: 401,
        facets: { total: 0, pending: 0, returned: 0, score: 0 },
      };

    const rentCollection = collection(db, "rents");
    const rentQuery = query(rentCollection, where("user", "==", user.email));
    const rentQueryResult = await getDocs(rentQuery);
    const total = rentQueryResult.size;
    const pending = rentQueryResult.docs.filter(
      (doc) => doc.data().status === "pendingReturn",
    ).length;
    const returned = total - pending;

    return {
      success: true,
      status: 200,
      facets: { total, pending, returned, score: total > 0 ? (returned / total) * 100 : 0 },
    };
  } catch (error) {
    console.error("Error fetching rent history facets:", error);
    return {
      success: false,
      status: 500,
      facets: { total: 0, pending: 0, returned: 0, score: 0 },
    };
  }
};

export const listPendingReturns = async (): Promise<{
  success: boolean;
  status: number;
  books: (IBook & { rentId: string })[];
}> => {
  try {
    const user = auth.currentUser;
    if (!user || !user.email)
      return {
        success: false,
        status: 401,
        books: [],
      };

    const rentCollection = collection(db, "rents");
    const rentQuery = query(rentCollection, where("user", "==", user.email));
    const rentQueryResult = await getDocs(rentQuery);
    const pendingRentDocs = rentQueryResult.docs.filter(
      (docSnapshot) => docSnapshot.data().status === "pendingReturn",
    );

    // 3) For each pending rent, fetch the corresponding book document
    const pendingBooks: (IBook & { rentId: string })[] = [];

    for (const rentDoc of pendingRentDocs) {
      const rentData = rentDoc.data();

      // rentData.book contains the ID of the matching book doc
      const bookId = rentData.book;
      if (!bookId) continue;

      // rentId here is the ID of the rent doc itself
      const rentId = rentDoc.id;

      const bookRef = doc(db, "books", bookId);
      const bookSnap = await getDoc(bookRef);

      if (bookSnap.exists()) {
        const bookData = bookSnap.data() as IBook;
        pendingBooks.push({
          ...bookData,
          rentId,
        });
      }
    }

    return {
      success: true,
      status: 200,
      books: pendingBooks,
    };
  } catch (error) {
    console.error("Error fetching rent history facets:", error);
    return {
      success: false,
      status: 500,
      books: [],
    };
  }
};
