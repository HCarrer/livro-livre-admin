import { RentManualFillingProps } from "@/interfaces/drawers";

export const STEPS: Record<string, number> = {
  MODE_SELECTION: 0,
  QR_CODE_SCANNING: 1,
  MANUAL_FILLING: 2,
  BOOK_NOT_FOUND: 3,
  LOADING: 4,
  CONFIRMATION: 5,
  SUCCESS: 6,
  ERROR: 7,
};

export const RENT_MODAL_DEFAULT_VALUES: RentManualFillingProps = {
  bookName: "",
  authorName: "",
  publisherName: "",
};

export const MAX_SIMULTANEOUS_RENTS = 3;
