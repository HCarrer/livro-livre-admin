import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import { Eye, EyeClosed, SearchIcon, UserRound } from "lucide-react"
import { useMemo, useState } from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    placeholder?: string
    disabled?: boolean
    errorMessage?: string
    icon?: 'search' | 'avatar' | 'closedEye' | 'openEye',
    className?: string
    onIconClick?: () => void
}

const ICONS: Record<NonNullable<InputProps['icon']>, React.ReactNode> = {
  search: <SearchIcon size={20}/>,
  avatar: <UserRound size={20}/>,
  closedEye: <EyeClosed size={20}/>,
  openEye: <Eye size={20}/>,
}

const classNameVariants = cva(
  'flex gap-x-3 p-4 bg-white border border-soft-lilac rounded-full text-f5 placeholder-soft-lilac text-navy-blue focus:ring-0 focus:outline-none focus:border-power-blue focus:text-navy-blue',
  {
    variants: {
      disabled: {
        true: 'pointer-events-none bg-disabled-grey text-soft-lilac',
        false: 'cursor-pointer'
      },
      hasError: {
        true: 'border-error-red text-error-red',
        false: ''
      }
    },
  }
)

const labelClassNameVariants = cva(
  'pl-4 text-f5 mb-1 text-navy-blue',
  {
    variants: {
      disabled: {
        true: 'pointer-events-none text-soft-lilac',
        false: 'cursor-pointer'
      },
      hasError: {
        true: 'border-error-red text-error-red',
        false: ''
      },
      hasFocus: {
        true: 'text-power-blue',
        false: ''
      }
    },
  }
)

const iconClassNameVariants = cva(
  'border-r border-soft-lilac text-soft-lilac pr-3',
  {
    variants: {
      isClickable: {
        true: 'cursor-pointer',
        false: ''
      }
    },
  }
)

const Input = ({ label, placeholder, disabled = false, errorMessage, icon, className, onIconClick, ...props }: InputProps) => {
    const [hasFocus, setHasFocus] = useState(false)

    const hasError = useMemo(() => !!errorMessage, [errorMessage])

    return (
        <div className={cn('flex flex-col w-full', className)}>
            {label && <label className={cn(labelClassNameVariants({ disabled, hasError, hasFocus }))}>{label}</label>}
            <div className={cn(classNameVariants({ disabled, hasError }))}>
                {!!icon ? <button className={cn(iconClassNameVariants({ isClickable: !!onIconClick }))} onClick={onIconClick}>{ICONS[icon]}</button> : null}
                <input
                    {...props}
                    onFocus={() => setHasFocus(true)}
                    onBlur={() => setHasFocus(false)}
                    className="w-full bg-transparent border-0 focus:ring-0 focus:outline-none focus:border-0 p-0 m-0"
                    placeholder={placeholder}
                    disabled={disabled}
                />
            </div>
            {hasError && <p className="pl-4 text-f7 mt-1 text-error-red">{errorMessage}</p>}
        </div>
    )
}

export default Input
