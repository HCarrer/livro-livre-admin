import NavBar from "@/components/common/NavBar";
import Skeleton from "@/components/common/Skeleton";
import { getRentHistory } from "@/services/rent";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "+/authentication/firebase";
import { doc, getDoc } from "firebase/firestore";
import { IUser } from "@/interfaces/fireStore";
import { IRentHistory } from "@/interfaces/rent";
import { useToast } from "@/contexts/toast";
import { LoaderIcon } from "lucide-react";
import RentDetails from "@/components/pages/historico/rentDetails";

const HistoryPage = () => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<IRentHistory[]>([]);
  const [filters, setFilters] = useState<IRentHistory["status"][]>([
    "returned",
    "pendingReturn",
  ]);

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

  const getHistory = async (filters: IRentHistory["status"][]) => {
    const { success, status, history } = await getRentHistory(filters);
    if (success) {
      setHistory(history);
    } else {
      showToast("Erro ao carregar histórico de empréstimos", "error");
    }
    console.log(success, status, history);
  };

  useEffect(() => {
    if (!userData) return;
    getHistory(filters);
  }, [userData, filters]);

  const handleFilterClick = (status: IRentHistory["status"]) => {
    if (filters.includes(status)) {
      setFilters(filters.filter((s) => s !== status));
    } else {
      setFilters([...filters, status]);
    }
  };

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
      <div className="w-full text-navy-blue">
        <p className="text-f2 font-bold mb-2">Histórico</p>
        <p className="text-f6 font-medium">
          Aqui você consegue ver todo o seu histórico de alugueis e devoluções.
        </p>
      </div>
      <div className="flex w-full gap-x-2">
        <p
          onClick={() => handleFilterClick("returned")}
          className={`p-2 border-2 w-fit rounded-md cursor-pointer ${filters.includes("returned") ? "text-power-blue font-bold bg-soft-blue border-power-blue" : "bg-soft-white border-soft-lilac text-navy-blue"}`}
        >
          Devolvidos
        </p>
        <p
          onClick={() => handleFilterClick("pendingReturn")}
          className={`p-2 border-2 w-fit rounded-md cursor-pointer ${filters.includes("pendingReturn") ? "text-power-blue font-bold bg-soft-blue border-power-blue" : "bg-soft-white border-soft-lilac text-navy-blue"}`}
        >
          Devoluções pendentes
        </p>
      </div>
      <div className="flex flex-col gap-y-4">
        {history.map((item, index) => (
          <RentDetails
            key={index}
            item={item}
            index={history.length - (index + 1)}
          />
        ))}
      </div>
      <NavBar />
    </Skeleton>
  );
};

export default HistoryPage;
