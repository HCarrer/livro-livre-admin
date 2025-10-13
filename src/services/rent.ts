import { auth, db } from "+/authentication/firebase";
import { getNearestShelf } from "@/helpers/geoLocation";
import { upperCaseFirstLetter } from "@/helpers/text";
import { IRentHistoryFacets } from "@/interfaces/facets";
import { IBook, IBookShelf, IRent } from "@/interfaces/fireStore";
import { IRentHistory } from "@/interfaces/rent";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
  serverTimestamp,
  getDoc,
  Timestamp,
  orderBy,
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
      facets: {
        total,
        pending,
        returned,
        score: total > 0 ? (returned / total) * 100 : 0,
      },
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

export const getRentHistory = async (
  filters: IRentHistory["status"][],
): Promise<{
  success: boolean;
  status: number;
  history: IRentHistory[];
}> => {
  try {
    const user = auth.currentUser;
    if (!user || !user.email)
      return {
        success: false,
        status: 401,
        history: [],
      };

    const rentCollection = collection(db, "rents");
    let rentQuery;
    if (filters.length) {
      rentQuery = query(
        rentCollection,
        where("user", "==", user.email),
        where("status", "in", filters),
        orderBy("rentAt", "desc"),
      );
    } else {
      rentQuery = query(
        rentCollection,
        where("user", "==", user.email),
        orderBy("rentAt", "desc"),
      );
    }
    const rentQueryResult = await getDocs(rentQuery);
    const rents = rentQueryResult.docs;

    const historyPromises = rents.map(async (rentDoc) => {
      const rentData = rentDoc.data() as IRent;
      const bookRef = doc(db, "books", rentData.book);
      const bookSnap = await getDoc(bookRef);
      const bookData = bookSnap.exists() ? (bookSnap.data() as IBook) : null;

      if (!bookData) return null;

      return {
        book: bookData,
        rentAt: (rentData.rentAt as Timestamp)
          .toDate()
          .toLocaleDateString("pt-BR"),
        rentShelf: rentData.rentShelf,
        returnedAt: rentData.returnedAt
          ? (rentData.returnedAt as Timestamp)
              .toDate()
              .toLocaleDateString("pt-BR")
          : null,
        returnShelf: rentData.returnShelf,
        status: rentData.status,
      } as IRentHistory;
    });

    const historyResults = await Promise.all(historyPromises);
    const history = historyResults.filter(
      (entry): entry is IRentHistory => entry !== null,
    );

    const upperCasedHistory = history.map((h) => ({
      ...h,
      book: { ...h.book, title: upperCaseFirstLetter(h.book.title) },
    }));

    return {
      success: true,
      status: 200,
      history: upperCasedHistory,
    };
  } catch (error) {
    console.error("Error fetching rent history:", error);
    return {
      success: false,
      status: 500,
      history: [],
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

    const pendingBooks: (IBook & { rentId: string })[] = [];

    const bookFetchPromises = pendingRentDocs.map((rentDoc) => {
      const rentData = rentDoc.data();
      const bookId = rentData.book;
      if (!bookId) return Promise.resolve(null);
      const rentId = rentDoc.id;
      const bookRef = doc(db, "books", bookId);
      return getDoc(bookRef).then((bookSnap) => {
        if (bookSnap.exists()) {
          const bookData = bookSnap.data() as IBook;
          return {
            ...bookData,
            rentId,
          };
        }
        return null;
      });
    });
    const bookResults = await Promise.all(bookFetchPromises);
    for (const book of bookResults) {
      if (book) pendingBooks.push(book);
    }

    return {
      success: true,
      status: 200,
      books: pendingBooks,
    };
  } catch (error) {
    console.error("Error listing pending returns:", error);
    return {
      success: false,
      status: 500,
      books: [],
    };
  }
};

export const returnBook = async (
  book: IBook,
  shelf: IBookShelf,
): Promise<{ success: boolean; status: number; message: string }> => {
  try {
    const user = auth.currentUser;
    if (!user || !user.email)
      return {
        success: false,
        status: 401,
        message: "User not authenticated",
      };

    const bookDocRef = collection(db, "books");
    const q = query(
      bookDocRef,
      where("title", "==", book.title.toLowerCase()),
      where("author", "==", book.author.toLowerCase()),
      where("publisher", "==", book.publisher.toLowerCase()),
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty)
      return { success: false, status: 404, message: "Book not found" };

    const foundBook = querySnapshot.docs[0];
    const bookId = foundBook.id;

    const bookshelvesDocRef = collection(db, "bookshelves");
    const bookshelvesQuery = query(
      bookshelvesDocRef,
      where("alias", "==", shelf.alias),
      where("creationDate", "==", shelf.creationDate),
      where("location", "==", shelf.location),
    );
    const bookshelvesQuerySnapshot = await getDocs(bookshelvesQuery);
    if (bookshelvesQuerySnapshot.empty)
      return { success: false, status: 404, message: "Bookshelf not found" };

    const foundShelf = bookshelvesQuerySnapshot.docs[0];
    const shelfId = foundShelf.id;

    const rentCollection = collection(db, "rents");
    const rentQuery = query(
      rentCollection,
      where("status", "==", "pendingReturn"),
      where("user", "==", user.email),
      where("book", "==", bookId),
      where("bookName", "==", book.title),
    );
    const rentQueryResult = await getDocs(rentQuery);
    if (rentQueryResult.empty)
      return {
        success: false,
        status: 404,
        message: "No pending rent found for this book and user",
      };

    const rentDoc = rentQueryResult.docs[0];
    const rentDocRef = doc(db, "rents", rentDoc.id);
    await setDoc(
      rentDocRef,
      {
        returnedAt: serverTimestamp(),
        returnShelf: shelfId,
        status: "returned",
      },
      { merge: true },
    );

    return {
      success: true,
      status: 200,
      message: "Book returned successfully",
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: `An unexpected error occurred while returning the book: ${error}`,
    };
  }
};
