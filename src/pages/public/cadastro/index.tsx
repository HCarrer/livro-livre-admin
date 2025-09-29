import Button from "@/design-system/button";
import Image from "next/image";
import Logo from "#/icons/logo.svg";
import Link from "next/link";
import { HOME, LOGIN } from "@/constants/routes";
import { FormProvider, useForm } from "react-hook-form";
import Skeleton from "@/components/common/Skeleton";
import {
  SignUpFormDefaultValues,
  SignUpFormProps,
  TOAST_DICT,
} from "@/constants/forms/cadastro";
import { useRouter } from "next/router";
import Email from "@/components/forms/pages/cadastro/Email";
import Username from "@/components/forms/pages/cadastro/Username";
import Password from "@/components/forms/pages/cadastro/Password";
import PasswordConfirmation from "@/components/forms/pages/cadastro/PasswordConfirmation";
import { EMAIL_REGEX } from "@/constants/forms/common";
import { createUserWithEmailAndPassword } from "firebase/auth/web-extension";
import { auth, db } from "+/authentication/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import axios from "axios";
import { useState } from "react";
import Toast from "@/components/common/Toast";

const SignUp = () => {
  const [formError, setFormError] = useState<string | null>(null);
  const methods = useForm<SignUpFormProps>({
    defaultValues: SignUpFormDefaultValues,
    mode: "all",
    criteriaMode: "all",
  });

  const {
    formState: { isValid, isSubmitting },
    handleSubmit,
    setError,
  } = methods;

  const router = useRouter();

  const onSubmit = async (data: SignUpFormProps) => {
    const { email, password, passwordConfirmation, username } = data;
    let hasError = false;

    if (!EMAIL_REGEX.test(email)) {
      setError("email", {
        type: "manual",
        message: "Formato inválido de e-mail",
      });
      hasError = true;
    }
    if (password.length < 6) {
      setError("password", {
        type: "manual",
        message: "A senha deve ter no mínimo 6 caracteres",
      });
      hasError = true;
    }
    if (password !== passwordConfirmation) {
      setError("passwordConfirmation", {
        type: "manual",
        message: "As senhas não coincidem",
      });
      hasError = true;
    }
    if (hasError) {
      return false;
    }
    setFormError(null);
    // TODO: Verificar se o username já existe
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const token = user ? await user.getIdToken() : null;
        if (user) {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnapshot = await getDoc(userDocRef);
          if (!userDocSnapshot.exists()) {
            await setDoc(userDocRef, {
              email: email,
              name: username,
              profilePicture: "",
              createdAt: new Date(),
              token: token,
              hasClosedWelcomeBanner: false,
              updatedAt: new Date(),
            });
          }
        }
        await axios.post("/api/session", { token: token });
        return router.push(HOME);
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/email-already-in-use") {
          setFormError("email-unavailable");
        } else {
          setFormError("generic-error");
        }
      });
  };

  return (
    <Skeleton>
      {formError ? (
        <Toast
          content={TOAST_DICT[formError].content}
          type={TOAST_DICT[formError].type}
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
          Cadastro
        </p>
      </div>
      <FormProvider {...methods}>
        <Email />
        <Username />
        <Password />
        <PasswordConfirmation />
      </FormProvider>
      <div className="flex justify-between w-full gap-x-4">
        <Link href={LOGIN} className="w-full">
          <Button
            label="Voltar"
            variant="tertiary"
            type="button"
            className="w-full"
          />
        </Link>
        <Button
          label="Criar conta"
          variant="main"
          disabled={!isValid}
          loading={isSubmitting}
          onClick={handleSubmit(onSubmit)}
          className="w-full"
        />
      </div>
    </Skeleton>
  );
};

export default SignUp;
