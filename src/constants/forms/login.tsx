import { ToastProps } from "@/components/common/Toast";
import { ACCESS_DENIED, LOGGED_OUT } from "../routes";

export interface LoginFormProps {
  username: string;
  password: string;
}

export const LoginFormDefaultValues = {
  username: "",
  password: "",
};

export const TOAST_DICT: Record<
  string,
  { type: ToastProps["type"]; content: ToastProps["content"] }
> = {
  [ACCESS_DENIED]: {
    type: "error",
    content: (
      <p>
        Acesso negado.
        <br />
        Faça login para continuar.
      </p>
    ),
  },
  ["no-user-found"]: { content: "Usuário não encontrado.", type: "error" },
  ["email-or-password-incorrect"]: {
    content: "E-mail ou senha incorretos.",
    type: "error",
  },
  [LOGGED_OUT]: { content: "Desconectado com sucesso.", type: "success" },
};
