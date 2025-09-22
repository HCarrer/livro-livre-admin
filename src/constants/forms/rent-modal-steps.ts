export const STEPS = {
  MODE_SELECTION: 0,
  MANUAL_FILLING: 1,
  LOADING: 2,
  CONFIRMATION: 3,
  SUCCESS: 4,
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
