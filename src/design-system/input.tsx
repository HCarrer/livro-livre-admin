import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import {
  Eye,
  EyeClosed,
  Lock,
  LockOpen,
  Mail,
  SearchIcon,
  UserRound,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  errorMessage?: string;
  icon?:
    | "search"
    | "avatar"
    | "closedEye"
    | "openEye"
    | "locked"
    | "unlocked"
    | "email";
  className?: string;
  fieldName?: string;
  onIconClick?: () => void;
}

const ICONS: Record<NonNullable<InputProps["icon"]>, React.ReactNode> = {
  search: <SearchIcon size={20} />,
  avatar: <UserRound size={20} />,
  closedEye: <EyeClosed size={20} />,
  openEye: <Eye size={20} />,
  locked: <Lock size={20} />,
  unlocked: <LockOpen size={20} />,
  email: <Mail size={20} />,
};

const classNameVariants = cva(
  "flex gap-x-3 p-4 bg-white border border-soft-lilac rounded-full text-f5 placeholder-soft-lilac text-navy-blue focus:ring-0 focus:outline-none focus:border-power-blue focus:text-navy-blue",
  {
    variants: {
      disabled: {
        true: "pointer-events-none bg-disabled-grey text-soft-lilac",
        false: "cursor-pointer",
      },
      hasError: {
        true: "border-error-red text-error-red",
        false: "",
      },
    },
  },
);

const labelClassNameVariants = cva("pl-4 text-f5 mb-1 text-navy-blue", {
  variants: {
    disabled: {
      true: "pointer-events-none text-soft-lilac",
      false: "cursor-pointer",
    },
    hasError: {
      true: "border-error-red text-error-red",
      false: "",
    },
    hasFocus: {
      true: "text-power-blue",
      false: "",
    },
  },
});

const iconClassNameVariants = cva(
  "border-r border-soft-lilac text-soft-lilac pr-3",
  {
    variants: {
      isClickable: {
        true: "cursor-pointer",
        false: "",
      },
    },
  },
);

const Input = ({
  label,
  placeholder,
  disabled = false,
  errorMessage,
  icon,
  className,
  fieldName,
  onIconClick,
  ...props
}: InputProps) => {
  const [errorMessageState, setErrorMessageState] = useState(errorMessage);
  const [hasFocus, setHasFocus] = useState(false);

  const hasError = useMemo(() => !!errorMessage, [errorMessage]);

  useEffect(() => {
    // melhorias de animação
    if (errorMessage) setErrorMessageState(errorMessage);
    else setTimeout(() => setErrorMessageState(""), 200);
  }, [errorMessage]);

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label
          className={cn(
            labelClassNameVariants({ disabled, hasError, hasFocus }),
          )}
        >
          {label}
        </label>
      )}
      <div className={cn(classNameVariants({ disabled, hasError }), className)}>
        {!!icon ? (
          <button
            className={cn(
              iconClassNameVariants({ isClickable: !!onIconClick }),
            )}
            onClick={onIconClick}
          >
            {ICONS[icon]}
          </button>
        ) : null}
        <input
          {...props}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          className="w-full bg-transparent border-0 focus:ring-0 focus:outline-none focus:border-0 p-0 m-0"
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
      <p
        // força um id aleatório se não for passado fieldName
        id={
          fieldName
            ? `error-${fieldName}`
            : `error-${Math.random().toString(36).substr(2, 9)}`
        }
        className={`pl-4 text-f7 mt-1 transition-all duration-200 ease-in-out ${hasError ? "text-error-red max-h-4" : "text-transparent max-h-0"}`}
      >
        {errorMessageState}
      </p>
    </div>
  );
};

export default Input;
