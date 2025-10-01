export const STEPS: Record<string, number> = {
  MODE_SELECTION: 0,
  QR_CODE_SCANNING: 1,
  MANUAL_FILLING: 2,
  BOOK_NOT_FOUND: 3,
  LOADING: 4,
  CONFIRMATION: 5,
  SUCCESS: 6,
};

export interface RentModalStepProps {
  setStep: (step: number) => void;
}

export interface RentManualFillingProps {
  bookName: string;
  authorName: string;
  publisherName: string;
}

export const RENT_MODAL_DEFAULT_VALUES: RentManualFillingProps = {
  bookName: "",
  authorName: "",
  publisherName: "",
};
