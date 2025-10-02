import Toast from "@/components/common/Toast";
import { STEPS } from "@/constants/forms/rent-modal-steps";
import Button from "@/design-system/button";
import { ManualFillingStepProps } from "@/interfaces/rentDrawer";
import { getBookById } from "@/services/books";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";

const QrCodeScanning = ({ setStep, onSubmitData }: ManualFillingStepProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async (content: IDetectedBarcode[]) => {
    setErrorMessage(null);
    if (!content || !content.length) return;
    const { rawValue: bookDocId } = content[0];
    if (bookDocId) {
      const result = await getBookById(bookDocId);
      onSubmitData?.(result);
      setStep(result ? STEPS.CONFIRMATION : STEPS.BOOK_NOT_FOUND);
    } else {
      setStep(STEPS.BOOK_NOT_FOUND);
    }
  };

  return (
    <div className="flex flex-col items-center gap-y-8">
      {isScanning ? (
        <>
          <p className="text-f5 font-semibold text-center text-navy-blue">
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
          <p className="text-f5 font-semibold text-center text-navy-blue">
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

export default QrCodeScanning;
