import { RentManualFillingProps } from "@/constants/forms/rent-modal-steps";
import Input from "@/design-system/input";
import { useFormContext } from "react-hook-form";

const PublisherName = () => {
  const {
    formState: { errors },
    setValue,
    register,
  } = useFormContext<RentManualFillingProps>();

  return (
    <Input
      {...register("publisherName", {
        required: "O nome da editora é obrigatório",
      })}
      onChange={(e) =>
        setValue("publisherName", e.target.value, { shouldValidate: true })
      }
      placeholder="Nome da editora"
      icon="file"
      id="publisher-name"
      errorMessage={errors.publisherName?.message}
    />
  );
};

export default PublisherName;
