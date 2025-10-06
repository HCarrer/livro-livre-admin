import { STEPS } from "@/constants/forms/return-modal-steps";
import Button from "@/design-system/button";
import Image from "next/image";
import Rating from "@/components/common/Rating";
import { ModalStepProps } from "@/interfaces/drawers";
import { useCallback, useEffect, useState } from "react";
import { IBook } from "@/interfaces/fireStore";
import { listPendingReturns } from "@/services/rent";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { upperCaseFirstLetter } from "@/helpers/text";

type PendingBook = IBook & { rentId: string };

interface PendingReturnBooksProps extends ModalStepProps {
  handleBookConfirmation: (book: IBook | undefined) => void;
}

const PendingReturnBooks = ({
  setStep,
  handleBookConfirmation,
}: PendingReturnBooksProps) => {
  const [books, setBooks] = useState<PendingBook[]>([]);
  const [chosenBook, setChosenBook] = useState<PendingBook["rentId"]>(
    books[0]?.rentId || "",
  );

  const listPendingBooks = useCallback(async () => {
    const { success, books } = await listPendingReturns();
    if (success) {
      setBooks(books);
    }
  }, []);

  useEffect(() => {
    listPendingBooks();
  }, []);

  const confirmBook = useCallback(() => {
    if (!chosenBook) return;
    handleBookConfirmation(books.find((book) => book.rentId === chosenBook));
    setStep(STEPS.SHELF_QR_CODE_SCANNING);
  }, [chosenBook]);

  const choosePrev = () => {
    const currentIndex = books.findIndex((book) => book.rentId === chosenBook);
    if (currentIndex > 0) {
      setChosenBook(books[currentIndex - 1].rentId);
    }
  };

  const chooseNext = () => {
    const currentIndex = books.findIndex((book) => book.rentId === chosenBook);
    if (currentIndex < books.length - 1) {
      setChosenBook(books[currentIndex + 1].rentId);
    }
  };

  useEffect(() => {
    if (chosenBook) {
      const index = books.findIndex((book) => book.rentId === chosenBook);
      if (index !== -1) {
        document
          .getElementById(`book-${index}`)
          ?.scrollIntoView({ behavior: "smooth", inline: "center" });
      }
    }
  }, [chosenBook, books]);

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
      <div className="overflow-hidden w-full flex gap-x-4 overflow-x-auto">
        {books.map((book, index) => (
          <div
            key={index}
            id={`book-${index}`}
            className={`w-fit shrink-0 flex gap-x-2.5 p-3 rounded-md bg-soft-blue border-2 ${chosenBook === book.rentId ? "border-power-blue" : "border-soft-blue"}`}
            onClick={() => setChosenBook(book.rentId)}
          >
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
        ))}
      </div>
      {books.length > 1 ? (
        <div
          className={`overflow-hidden flex justify-between transition-all duration-200 ease-in-out w-full ${chosenBook ? "max-h-96" : "max-h-0"}`}
        >
          <Button
            variant="outline"
            className="flex items-center gap-x-1"
            onClick={choosePrev}
            disabled={
              books.findIndex((book) => book.rentId === chosenBook) === 0
            }
          >
            <ChevronLeft size={32} />
            Anterior
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-x-1"
            onClick={chooseNext}
            disabled={
              books.findIndex((book) => book.rentId === chosenBook) ===
              books.length - 1
            }
          >
            Próximo
            <ChevronRight size={32} />
          </Button>
        </div>
      ) : null}
      <Button
        variant="main"
        label="Devolver"
        disabled={!chosenBook}
        onClick={confirmBook}
      />
    </>
  );
};

export default PendingReturnBooks;
