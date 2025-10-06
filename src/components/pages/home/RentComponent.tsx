import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { RENT_BUTTON_LABEL } from "@/constants/common";
import {
  RENT_MODAL_DEFAULT_VALUES,
  STEPS,
} from "@/constants/forms/rent-modal-steps";
import Button from "@/design-system/button";
import { useEffect, useMemo, useState } from "react";
import ModeSelectionStep from "./rent-modal-steps/ModeSelectionStep";
import ManualFillingStep from "./rent-modal-steps/ManualFillingStep";
import LoadingStep from "./rent-modal-steps/LoadingStep";
import BookConfirmation from "./rent-modal-steps/BookConfirmationStep";
import SuccessStep from "./rent-modal-steps/SuccessStep";
import { FormProvider, useForm } from "react-hook-form";
import BookNotFound from "./rent-modal-steps/BookNotFound";
import QrCodeScanning from "./rent-modal-steps/QrCodeScanning";
import { RentManualFillingProps } from "@/interfaces/rentDrawer";
import { IBook } from "@/interfaces/fireStore";
import ErrorStep from "./rent-modal-steps/ErrorStep";

const RentComponent = () => {
  const [foundBook, setFoundBook] = useState<IBook | undefined>(undefined);

  const methods = useForm<RentManualFillingProps>({
    defaultValues: RENT_MODAL_DEFAULT_VALUES,
    mode: "all",
    criteriaMode: "all",
  });

  const {
    formState: { isSubmitting },
  } = methods;

  const [step, setStep] = useState(STEPS.MODE_SELECTION);
  const [feedback, setFeedback] = useState<string | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      setStep(STEPS.LOADING);
    }
  }, [isSubmitting]);

  const handleBookSearch = (book: IBook | null) => {
    setFoundBook(book ?? undefined);
  };

  const closeDrawer = () => {
    setStep(STEPS.MODE_SELECTION);
    setIsOpen(false);
    setFoundBook(undefined);
    methods.reset(RENT_MODAL_DEFAULT_VALUES);
  };

  const handleStepChange = (newStep: number, feedback?: string) => {
    setStep(newStep);
    setFeedback(feedback);
  };

  const StepComponent = useMemo(() => {
    switch (step) {
      case STEPS.MODE_SELECTION:
        return <ModeSelectionStep setStep={handleStepChange} />;
      case STEPS.QR_CODE_SCANNING:
        return (
          <QrCodeScanning
            setStep={handleStepChange}
            onSubmitData={handleBookSearch}
          />
        );
      case STEPS.LOADING:
        return <LoadingStep />;
      case STEPS.MANUAL_FILLING:
        return (
          <ManualFillingStep
            setStep={handleStepChange}
            onSubmitData={handleBookSearch}
          />
        );
      case STEPS.BOOK_NOT_FOUND:
        return <BookNotFound feedback={feedback} setStep={handleStepChange} />;
      case STEPS.CONFIRMATION:
        return foundBook ? (
          <BookConfirmation setStep={handleStepChange} book={foundBook} />
        ) : (
          <BookNotFound feedback={feedback} setStep={handleStepChange} />
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
        return <ModeSelectionStep setStep={handleStepChange} />;
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
          variant="main"
          className="w-full"
          label={RENT_BUTTON_LABEL}
          type="button"
        />
      </DrawerTrigger>
      <DrawerContent>
        <FormProvider {...methods}>
          <div className="px-10 pt-8 pb-16 flex flex-col gap-y-4">
            {StepComponent}
          </div>
        </FormProvider>
      </DrawerContent>
    </Drawer>
  );
};

export default RentComponent;
