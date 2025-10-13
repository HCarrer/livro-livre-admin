import { auth, db } from "+/authentication/firebase";
import NavBar from "@/components/common/NavBar";
import { PROFILE } from "@/constants/routes";
import { ToastProvider } from "@/contexts/toast";
import { IUser } from "@/interfaces/fireStore";
import "@/styles/globals.css";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Bell } from "lucide-react";
import type { AppProps } from "next/app";
import { Niramit } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Skeleton from "@/components/common/Skeleton";
import { useRouter } from "next/router";

const niramit = Niramit({
  subsets: ["latin"],
  weight: ["400"], // font weight padrão. Pode ser sobrescrito
});

export default function App({ Component, pageProps }: AppProps) {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [loadingUserData, setLoadingUserData] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const data = userDocSnapshot.data() as IUser;
          setUserData(data);
          setLoadingUserData(false);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <main className={niramit.className}>
      {router.pathname.includes("/public") ? (
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      ) : (
        <Skeleton position="top">
          <div className="mb-4 w-full flex justify-between items-center">
            <div className="flex flex-col text-navy-blue">
              <p className="text-f2 font-bold">
                Oi,{" "}
                {loadingUserData
                  ? "..."
                  : (userData?.name?.split(" ")[0] ?? "Usuário")}
              </p>
              <p className="text-f6 font-medium">Bem vindo de volta</p>
            </div>
            <div className="flex items-center gap-x-2 w-fit rounded-full bg-soft-white p-1 drop-shadow-[0px_0px_10px_#00000020]">
              {/* TODO: so mostrar se tiver notificacoes */}
              <div className="relative flex justify-center items-center w-11 aspect-square rounded-full">
                <div className="absolute top-1.5 right-1.5 w-2 aspect-square rounded-full bg-power-blue animate-ping" />
                <div className="absolute top-1.5 right-1.5 w-2 aspect-square rounded-full bg-power-blue" />
                <Bell size={28} strokeWidth={2} className="text-navy-blue" />
              </div>
              <Link
                href={PROFILE}
                className="flex justify-center items-center w-11 aspect-square rounded-full bg-navy-blue"
              >
                {!loadingUserData && userData?.profilePicture ? (
                  <Image
                    src={userData.profilePicture}
                    alt="Foto de perfil"
                    className="w-full h-full object-cover rounded-full"
                    width={44}
                    height={44}
                    style={{ borderRadius: "9999px", objectFit: "cover" }}
                  />
                ) : (
                  <p className="text-white font-semibold text-f4 !leading-[20px]">
                    {userData?.name ? userData.name.charAt(0) : "U"}
                  </p>
                )}
              </Link>
            </div>
          </div>
          <ToastProvider>
            <Component {...pageProps} />
          </ToastProvider>
          <NavBar />
        </Skeleton>
      )}
    </main>
  );
}
