import { STEPS } from "@/constants/forms/rent-modal-steps";
import Button from "@/design-system/button";
import Image from "next/image";
import Rating from "@/components/common/Rating";
import { ModalStepProps } from "@/interfaces/drawers";
import { useCallback } from "react";
import { rentBook } from "@/services/rent";
import { IBook } from "@/interfaces/fireStore";
import { upperCaseFirstLetter } from "@/helpers/text";

interface BookConfirmationProps extends ModalStepProps {
  book: IBook;
  onSuccess?: () => void;
}

const BookConfirmation = ({
  setStep,
  book,
  onSuccess,
}: BookConfirmationProps) => {
  const handleRentClick = useCallback(async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords = position.coords;
        const { success, status, message } = await rentBook(book, coords);
        if (success) {
          setStep(STEPS.SUCCESS);
          onSuccess?.();
        } else {
          if (status === 409) {
            setStep(
              STEPS.ERROR,
              "Parece que você já alugou esse livro! Devolva-o para poder alugar novamente",
            );
          } else {
            setStep(STEPS.ERROR);
            console.error(message);
          }
        }
      },
      (error) => {
        setStep(
          STEPS.ERROR,
          "Não foi possível acessar sua localização. Por favor, permita o acesso à localização para alugar o livro.",
        );
        console.error("Geolocation error:", error);
      },
    );
  }, [book]);

  return (
    <>
      <div className="flex flex-col gap-y-1">
        <p className="text-f4 font-bold text-navy-blue w-full text-start">
          Quase lá!
        </p>
        <p className="text-f6 text-navy-blue text-start font-medium">
          Confirme o livro encontrado
        </p>
      </div>
      <div className="flex gap-x-2.5 p-3 bg-soft-blue rounded-md">
        <Image
          src={decodeURIComponent(book?.cover || "")}
          width={200}
          height={200}
          alt={book?.title || "Capa do livro"}
          className="max-h-[140px] w-auto object-cover"
        />
        <div className="flex flex-col gap-y-2">
          <Rating score={3.5} />
          <p className="text-f5 font-semibold text-navy-blue">
            {upperCaseFirstLetter(book?.title)}
          </p>
          <div className="flex flex-col gap-y-1">
            <p className="text-f7 text-navy-blue">
              Autor:{" "}
              <span className="font-semibold">
                {upperCaseFirstLetter(book?.author)}
              </span>
            </p>
            <p className="text-f7 text-navy-blue">
              Editora:{" "}
              <span className="font-semibold">
                {upperCaseFirstLetter(book?.publisher)}
              </span>
            </p>
            <p className="text-f7 text-navy-blue">
              Lançamento:{" "}
              <span className="font-semibold">{book?.releaseDate}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-x-4">
        <Button
          variant="outline"
          label="É outro livro"
          onClick={() => setStep(STEPS.MANUAL_FILLING)}
        />
        <Button variant="main" label="Alugar" onClick={handleRentClick} />
      </div>
    </>
  );
};

export default BookConfirmation;
