import { ToastProps } from "@/components/common/Toast";

export const LOGOUT_TOAST_DICT: Record<
  string,
  { type: ToastProps["type"]; content: ToastProps["content"] }
> = {
  ["bad-request"]: {
    content: "Erro ao desconectar. Tente novamente",
    type: "error",
  },
};
