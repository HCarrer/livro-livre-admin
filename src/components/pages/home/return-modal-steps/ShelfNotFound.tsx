import { STEPS } from "@/constants/forms/return-modal-steps";
import Button from "@/design-system/button";
import { getNearestShelf } from "@/helpers/geoLocation";
import { ModalStepProps } from "@/interfaces/drawers";
import { IBookShelf } from "@/interfaces/fireStore";

interface ShelfNotFoundProps extends ModalStepProps {
  onSubmitData: (shelf: IBookShelf | null) => void;
}

const ShelfNotFound = ({ setStep, onSubmitData }: ShelfNotFoundProps) => {
  const handleAutoSearch = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords = position.coords;
        const shelf = await getNearestShelf(coords.latitude, coords.longitude);
        if (shelf) {
          setStep(STEPS.SHELF_CONFIRMATION);
          onSubmitData(shelf);
        }
      },
      (error) => {
        setStep(
          STEPS.ERROR,
          "Não foi possível acessar sua localização. Por favor, permita o acesso à localização para alugar o livro.",
        );
        console.error("Geolocation error:", error);
      },
    );
  };

  return (
    <>
      <p className="text-f3 font-bold text-navy-blue w-full text-center">
        Ops! Não conseguimos encontrar esta estante
      </p>
      <p className="text-f5 text-navy-blue text-center font-medium">
        Tente novamente ou deixe que a procuremos automaticamente.
      </p>
      <div className="flex flex-col gap-y-2">
        <Button
          variant="main"
          className="w-full"
          label="Escanear novamente"
          onClick={() => setStep(STEPS.SHELF_QR_CODE_SCANNING)}
        />
        <Button
          variant="secondary"
          className="w-full"
          label="Procurar automaticamente"
          onClick={handleAutoSearch}
        />
      </div>
    </>
  );
};

export default ShelfNotFound;
