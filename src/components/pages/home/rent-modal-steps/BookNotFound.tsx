import { STEPS } from "@/constants/forms/rent-modal-steps";
import Button from "@/design-system/button";
import { RentModalStepProps } from "@/interfaces/drawers";

interface BookNotFoundProps extends RentModalStepProps {
  feedback?: string;
}

const BookNotFound = ({ setStep, feedback }: BookNotFoundProps) => {
  return (
    <>
      <p className="text-f3 font-bold text-navy-blue w-full text-center">
        Ops! Não conseguimos encontrar este livro
      </p>
      <p className="text-f5 text-navy-blue text-center font-medium">
        {feedback ||
          "Tente escanear o QR Code novamente ou preencha os dados manualmente"}
      </p>
      <div className="flex flex-col gap-y-2">
        <Button
          variant="main"
          className="w-full"
          label="Escanear QR Code"
          onClick={() => setStep(STEPS.QR_CODE_SCANNING)}
        />
        <Button
          variant="secondary"
          className="w-full"
          label="Tentar novamente"
          onClick={() => setStep(STEPS.MANUAL_FILLING)}
        />
      </div>
    </>
  );
};

export default BookNotFound;
