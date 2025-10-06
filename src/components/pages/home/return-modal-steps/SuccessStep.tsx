import Button from "@/design-system/button";
import { CircleCheckBig } from "lucide-react";

interface SuccessStepProps {
  handleDrawerClose: () => void;
}

const SuccessStep = ({ handleDrawerClose }: SuccessStepProps) => {
  return (
    <>
      <p className="text-f4 font-bold text-navy-blue w-full text-center">
        Devolução realizada!
      </p>
      <div className="flex flex-col gap-y-4">
        <p className="text-f5 text-navy-blue text-center font-medium">
          Obrigado por participar do Livro Livre! Esperamos que tenha gostado da
          leitura.
        </p>
        <CircleCheckBig className="mx-auto text-power-blue" size={120} />
      </div>
      <Button
        variant="secondary"
        className="w-full mt-4"
        label="Voltar para a página inicial"
        onClick={handleDrawerClose}
      />
    </>
  );
};

export default SuccessStep;
