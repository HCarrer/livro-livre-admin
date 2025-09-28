import Accordion from "@/components/common/Accordion";
import NavBar from "@/components/common/NavBar";
import Skeleton from "@/components/common/Skeleton";
import UserScore from "@/components/common/UserScore";
import WelcomeBanner from "@/components/common/WelcomeBanner";
import RentComponent from "@/components/pages/home/RentComponent";
import { ACCORDIONS } from "@/constants/accordions";
import { RETURN_BUTTON_LABEL } from "@/constants/common";
import Button from "@/design-system/button";
import { onAuthStateChanged } from "firebase/auth";
import { Bell, Icon, LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { auth, db } from "+/authentication/firebase";
import { User } from "@/interfaces/user";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";

const Home = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const data = userDocSnapshot.data() as User;
          setUserData(data);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading)
    return (
      <Skeleton position="top">
        <div className="h-screen w-full flex justify-center items-center">
          <LoaderIcon className="animate-spin text-navy-blue" size={48} />
        </div>
      </Skeleton>
    );

  return (
    <Skeleton position="top">
      <div className="w-full flex flex-col gap-y-6">
        <div className="w-full flex justify-between items-center">
          <div className="flex flex-col text-navy-blue">
            <p className="text-f2 font-bold">
              Oi, {userData?.name?.split(" ")[0]}
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
            <div className="flex justify-center items-center w-11 aspect-square rounded-full bg-navy-blue">
              {userData?.profilePicture ? (
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
            </div>
          </div>
        </div>
        {/* TODO: so mostrar no primeiro acesso do usuário */}
        {!userData?.hasClosedWelcomeBanner ? <WelcomeBanner /> : null}
        <UserScore booksRead={10} booksToReturn={5} />
        <div className="w-full flex flex-col gap-y-4 p-5 bg-soft-white rounded-[20px] drop-shadow-[0px_0px_10px_#00000020]">
          {/* TODO: deixar botoes funcionais */}
          <RentComponent />
          <Button
            variant="secondary"
            className="w-full"
            label={RETURN_BUTTON_LABEL}
            type="button"
          />
        </div>
        <div className="flex flex-col gap-6">
          {ACCORDIONS.map((item, index) => (
            <Accordion key={index} title={item.title} content={item.content} />
          ))}
        </div>
      </div>
      <NavBar />
    </Skeleton>
  );
};

export default Home;
