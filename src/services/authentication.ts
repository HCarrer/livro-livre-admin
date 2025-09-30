import { auth, db } from "+/authentication/firebase";
import { SIGN_UP_TOAST_DICT } from "@/constants/forms/cadastro";
import { LOGIN_TOAST_DICT } from "@/constants/forms/login";
import { BOOLEAN_QUERY, LOGIN } from "@/constants/routes";
import axios from "axios";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export const loginWithGoogle = async (): Promise<{
  success: boolean;
  status: number;
  toastId: keyof typeof LOGIN_TOAST_DICT;
}> => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const token = user ? await user.getIdToken() : null;
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      if (!userDocSnapshot.exists()) {
        await setDoc(userDocRef, {
          email: user.email,
          name: user.displayName,
          profilePicture: user.photoURL,
          createdAt: new Date(),
          token: token,
          hasClosedWelcomeBanner: false,
          updatedAt: new Date(),
          // Adicione outros campos padrão conforme necessário
        });
      }
    }
    await axios.post("/api/session", { token: token });
    return { success: true, status: 200, toastId: "success" };
  } catch (error) {
    return {
      success: false,
      status: 500,
      toastId: `Error logging in with Google: ${error}`,
    };
  }
};

export const login = async (
  username: string,
  password: string,
): Promise<{
  success: boolean;
  status: number;
  toastId: keyof typeof LOGIN_TOAST_DICT;
}> => {
  try {
    const userDocRef = collection(db, "users");
    const q = query(userDocRef, where("name", "==", username));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return {
        success: false,
        status: 401,
        toastId: "username-or-password-incorrect",
      };
    }
    const email = querySnapshot.docs[0].data().email;
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const token = userCredential.user
      ? await userCredential.user.getIdToken()
      : null;
    await axios.post("/api/session", { token: token });
    return { success: true, status: 200, toastId: "success" };
  } catch (error: unknown) {
    if (
      error instanceof FirebaseError &&
      error.code === "auth/invalid-credential"
    )
      return {
        success: false,
        status: 401,
        toastId: "username-or-password-incorrect",
      };
    return {
      success: false,
      status: 500,
      toastId: "bad-request",
    };
  }
};

export const createAccount = async (
  email: string,
  password: string,
  username: string,
): Promise<{
  success: boolean;
  status: number;
  toastId: keyof typeof SIGN_UP_TOAST_DICT;
}> => {
  try {
    const userDocRef = collection(db, "users");
    const q = query(userDocRef, where("name", "==", username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return { success: false, status: 409, toastId: "username-unavailable" };
    }
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    const token = user ? await user.getIdToken() : null;
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      if (!userDocSnapshot.exists()) {
        await setDoc(userDocRef, {
          email: email,
          name: username,
          profilePicture: "",
          createdAt: new Date(),
          token: token,
          hasClosedWelcomeBanner: false,
          updatedAt: new Date(),
        });
      }
    }
    await axios.post("/api/session", { token: token });
    return {
      success: true,
      status: 200,
      toastId: "success",
    };
  } catch (error: unknown) {
    if (
      error instanceof FirebaseError &&
      error.code === "auth/email-already-in-use"
    )
      return { success: false, status: 409, toastId: "email-unavailable" };
    return { success: false, status: 500, toastId: "bad-request" };
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    await axios.post("/api/clear-auth");
    return { success: true, status: 200, toastId: "success" };
  } catch (error) {
    console.log("Error signing out: ", error);
    return { success: false, status: 500, toastId: "bad-request" };
  }
};
