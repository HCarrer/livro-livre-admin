import { STEPS } from "@/constants/forms/return-modal-steps";
import Button from "@/design-system/button";
import { ModalStepProps } from "@/interfaces/drawers";

const BookNotFound = ({ setStep }: ModalStepProps) => {
  return (
    <>
      <p className="text-f3 font-bold text-navy-blue w-full text-center">
        Ops! Não conseguimos encontrar este livro
      </p>
      <p className="text-f5 text-navy-blue text-center font-medium">
        Tente novamente ou selecione o livro manualmente.
      </p>
      <div className="flex flex-col gap-y-2">
        <Button
          variant="main"
          className="w-full"
          label="Escanear novamente"
          onClick={() => setStep(STEPS.BOOK_QR_CODE_SCANNING)}
        />
        <Button
          variant="secondary"
          className="w-full"
          label="Selecionar manualmente"
          onClick={() => setStep(STEPS.PENDING_RETURN_LISTING)}
        />
      </div>
    </>
  );
};

export default BookNotFound;
