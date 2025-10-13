import Accordion from "@/components/common/Accordion";
import NavBar from "@/components/common/NavBar";
import Skeleton from "@/components/common/Skeleton";
import UserScore from "@/components/common/UserScore";
import WelcomeBanner from "@/components/common/WelcomeBanner";
import RentComponent from "@/components/pages/home/RentComponent";
import { ACCORDIONS } from "@/constants/accordions";
import { onAuthStateChanged } from "firebase/auth";
import { Bell, LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { auth, db } from "+/authentication/firebase";
import { IUser } from "@/interfaces/fireStore";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { PROFILE } from "@/constants/routes";
import { getRentHistoryFacets } from "@/services/rent";
import { IRentHistoryFacets } from "@/interfaces/facets";
import { useToast } from "@/contexts/toast";
import ReturnComponent from "@/components/pages/home/ReturnComponent";

const Home = () => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [facets, setFacets] = useState<IRentHistoryFacets | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState(true);

  const { showToast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const data = userDocSnapshot.data() as IUser;
          setUserData(data);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getHistoryFacets = async () => {
    const { success, facets } = await getRentHistoryFacets();
    setFacets(facets);
    if (!success) {
      showToast(
        "Erro ao buscar histórico de empréstimos. Tente novamente em instantes.",
        "error",
      );
    }
  };

  useEffect(() => {
    if (!userData) return;
    getHistoryFacets();
  }, [userData]);

  const onSuccess = () => {
    getHistoryFacets();
  };

  if (loading)
    return (
      <div className="w-full flex justify-center">
        <div className="w-full flex flex-col gap-y-6">
          <div className="w-full h-36 rounded-[20px] bg-soft-lilac animate-pulse" />
          <div className="w-full h-[150px] rounded-[20px] bg-soft-lilac animate-pulse" />
          <div className="w-full h-16 rounded-[20px] bg-soft-lilac animate-pulse" />
          <div className="w-full h-16 rounded-[20px] bg-soft-lilac animate-pulse" />
          <div className="w-full h-16 rounded-[20px] bg-soft-lilac animate-pulse" />
        </div>
      </div>
    );

  return (
    <div className="w-full flex flex-col gap-y-6">
      {!userData?.hasClosedWelcomeBanner ? <WelcomeBanner /> : null}
      <UserScore
        booksRead={facets?.returned || 0}
        booksToReturn={facets?.pending || 0}
      />
      <div className="w-full flex flex-col gap-y-2 p-5 bg-soft-white rounded-[20px] drop-shadow-[0px_0px_10px_#00000020]">
        <RentComponent facets={facets} onSuccess={onSuccess} />
        <ReturnComponent facets={facets} onSuccess={onSuccess} />
      </div>
      <div className="flex flex-col gap-6">
        {ACCORDIONS.map((item, index) => (
          <Accordion key={index} title={item.title} content={item.content} />
        ))}
      </div>
    </div>
  );
};

export default Home;
