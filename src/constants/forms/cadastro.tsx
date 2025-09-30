import { ToastProps } from "@/components/common/Toast";

export interface SignUpFormProps {
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}

export const SignUpFormDefaultValues = {
  email: "",
  username: "",
  password: "",
  passwordConfirmation: "",
};

export const SIGN_UP_TOAST_DICT: Record<
  string,
  { type: ToastProps["type"]; content: ToastProps["content"] }
> = {
  ["email-unavailable"]: {
    content: "E-mail indisponível.",
    type: "error",
  },
  ["bad-request"]: {
    content: "Erro ao criar conta. Tente novamente.",
    type: "error",
  },
  ["username-unavailable"]: {
    content: "Nome de usuário indisponível.",
    type: "error",
  },
};
