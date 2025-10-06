import { STEPS } from "@/constants/forms/return-modal-steps";
import Button from "@/design-system/button";
import { ModalStepProps } from "@/interfaces/drawers";
import { IBook, IBookShelf } from "@/interfaces/fireStore";
import { returnBook } from "@/services/rent";
import { MapPinned } from "lucide-react";

interface ShelfConfirmationProps extends ModalStepProps {
  shelf: IBookShelf;
  book: IBook;
  handleSuccess: () => void;
}

const ShelfConfirmation = ({
  setStep,
  handleSuccess,
  shelf,
  book,
}: ShelfConfirmationProps) => {
  const handleReturn = async () => {
    const { success, message } = await returnBook(book, shelf);
    if (success) {
      handleSuccess();
      setStep(STEPS.SUCCESS);
    } else {
      if (message == "Book not found") {
        setStep(
          STEPS.ERROR,
          "Não foi possível encontrar o livro no sistema. Por favor, verifique se você está devolvendo o livro correto.",
        );
      } else if (message == "Bookshelf not found") {
        setStep(
          STEPS.ERROR,
          "Não foi possível encontrar a estante no sistema. Por favor, verifique se você está devolvendo o livro na estante correta.",
        );
      } else if (message == "No pending rent found for this book and user") {
        setStep(
          STEPS.ERROR,
          "Não foi possível encontrar um aluguel pendente para este livro e usuário. Por favor, verifique se você está devolvendo o livro correto.",
        );
      } else {
        setStep(
          STEPS.ERROR,
          "Ocorreu um erro ao tentar devolver o livro. Por favor, tente novamente.",
        );
      }
    }
  };

  return (
    <>
      <div className="flex flex-col gap-y-2">
        <p className="text-f5 text-navy-blue w-full text-start">
          Você está devolvendo o livro na estante:
        </p>
        <p className="font-bold text-center text-power-blue text-f2">
          {shelf.alias}
        </p>
        <MapPinned className="mx-auto my-6 text-navy-blue" size={120} />
      </div>
      <div className="flex flex-col gap-y-2">
        <Button variant="main" label="Devolver" onClick={handleReturn} />
        <Button variant="outline" label="Cancelar" onClick={() => setStep(0)} />
      </div>
    </>
  );
};

export default ShelfConfirmation;
