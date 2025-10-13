import { IRentHistory } from "@/interfaces/rent";
import Image from "next/image";
import { upperCaseFirstLetter } from "@/helpers/text";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Rating from "@/components/common/Rating";

const RentDetails = ({
  item,
  index,
}: {
  item: IRentHistory;
  index: number;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex flex-col gap-y-2 p-3 bg-soft-blue rounded-md">
      <div
        className={`w-full p-2 rounded-md ${
          item.status === "returned"
            ? "bg-power-blue/50 text-navy-blue"
            : "bg-error-red/10 text-error-red"
        }`}
      >
        <div
          className="flex justify-between items-center cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className="text-f4 mb-1 font-bold">
            #{index + 1}{" "}
            {item.status === "returned" ? "Devolvido" : "Devolução pendente"}
          </p>
          <ChevronDown
            size={20}
            strokeWidth={3}
            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-40" : "max-h-0"}`}
        >
          <p className="text-f7 text-navy-blue">
            Alugado dia: <span className="font-semibold">{item.rentAt}</span> na
            prateleira <span className="font-semibold">{item.rentShelf}</span>
          </p>
          {item.status === "returned" ? (
            <p className="text-f7 text-navy-blue">
              Devolvido dia:{" "}
              <span className="font-semibold">{item.returnedAt}</span> na
              prateleira{" "}
              <span className="font-semibold">{item.returnShelf}</span>
            </p>
          ) : null}
        </div>
      </div>
      <div className="flex gap-x-2.5">
        <Image
          src={decodeURIComponent(item.book?.cover || "")}
          width={200}
          height={200}
          alt={item.book?.title || "Capa do livro"}
          className="max-h-[140px] w-auto object-cover"
        />
        <div className="flex flex-col gap-y-2 w-full">
          <Rating score={3.5} />
          <p className="text-f5 font-semibold text-navy-blue">
            {upperCaseFirstLetter(item.book?.title)}
          </p>
          <div className="flex flex-col gap-y-1">
            <p className="text-f7 text-navy-blue">
              Autor:{" "}
              <span className="font-semibold">
                {upperCaseFirstLetter(item.book?.author)}
              </span>
            </p>
            <p className="text-f7 text-navy-blue">
              Editora:{" "}
              <span className="font-semibold">
                {upperCaseFirstLetter(item.book?.publisher)}
              </span>
            </p>
            <p className="text-f7 text-navy-blue">
              Lançamento:{" "}
              <span className="font-semibold">{item.book?.releaseDate}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentDetails;
