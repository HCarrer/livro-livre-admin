import Toast, { ToastProps } from "@/components/common/Toast";
import { createContext, useContext, useState } from "react";

interface ToastContextType {
  showToast: (
    content: ToastProps["content"],
    type?: ToastProps["type"],
    duration?: ToastProps["duration"],
  ) => void;
}

const initialContext: ToastContextType = {
  showToast: () => {},
};

export const ToastContext = createContext<ToastContextType>(initialContext);
export const useToast = (): ToastContextType => useContext(ToastContext);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<{
    content: ToastProps["content"];
    type: ToastProps["type"];
    duration: ToastProps["duration"];
  } | null>(null);

  const showToast = (
    content: ToastProps["content"],
    type: ToastProps["type"] = "success",
    duration: ToastProps["duration"] = 5,
  ) => {
    setToast({ content, type, duration });
    // resetta o toast depois de (duration + 1)s por garantir que ele desapareceu
    const timer = setTimeout(
      () => {
        setToast(null);
      },
      (duration + 1) * 1000,
    );
    return () => clearTimeout(timer);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {toast ? (
        <Toast
          content={toast.content}
          type={toast.type}
          duration={toast.duration}
        />
      ) : null}
      {children}
    </ToastContext.Provider>
  );
}
