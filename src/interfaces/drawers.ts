import { IRentHistoryFacets } from "./facets";
import { IBook } from "./fireStore";

export interface ModalStepProps {
  setStep: (step: number, feedback?: string) => void;
}

export interface RentManualFillingProps {
  bookName: string;
  authorName: string;
  publisherName: string;
}

export interface ManualFillingStepProps extends ModalStepProps {
  onSubmitData?: (data: IBook | null) => void;
}

export interface DrawerButtonProps {
  facets?: IRentHistoryFacets;
}
