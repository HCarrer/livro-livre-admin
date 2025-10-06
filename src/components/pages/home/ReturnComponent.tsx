import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { RETURN_BUTTON_LABEL } from "@/constants/common";
import Button from "@/design-system/button";
import { DrawerButtonProps } from "@/interfaces/drawers";
import { IBook } from "@/interfaces/fireStore";
import { useMemo, useState } from "react";
import BookNotFound from "./return-modal-steps/BookNotFound";
import ErrorStep from "./return-modal-steps/ErrorStep";
import LoadingStep from "./return-modal-steps/LoadingStep";
import QrCodeScanning from "./return-modal-steps/QrCodeScanning";
import SuccessStep from "./return-modal-steps/SuccessStep";
import { STEPS } from "@/constants/forms/return-modal-steps";
import BookConfirmation from "./return-modal-steps/BookConfirmationStep";
import PendingReturnBooks from "./return-modal-steps/PendingReturnBooks";

const ReturnComponent = ({ facets }: DrawerButtonProps) => {
  const [foundBook, setFoundBook] = useState<IBook | undefined>(undefined);

  const [step, setStep] = useState(STEPS.BOOK_QR_CODE_SCANNING);
  const [isOpen, setIsOpen] = useState(false);

  const closeDrawer = () => {
    setStep(STEPS.BOOK_QR_CODE_SCANNING);
    setIsOpen(false);
    setFoundBook(undefined);
  };

  const handleStepChange = (newStep: number) => {
    setStep(newStep);
  };

  const handleBookSearch = (book: IBook | null) => {
    setFoundBook(book ?? undefined);
  };

  const StepComponent = useMemo(() => {
    switch (step) {
      case STEPS.BOOK_QR_CODE_SCANNING:
        return (
          <QrCodeScanning
            setStep={handleStepChange}
            onSubmitData={handleBookSearch}
          />
        );
      case STEPS.BOOK_CONFIRMATION:
        return foundBook ? (
          <BookConfirmation setStep={handleStepChange} book={foundBook} />
        ) : (
          <BookNotFound setStep={handleStepChange} />
        );
      case STEPS.PENDING_RETURN_LISTING:
        return <PendingReturnBooks setStep={handleStepChange} />;
      case STEPS.SHELF_QR_CODE_SCANNING:
        return <p>SHELF_QR_CODE_SCANNING</p>;
      case STEPS.LOADING:
        return <LoadingStep />;
      case STEPS.BOOK_NOT_FOUND:
        return <BookNotFound setStep={handleStepChange} />;
      case STEPS.SHELF_NOT_FOUND:
        return <p>SHELF_NOT_FOUND</p>;
      case STEPS.SUCCESS:
        return <SuccessStep handleDrawerClose={closeDrawer} />;
      case STEPS.ERROR:
        return (
          <ErrorStep
            setStep={handleStepChange}
            handleDrawerClose={closeDrawer}
          />
        );
      default:
        return (
          <QrCodeScanning
            setStep={handleStepChange}
            onSubmitData={handleBookSearch}
          />
        );
    }
  }, [step]);

  return (
    <Drawer
      onClose={() => setTimeout(() => setStep(STEPS.MODE_SELECTION), 300)}
      open={isOpen}
      onOpenChange={(open) => (open ? setIsOpen(true) : closeDrawer())}
    >
      <DrawerTrigger asChild>
        <Button
          variant="secondary"
          className="w-full"
          label={RETURN_BUTTON_LABEL}
          disabled={(facets?.pending || 0) === 0}
          type="button"
        />
      </DrawerTrigger>
      <DrawerContent>
        <div className="px-10 pt-8 pb-16 flex flex-col gap-y-4">
          {StepComponent}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ReturnComponent;
