import { SignUpFormProps } from "@/constants/forms/cadastro";
import Input from "@/design-system/input";
import { useFormContext } from "react-hook-form";

const Username = () => {
  const {
    formState: { errors },
    setValue,
    register,
  } = useFormContext<SignUpFormProps>();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("username", e.target.value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <Input
      {...register("username", {
        required: "Campo obrigatório",
      })}
      className="w-full"
      placeholder="Nome de usuário"
      type="text"
      icon="avatar"
      onChange={handleUsernameChange}
      errorMessage={errors.username?.message}
    />
  );
};

export default Username;
