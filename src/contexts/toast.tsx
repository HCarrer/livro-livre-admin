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

  console.log("ToastProvider render, current toast:", toast);

  const showToast = (
    content: ToastProps["content"],
    type: ToastProps["type"] = "success",
    duration: ToastProps["duration"] = 3000,
  ) => {
    console.log(`called showToast with content: ${content}`);
    setToast({ content, type, duration });
    setTimeout(() => {
      setToast(null);
    }, duration);
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
