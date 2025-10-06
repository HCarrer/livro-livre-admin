import { STEPS } from "@/constants/forms/rent-modal-steps";
import Button from "@/design-system/button";
import { RentModalStepProps } from "@/interfaces/rentDrawer";

const ModeSelectionStep = ({ setStep }: RentModalStepProps) => {
  return (
    <>
      <p className="text-f2 font-bold text-navy-blue w-full text-center pb-4 border-b-1 border-soft-lilac">
        Alugar
      </p>
      <p className="text-f6 text-navy-blue text-start font-medium">
        Aponte sua câmera para o QR Code da capa ou preencha os dados
        manualmente
      </p>
      <div className="flex flex-col gap-y-2">
        <Button
          variant="main"
          label="Abrir câmera"
          onClick={() => setStep(STEPS.QR_CODE_SCANNING)}
        />
        <Button
          variant="outline"
          label="Preencher manualmente"
          onClick={() => setStep(STEPS.MANUAL_FILLING)}
        />
      </div>
    </>
  );
};

export default ModeSelectionStep;
