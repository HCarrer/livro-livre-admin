import { auth, db } from "+/authentication/firebase";
import NavBar from "@/components/common/NavBar";
import Skeleton from "@/components/common/Skeleton";
import { LOGOUT } from "@/constants/routes";
import Button from "@/design-system/button";
import { User } from "@/interfaces/user";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { LoaderIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ProfilePage = () => {
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
    <Skeleton>
      <div className="flex justify-center items-center w-16 aspect-square rounded-full bg-navy-blue">
        {userData?.profilePicture ? (
          <Image
            src={userData.profilePicture}
            alt="Foto de perfil"
            className="w-full h-full object-cover rounded-full"
            width={64}
            height={64}
            style={{ borderRadius: "9999px", objectFit: "cover" }}
          />
        ) : (
          <p className="text-white font-semibold text-f3 !leading-[24px]">
            {userData?.name ? userData.name.charAt(0) : "U"}
          </p>
        )}
      </div>
      {userData?.name}
      <Link href={LOGOUT}>
        <Button>Sign Out</Button>
      </Link>
      <NavBar />
    </Skeleton>
  );
};

export default ProfilePage;
