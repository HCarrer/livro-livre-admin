import { getRentHistory } from "@/services/rent";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IRentHistory } from "@/interfaces/rent";
import { useToast } from "@/contexts/toast";
import RentDetails from "@/components/pages/historico/rentDetails";

const HistoryPage = () => {
  const [historyLoading, setHistoryLoading] = useState(true);
  const [history, setHistory] = useState<IRentHistory[]>([]);
  const [filters, setFilters] = useState<IRentHistory["status"][]>([
    "returned",
    "pendingReturn",
  ]);

  const { showToast } = useToast();

  const getHistory = useCallback(async (filters: IRentHistory["status"][]) => {
    setHistoryLoading(true);
    const { success, history } = await getRentHistory(filters);
    if (success) {
      setHistory(history);
    } else {
      showToast("Erro ao carregar histórico de empréstimos", "error");
    }
    setHistoryLoading(false);
  }, []);

  useEffect(() => {
    getHistory(filters);
  }, [filters]);

  const handleFilterClick = (status: IRentHistory["status"]) => {
    if (filters.includes(status)) {
      if (filters.length === 1) return;
      setFilters(filters.filter((s) => s !== status));
    } else {
      setFilters([...filters, status]);
    }
  };

  const memoizedContent = useMemo(() => {
    if (historyLoading)
      return (
        <div className="flex flex-col gap-y-2 w-full h-fit bg-soft-blue rounded-md animate-pulse p-3">
          <div className="h-10 w-full bg-soft-lilac rounded-md" />
          <div className="flex gap-x-2.5">
            <div className="w-40 h-32 bg-soft-lilac rounded-md" />
            <div className="flex flex-col gap-y-2 w-full">
              <div className="h-6 w-full rounded-md bg-soft-lilac" />
              <div className="h-4 w-4/5 rounded-md bg-soft-lilac" />
              <div className="h-4 w-3/5 rounded-md bg-soft-lilac" />
              <div className="h-4 w-4/5 rounded-md bg-soft-lilac" />
            </div>
          </div>
        </div>
      );
    if (history.length)
      return (
        <div className="w-full flex flex-col gap-y-4">
          {history.map((item, index) => (
            <RentDetails
              key={index}
              item={item}
              index={history.length - (index + 1)}
            />
          ))}
        </div>
      );
    return (
      <div className="w-full mt-10 h-full flex flex-col justify-center items-center gap-y-2">
        <p className="text-f4 text-navy-blue font-medium">
          Nenhum histórico encontrado
        </p>
      </div>
    );
  }, [history, historyLoading]);

  return (
    <div className="flex flex-col gap-y-4 w-full bg-soft-white drop-shadow-[0px_0px_10px_#00000020] rounded-md p-5">
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
      {memoizedContent}
    </div>
  );
};

export default HistoryPage;
