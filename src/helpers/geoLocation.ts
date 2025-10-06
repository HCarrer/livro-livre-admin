import { db } from "+/authentication/firebase";
import { IBookShelf } from "@/interfaces/fireStore";
import { collection, getDocs } from "firebase/firestore";

export const getDistanceInMeters = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  const R = 6371000; // Earth radius in meters
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const getNearestShelf = async (
  userLat: number,
  userLng: number,
): Promise<(IBookShelf & { id: string; distance: number }) | null> => {
  const shelvesRef = collection(db, "bookshelves");
  const snapshot = await getDocs(shelvesRef);

  let nearest: (IBookShelf & { id: string; distance: number }) | null = null;
  let minDistance = Infinity; // distancia minima para o match em metros (mudar depois)

  snapshot.forEach((doc) => {
    const data = doc.data();
    if (data.location) {
      const dist = getDistanceInMeters(
        userLat,
        userLng,
        data.location.latitude,
        data.location.longitude,
      );

      if (dist < minDistance) {
        minDistance = dist;
        nearest = {
          alias: data.alias,
          location: data.location,
          creationDate: data.creationDate,
          id: doc.id,
          distance: dist,
        };
      }
    }
  });

  return nearest;
};
