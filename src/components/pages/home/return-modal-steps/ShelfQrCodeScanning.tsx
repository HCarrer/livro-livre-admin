import Toast from "@/components/common/Toast";
import { STEPS } from "@/constants/forms/return-modal-steps";
import Button from "@/design-system/button";
import { ModalStepProps } from "@/interfaces/drawers";
import { IBookShelf } from "@/interfaces/fireStore";
import { getShelfById } from "@/services/shelf";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";

interface ShelfQrCodeScanningProps extends ModalStepProps {
  onSubmitData: (shelf: IBookShelf | null) => void;
}

const ShelfQrCodeScanning = ({
  setStep,
  onSubmitData,
}: ShelfQrCodeScanningProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async (content: IDetectedBarcode[]) => {
    setErrorMessage(null);
    if (!content || !content.length) return;
    const { rawValue: bookShelfId } = content[0];
    if (bookShelfId) {
      const result = await getShelfById(bookShelfId);
      onSubmitData?.(result);
      if (result) {
        setStep(STEPS.SHELF_CONFIRMATION);
      } else {
        setStep(
          STEPS.SHELF_NOT_FOUND,
          "Garanta que você está escaneando o QR Code correto",
        );
      }
    } else {
      setStep(STEPS.SHELF_NOT_FOUND);
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-8">
      <p className="text-f3 font-bold text-navy-blue text-center">
        Escaneie o QR Code da estante onde deseja devolver o seu livro
      </p>
      {isScanning ? (
        <>
          <p className="text-f5 text-center text-navy-blue">
            Posicione o QR Code no centro da câmera
          </p>
          <div className="rounded-lg overflow-hidden">
            <Scanner
              onScan={handleScan}
              onError={() => setErrorMessage("Erro ao abrir a câmera")}
              components={{ finder: false }}
            />
          </div>
        </>
      ) : (
        <>
          <p className="text-f5 text-center text-navy-blue">
            Habilite a câmera do seu dispositivo para continuar
          </p>
          <div className="size-[296px] flex justify-center items-center">
            <Button
              variant="main"
              label="Iniciar câmera"
              onClick={() => setIsScanning(true)}
            />
          </div>
        </>
      )}
      {errorMessage ? <Toast content={errorMessage} type="error" /> : null}
    </div>
  );
};

export default ShelfQrCodeScanning;
