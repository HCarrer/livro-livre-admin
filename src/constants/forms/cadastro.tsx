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

export const TOAST_DICT: Record<
  string,
  { type: ToastProps["type"]; content: ToastProps["content"] }
> = {
  ["email-unavailable"]: {
    content: "E-mail já está em uso.",
    type: "error",
  },
  ["generic-error"]: {
    content: "Erro ao criar conta. Tente novamente.",
    type: "error",
  },
};
