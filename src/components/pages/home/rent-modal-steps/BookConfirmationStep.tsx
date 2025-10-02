import { STEPS } from "@/constants/forms/rent-modal-steps";
import Button from "@/design-system/button";
import Image from "next/image";
import Rating from "@/components/common/Rating";
import { RentModalStepProps } from "@/interfaces/rentDrawer";

export interface IBook {
  title: string;
  author: string;
  publisher: string;
  releaseDate: number;
  cover: string;
}

interface BookConfirmationProps extends RentModalStepProps {
  book?: IBook;
}

const upperCaseFirstLetter = (str?: string) => {
  if (!str) return "";
  return str
    .toLocaleLowerCase("pt-BR")
    .replace(/(^|\s)\S/g, (char) => char.toLocaleUpperCase("pt-BR"));
};

const BookConfirmation = ({ setStep, book }: BookConfirmationProps) => {
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
          onClick={() => setStep(STEPS.MANUAL_FILLING)}
        />
        <Button
          variant="main"
          label="Alugar"
          onClick={() => setStep(STEPS.SUCCESS)}
        />
      </div>
    </>
  );
};

export default BookConfirmation;
