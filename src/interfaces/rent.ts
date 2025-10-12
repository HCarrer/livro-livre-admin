import { IBook, IRent } from "./fireStore";

export interface IRentHistory {
  book: IBook;
  rentAt: string;
  rentShelf: IRent["rentShelf"];
  returnedAt: string;
  returnShelf: IRent["returnShelf"];
  status: IRent["status"];
}
