import AuthorName from "@/components/forms/pages/home/AuthorName";
import BookName from "@/components/forms/pages/home/BookName";
import PublisherName from "@/components/forms/pages/home/PublisherName";
import { STEPS } from "@/constants/forms/rent-modal-steps";
import Button from "@/design-system/button";
import {
  ManualFillingStepProps,
  RentManualFillingProps,
} from "@/interfaces/drawers";
import { getBookByFields } from "@/services/books";
import { useFormContext } from "react-hook-form";

const ManualFillingStep = ({
  setStep,
  onSubmitData,
}: ManualFillingStepProps) => {
  const {
    formState: { isValid },
    handleSubmit,
  } = useFormContext<RentManualFillingProps>();

  const onSubmit = async (data: RentManualFillingProps) => {
    const { bookName, authorName, publisherName } = data;
    const result = await getBookByFields(bookName, authorName, publisherName);
    onSubmitData?.(result);
    if (result) {
      setStep(STEPS.CONFIRMATION);
    } else {
      setStep(
        STEPS.BOOK_NOT_FOUND,
        "Garanta que os dados foram preenchidos exatamente como constam no livro",
      );
    }
  };

  return (
    <>
      <p className="text-f4 text-navy-blue w-full text-center pb-2 border-b-1 border-soft-lilac">
        Preenchimento manual
      </p>
      <p className="text-f6 text-navy-blue text-start font-medium">
        Preencha os campos abaixo exatamente como aparecem no livro para
        concluir o aluguel
      </p>
      <form
        name="manual-filling"
        className="flex flex-col gap-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <BookName />
        <AuthorName />
        <PublisherName />
        <div className="flex gap-x-4">
          <Button
            variant="outline"
            label="Voltar"
            onClick={() => setStep(STEPS.MODE_SELECTION)}
          />
          <Button
            variant="main"
            label="Continuar"
            disabled={!isValid}
            type="submit"
          />
        </div>
      </form>
    </>
  );
};

export default ManualFillingStep;
