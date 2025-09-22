import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { RENT_BUTTON_LABEL } from "@/constants/common";
import {
  RENT_MODAL_DEFAULT_VALUES,
  RentManualFillingProps,
  STEPS,
} from "@/constants/forms/rent-modal-steps";
import Button from "@/design-system/button";
import { useMemo, useState } from "react";
import ModeSelectionStep from "./rent-modal-steps/ModeSelectionStep";
import ManualFillingStep from "./rent-modal-steps/ManualFillingStep";
import LoadingStep from "./rent-modal-steps/LoadingStep";
import BookConfirmation from "./rent-modal-steps/BookConfirmationStep";
import SuccessStep from "./rent-modal-steps/SuccessStep";
import { FormProvider, useForm } from "react-hook-form";

const RentComponent = () => {
  const methods = useForm<RentManualFillingProps>({
    defaultValues: RENT_MODAL_DEFAULT_VALUES,
    mode: "all",
    criteriaMode: "all",
  });

  const [step, setStep] = useState(STEPS.MODE_SELECTION);

  const StepComponent = useMemo(() => {
    switch (step) {
      case STEPS.MODE_SELECTION:
        return <ModeSelectionStep setStep={setStep} />;
      case STEPS.LOADING:
        return <LoadingStep />;
      case STEPS.MANUAL_FILLING:
        return <ManualFillingStep setStep={setStep} />;
      case STEPS.CONFIRMATION:
        return <BookConfirmation setStep={setStep} />;
      case STEPS.SUCCESS:
        return <SuccessStep />;
      default:
        return <ModeSelectionStep setStep={setStep} />;
    }
  }, [step]);

  return (
    <Drawer
      onClose={() => setTimeout(() => setStep(STEPS.MODE_SELECTION), 300)}
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
