import { RentManualFillingProps } from "@/constants/forms/rent-modal-steps";
import Input from "@/design-system/input";
import { useFormContext } from "react-hook-form";

const AuthorName = () => {
  const {
    formState: { errors },
    setValue,
    register,
  } = useFormContext<RentManualFillingProps>();

  return (
    <Input
      {...register("authorName", { required: "O nome do autor é obrigatório" })}
      onChange={(e) =>
        setValue("authorName", e.target.value, { shouldValidate: true })
      }
      placeholder="Nome do autor"
      icon="avatar"
      id="author-name"
      errorMessage={errors.authorName?.message}
    />
  );
};

export default AuthorName;
