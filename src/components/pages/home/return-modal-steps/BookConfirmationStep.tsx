import { STEPS } from "@/constants/forms/return-modal-steps";
import Button from "@/design-system/button";
import Image from "next/image";
import Rating from "@/components/common/Rating";
import { ModalStepProps } from "@/interfaces/drawers";
import { IBook } from "@/interfaces/fireStore";
import { upperCaseFirstLetter } from "@/helpers/text";

interface BookConfirmationProps extends ModalStepProps {
  book: IBook;
  handleBookConfirmation: (book: IBook) => void;
}

const BookConfirmation = ({
  setStep,
  book,
  handleBookConfirmation,
}: BookConfirmationProps) => {
  const handleReturnClick = () => {
    handleBookConfirmation(book);
    setStep(STEPS.SHELF_QR_CODE_SCANNING);
  };

  return (
    <>
      <div className="flex flex-col gap-y-1">
        <p className="text-f4 font-bold text-navy-blue w-full text-start">
          É este o seu livro?
        </p>
        <p className="text-f6 text-navy-blue text-start font-medium">
          Se não for, não se preocupe! Você ainda pode selecionar manualmente
          qual livro deseja devolver.
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
          <div>
            <Rating score={3.5} />
          </div>
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
          onClick={() => setStep(STEPS.PENDING_RETURN_LISTING)}
        />
        <Button variant="main" label="Devolver" onClick={handleReturnClick} />
      </div>
    </>
  );
};

export default BookConfirmation;
