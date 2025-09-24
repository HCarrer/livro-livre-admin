import { RentManualFillingProps } from "@/constants/forms/rent-modal-steps";
import Input from "@/design-system/input";
import { useFormContext } from "react-hook-form";

const BookName = () => {
  const {
    formState: { errors },
    setValue,
    register,
  } = useFormContext<RentManualFillingProps>();

  return (
    <Input
      {...register("bookName", { required: "O nome do livro é obrigatório" })}
      onChange={(e) =>
        setValue("bookName", e.target.value, { shouldValidate: true })
      }
      placeholder="Nome do livro"
      icon="book"
      id="book-name"
      errorMessage={errors.bookName?.message}
    />
  );
};

export default BookName;
