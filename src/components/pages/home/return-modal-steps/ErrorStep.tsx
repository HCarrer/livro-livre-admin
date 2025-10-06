import { STEPS } from "@/constants/forms/rent-modal-steps";
import Button from "@/design-system/button";
import { ModalStepProps } from "@/interfaces/drawers";
import { CircleX } from "lucide-react";

interface ErrorStepProps extends ModalStepProps {
  handleDrawerClose: () => void;
  feedback?: string;
}

const ErrorStep = ({
  setStep,
  handleDrawerClose,
  feedback,
}: ErrorStepProps) => {
  return (
    <>
      <p className="text-f4 font-bold text-navy-blue w-full text-center">
        Ops...
      </p>
      <div className="flex flex-col gap-y-4">
        <p className="text-f5 text-navy-blue text-center font-medium">
          {feedback ||
            "Ocorreu um erro ao alugar este livro. Tente novamente em instantes"}
        </p>
        <CircleX className="mx-auto text-error-red" size={120} />
      </div>
      <div className="flex flex-col gap-y-2">
        <Button
          variant="main"
          label="Tentar novamente"
          onClick={() => setStep(STEPS.MODE_SELECTION)}
        />
        <Button
          variant="outline"
          label="Voltar para a página inicial"
          onClick={handleDrawerClose}
        />
      </div>
    </>
  );
};

export default ErrorStep;
