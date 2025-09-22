import AuthorName from "@/components/forms/pages/home/AuthorName";
import BookName from "@/components/forms/pages/home/BookName";
import PublisherName from "@/components/forms/pages/home/PublisherName";
import {
  RentManualFillingProps,
  RentModalStepProps,
  STEPS,
} from "@/constants/forms/rent-modal-steps";
import Button from "@/design-system/button";
import { useFormContext } from "react-hook-form";

const ManualFillingStep = ({ setStep }: RentModalStepProps) => {
  const {
    formState: { isValid },
  } = useFormContext<RentManualFillingProps>();

  console.log(isValid);

  return (
    <>
      <p className="text-f4 text-navy-blue w-full text-center pb-2 border-b-1 border-soft-lilac">
        Preenchimento manual
      </p>
      <p className="text-f6 text-navy-blue text-start font-medium">
        Preencha os campos abaixo exatamente como aparecem no livro para
        concluir o aluguel
      </p>
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
          onClick={() => setStep(STEPS.LOADING)}
        />
      </div>
    </>
  );
};

export default ManualFillingStep;
