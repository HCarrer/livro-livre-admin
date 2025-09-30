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
  TOAST_DICT,
} from "@/constants/forms/login";
import Skeleton from "@/components/common/Skeleton";
import Username from "@/components/forms/pages/login/Username";
import Password from "@/components/forms/pages/login/Password";
import { auth, db } from "+/authentication/firebase";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import router, { useRouter } from "next/router";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Toast from "@/components/common/Toast";
import { useEffect, useState } from "react";

const GoogleButtonContent = () => {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const router = useRouter();

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = user ? await user.getIdToken() : null;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (!userDocSnapshot.exists()) {
          await setDoc(userDocRef, {
            email: user.email,
            name: user.displayName,
            profilePicture: user.photoURL,
            createdAt: new Date(),
            token: token,
            hasClosedWelcomeBanner: false,
            updatedAt: new Date(),
            // Adicione outros campos padrão conforme necessário
          });
        }
      }
      await axios.post("/api/session", { token: token });
      return router.push(HOME);
    } catch (error) {
      console.error("Erro ao fazer login com Google:", error);
    }
  };

  return (
    <Button variant="tertiary" className="w-full" onClick={loginWithGoogle}>
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
  const [formError, setFormError] = useState<keyof typeof TOAST_DICT | null>(
    null,
  );

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
    // espera meio segundo para simular tempo de resposta da API
    await new Promise((resolve) => setTimeout(resolve, 500));
    const { username, password } = data;
    const userDocRef = collection(db, "users");
    const q = query(userDocRef, where("name", "==", username));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      setFormError("username-or-password-incorrect");
      return;
    }
    const email = querySnapshot.docs[0].data().email;
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const token = user ? await user.getIdToken() : null;
        await axios.post("/api/session", { token: token });
        return router.push(HOME);
      })
      .catch(() => {
        setFormError("username-or-password-incorrect");
      });
  };

  return (
    <Skeleton>
      {formError ? (
        <Toast
          content={TOAST_DICT[formError].content || formError}
          type={TOAST_DICT[formError].type || "error"}
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
      <GoogleButtonContent />
    </Skeleton>
  );
};

export default Login;
