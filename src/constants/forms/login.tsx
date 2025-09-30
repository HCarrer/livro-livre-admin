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

export const LOGIN_TOAST_DICT: Record<
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
  ["username-or-password-incorrect"]: {
    content: "Nome de usuário ou senha incorretos.",
    type: "error",
  },
  ["bad-request"]: {
    content: "Erro ao processar a requisição. Tente novamente.",
    type: "error",
  },
  [LOGGED_OUT]: { content: "Desconectado com sucesso.", type: "success" },
};
