import { RentModalStepProps, STEPS } from "@/constants/forms/rent-modal-steps";
import Button from "@/design-system/button";
import Input from "@/design-system/input";

const ManualFillingStep = ({ setStep }: RentModalStepProps) => {
  return (
    <>
      <p className="text-f4 text-navy-blue w-full text-center pb-2 border-b-1 border-soft-lilac">
        Preenchimento manual
      </p>
      <p className="text-f6 text-navy-blue text-start font-medium">
        Preencha os campos abaixo exatamente como aparecem no livro para
        concluir o aluguel
      </p>
      <Input placeholder="Nome do livro" icon="book" id="book-name" />
      <Input placeholder="Nome do autor" icon="avatar" id="author-name" />
      <Input placeholder="Nome da editora" icon="file" id="publisher-name" />
      <div className="flex gap-x-4">
        <Button
          variant="outline"
          label="Voltar"
          onClick={() => setStep(STEPS.MODE_SELECTION)}
        />
        <Button
          variant="main"
          label="Continuar"
          onClick={() => setStep(STEPS.LOADING)}
        />
      </div>
    </>
  );
};

export default ManualFillingStep;
