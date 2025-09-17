import { LoginFormProps } from "@/constants/forms/login";
import Input from "@/design-system/input";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

const Password = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    formState: { errors },
    setValue,
    register,
  } = useFormContext<LoginFormProps>();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("password", e.target.value, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <Input
      {...register("password", {
        required: "Campo obrigatório",
      })}
      className="w-full"
      placeholder="Senha"
      type={showPassword ? "text" : "password"}
      icon={showPassword ? "openEye" : "closedEye"}
      onIconClick={() => setShowPassword(!showPassword)}
      onChange={handlePasswordChange}
      errorMessage={errors.password?.message}
    />
  );
};

export default Password;
