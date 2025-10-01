import { RentModalStepProps, STEPS } from "@/constants/forms/rent-modal-steps";
import Button from "@/design-system/button";

const BookNotFound = ({ setStep }: RentModalStepProps) => {
  return (
    <>
      <p className="text-f3 font-bold text-navy-blue w-full text-center">
        Ops! Não conseguimos encontrar este livro
      </p>
      <p className="text-f5 text-navy-blue text-center font-medium">
        Garanta que os dados foram preenchidos exatamente como constam no livro
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
