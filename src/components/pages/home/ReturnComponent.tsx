import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { RETURN_BUTTON_LABEL } from "@/constants/common";
import Button from "@/design-system/button";
import { DrawerButtonProps } from "@/interfaces/drawers";
import { IBook, IBookShelf } from "@/interfaces/fireStore";
import { useMemo, useState } from "react";
import BookNotFound from "./return-modal-steps/BookNotFound";
import ErrorStep from "./return-modal-steps/ErrorStep";
import LoadingStep from "./return-modal-steps/LoadingStep";
import BookQrCodeScanning from "./return-modal-steps/BookQrCodeScanning";
import SuccessStep from "./return-modal-steps/SuccessStep";
import { STEPS } from "@/constants/forms/return-modal-steps";
import BookConfirmation from "./return-modal-steps/BookConfirmationStep";
import PendingReturnBooks from "./return-modal-steps/PendingReturnBooks";
import ShelfQrCodeScanning from "./return-modal-steps/ShelfQrCodeScanning";
import ShelfNotFound from "./return-modal-steps/ShelfNotFound";
import ShelfConfirmation from "./return-modal-steps/ShelfConfirmation";

const ReturnComponent = ({ facets, onSuccess }: DrawerButtonProps) => {
  const [foundBook, setFoundBook] = useState<IBook | undefined>(undefined);
  const [foundShelf, setFoundShelf] = useState<IBookShelf | undefined>(
    undefined,
  );
  const [returnedBook, setReturnedBook] = useState<IBook | null>(null);
  const [step, setStep] = useState(STEPS.BOOK_QR_CODE_SCANNING);
  const [feedback, setFeedback] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const handleBookConfirmation = (book: IBook | undefined) => {
    if (!book) return;
    setReturnedBook(book);
  };

  const closeDrawer = () => {
    setStep(STEPS.BOOK_QR_CODE_SCANNING);
    setIsOpen(false);
    setFoundBook(undefined);
    setReturnedBook(null);
  };

  const handleStepChange = (newStep: number, feedback?: string) => {
    setStep(newStep);
    setFeedback(feedback);
  };

  const handleBookSearch = (book: IBook | null) => {
    setFoundBook(book ?? undefined);
  };

  const handleShelfSearch = (shelf: IBookShelf | null) => {
    setFoundShelf(shelf ?? undefined);
  };

  const handleReturnSuccess = () => {
    setFoundBook(undefined);
    setReturnedBook(null);
    setFoundShelf(undefined);
    onSuccess?.();
  };

  const StepComponent = useMemo(() => {
    switch (step) {
      case STEPS.BOOK_QR_CODE_SCANNING:
        return (
          <BookQrCodeScanning
            setStep={handleStepChange}
            onSubmitData={handleBookSearch}
          />
        );
      case STEPS.BOOK_CONFIRMATION:
        return foundBook ? (
          <BookConfirmation
            setStep={handleStepChange}
            book={foundBook}
            handleBookConfirmation={handleBookConfirmation}
          />
        ) : (
          <BookNotFound setStep={handleStepChange} />
        );
      case STEPS.PENDING_RETURN_LISTING:
        return (
          <PendingReturnBooks
            setStep={handleStepChange}
            handleBookConfirmation={handleBookConfirmation}
          />
        );
      case STEPS.SHELF_QR_CODE_SCANNING:
        return (
          <ShelfQrCodeScanning
            setStep={handleStepChange}
            onSubmitData={handleShelfSearch}
          />
        );
      case STEPS.LOADING:
        return <LoadingStep />;
      case STEPS.BOOK_NOT_FOUND:
        return <BookNotFound setStep={handleStepChange} />;
      case STEPS.SHELF_NOT_FOUND:
        return (
          <ShelfNotFound
            setStep={handleStepChange}
            onSubmitData={handleShelfSearch}
          />
        );
      case STEPS.SHELF_CONFIRMATION:
        return foundShelf ? (
          returnedBook ? (
            <ShelfConfirmation
              setStep={handleStepChange}
              handleSuccess={handleReturnSuccess}
              shelf={foundShelf}
              book={returnedBook}
            />
          ) : (
            <BookNotFound setStep={handleStepChange} />
          )
        ) : (
          <ShelfNotFound setStep={handleStepChange} onSubmitData={() => {}} />
        );
      case STEPS.SUCCESS:
        return <SuccessStep handleDrawerClose={closeDrawer} />;
      case STEPS.ERROR:
        return (
          <ErrorStep
            setStep={handleStepChange}
            handleDrawerClose={closeDrawer}
            feedback={feedback}
          />
        );
      default:
        return (
          <BookQrCodeScanning
            setStep={handleStepChange}
            onSubmitData={handleBookSearch}
          />
        );
    }
  }, [step]);

  return (
    <Drawer
      onClose={() =>
        setTimeout(() => setStep(STEPS.BOOK_QR_CODE_SCANNING), 300)
      }
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
