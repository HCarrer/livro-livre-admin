import { IBook } from "./fireStore";

export interface RentModalStepProps {
  setStep: (step: number) => void;
}

export interface RentManualFillingProps {
  bookName: string;
  authorName: string;
  publisherName: string;
}

export interface ManualFillingStepProps extends RentModalStepProps {
  onSubmitData?: (data: IBook | null) => void;
}
