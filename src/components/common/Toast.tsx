import { cva } from "class-variance-authority";
import { LucideX } from "lucide-react";
import { useEffect, useState } from "react";

export interface ToastProps {
  content: string | React.ReactNode;
  type?: "success" | "error" | "warning";
  duration?: number;
}

const toastVariants = cva(
  "fixed top-5 z-60 px-2 py-1 rounded border-b-2 border-l-2 font-normal text-f5 flex gap-x-4 max-w-2/3 items-center transition-all duration-300 ease-in-out",
  {
    variants: {
      type: {
        success: "bg-power-blue/60 text-white border-power-blue",
        error: "bg-error-red-dark text-white border-error-red",
        warning: "bg-disabled-blue text-black border-power-blue",
      },
      fullyOnView: {
        true: "right-5",
        false: "right-[-200%]",
      },
    },
  },
);

const Toast = ({ content, type = "warning", duration = 5 }: ToastProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [fullyOnView, setFullyOnView] = useState(false);

  const closeToast = () => {
    setFullyOnView(false);
    setTimeout(() => {
      setIsOpen(false);
    }, 500); // 500ms
  };

  useEffect(() => {
    const moveTimer = setTimeout(() => {
      setFullyOnView(true);
    }, 300); // 300ms
    return () => clearTimeout(moveTimer);
  }, []);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        closeToast();
      }, duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  if (!isOpen) return null;

  return (
    <div id="toast-root" className={toastVariants({ type, fullyOnView })}>
      {content}
      <LucideX
        size={8}
        className="cursor-pointer shrink-0"
        onClick={closeToast}
      />
    </div>
  );
};

export default Toast;
