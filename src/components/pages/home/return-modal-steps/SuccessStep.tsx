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
          Curta este livro como se fosse seu mas não se esqueça:{" "}
          <span className="text-power-blue font-semibold">ele não é!</span>
        </p>
        <CircleCheckBig className="mx-auto text-power-blue" size={120} />
        <p className="text-f6 text-navy-blue text-center font-medium">
          Cuide, leia e devolva. Assim mais pessoas também poderão aproveitar!
        </p>
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
