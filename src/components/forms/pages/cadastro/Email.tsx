import { SignUpFormProps } from "@/constants/forms/cadastro";
import Input from "@/design-system/input";
import { useFormContext } from "react-hook-form";

const Email = () => {
  const {
    formState: { errors },
    setValue,
    register,
  } = useFormContext<SignUpFormProps>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("email", e.target.value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <Input
      {...register("email", {
        required: "Campo obrigatório",
      })}
      className="w-full"
      placeholder="E-mail"
      type="text"
      icon="email"
      onChange={handleChange}
      errorMessage={errors.email?.message}
    />
  );
};

export default Email;
