"use client";

import Button from "@/design-system/button";
import Image from "next/image";
import GoogleIcon from "#/icons/google.svg";
import Logo from "#/icons/logo.svg";
import Link from "next/link";
import {
  ACCESS_DENIED,
  BOOLEAN_QUERY,
  HOME,
  LOGGED_OUT,
  RESET_PASSWORD,
  SIGNUP,
} from "@/constants/routes";
import { FormProvider, useForm } from "react-hook-form";
import {
  LoginFormDefaultValues,
  LoginFormProps,
  LOGIN_TOAST_DICT,
} from "@/constants/forms/login";
import Skeleton from "@/components/common/Skeleton";
import Username from "@/components/forms/pages/login/Username";
import Password from "@/components/forms/pages/login/Password";
import router, { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import Toast from "@/components/common/Toast";
import { useEffect, useState } from "react";
import { login, loginWithGoogle } from "@/services/authentication";

const GoogleButtonContent = ({
  triggerError,
}: {
  triggerError: (error: string) => void;
}) => {
  const router = useRouter();

  const handleClick = async () => {
    const { success, toastId } = await loginWithGoogle();
    if (success) {
      return router.push(HOME);
    } else triggerError(toastId);
  };

  return (
    <Button variant="tertiary" className="w-full" onClick={handleClick}>
      <p className="flex gap-x-4 justify-center items-center">
        <Image
          src={GoogleIcon}
          width={24}
          height={24}
          alt="Logomarca - Google"
        />
        <span className="text-f5 font-semibold">Google</span>
      </p>
    </Button>
  );
};

const Login = () => {
  const [formError, setFormError] = useState<
    keyof typeof LOGIN_TOAST_DICT | null
  >(null);

  const methods = useForm<LoginFormProps>({
    defaultValues: LoginFormDefaultValues,
    mode: "all",
    criteriaMode: "all",
  });

  const {
    formState: { isValid, isSubmitting },
    handleSubmit,
  } = methods;

  const accessDenied =
    useSearchParams().get(ACCESS_DENIED) === BOOLEAN_QUERY.TRUE;
  const loggedOut = useSearchParams().get(LOGGED_OUT) === BOOLEAN_QUERY.TRUE;

  useEffect(() => {
    if (accessDenied) setFormError(ACCESS_DENIED);
    if (loggedOut) setFormError(LOGGED_OUT);
  }, [accessDenied, loggedOut]);

  const onSubmit = async (data: LoginFormProps) => {
    setFormError(null);
    const { username, password } = data;
    const { success, toastId } = await login(username, password);
    if (success) {
      return router.push(HOME);
    } else {
      setFormError(toastId as keyof typeof LOGIN_TOAST_DICT);
    }
  };

  return (
    <Skeleton>
      {formError ? (
        <Toast
          content={LOGIN_TOAST_DICT[formError].content || formError}
          type={LOGIN_TOAST_DICT[formError].type || "error"}
        />
      ) : null}
      <div className="flex justify-center gap-x-4 items-center">
        <p className="text-f2 font-bold text-navy-blue flex gap-x-2 items-center">
          <Image
            src={Logo}
            width={38}
            height={53}
            alt="Logotipo - Livro Livre"
          />
          Bem vindo!
        </p>
      </div>
      <FormProvider {...methods}>
        <Username />
        <Password />
      </FormProvider>
      <Button
        label="Realizar login"
        variant="main"
        disabled={!isValid}
        onClick={handleSubmit(onSubmit)}
        loading={isSubmitting}
        className="w-full"
      />
      <div className="w-full flex justify-between text-f7">
        <Link href={RESET_PASSWORD}>
          <p className="text-navy-blue">Esqueci minha senha</p>
        </Link>
        <Link href={SIGNUP}>
          <p className="text-power-blue">Quero criar uma conta</p>
        </Link>
      </div>
      <div
        className="w-full h-0.5 bg-[#D9D9D9] rounded rounded-full"
        id="separator-bar"
      />
      <GoogleButtonContent triggerError={setFormError} />
    </Skeleton>
  );
};

export default Login;
