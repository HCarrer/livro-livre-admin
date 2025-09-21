import { RentModalStepProps, STEPS } from "@/constants/forms/rent-modal-steps";
import Button from "@/design-system/button";
import BookCover from "../../../../../public/images/mock-book-cover.jpg";
import Image from "next/image";
import { Star } from "lucide-react";
import Rating from "@/components/common/Rating";

const BookConfirmation = ({ setStep }: RentModalStepProps) => {
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
          src={BookCover}
          width={96}
          height={139}
          alt="A Biblioteca da Meia Noite"
        />
        <div className="flex flex-col gap-y-2">
          <div>
            <Rating score={3.5} />
          </div>
          <p className="text-f5 font-semibold text-navy-blue">
            A Biblioteca da Meia Noite
          </p>
          <div className="flex flex-col gap-y-1">
            <p className="text-f7 text-navy-blue">
              Autor: <span className="font-semibold">Matt Haig</span>
            </p>
            <p className="text-f7 text-navy-blue">
              Editora: <span className="font-semibold">Canongate Books</span>
            </p>
            <p className="text-f7 text-navy-blue">
              Lançamento: <span className="font-semibold">2021</span>
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
