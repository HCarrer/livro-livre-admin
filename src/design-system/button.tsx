import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

interface ButtonProps {
    label?: string
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    variant?: 'main' | 'secondary' | 'tertiary' | 'outline' | 'primaryOutline'
    disabled?: boolean
}

const classNameVariants = cva(
  'px-6 py-3 min-w-[135px] h-[51px] text-f5 !leading-[16px] rounded-full font-semibold transition-all duration-100 ease-in-out hover:drop-shadow-[-2px_2px_4px_#00000030]',
  {
    variants: {
      variant: {
        main:
          'bg-power-blue text-white',
        secondary:
          'bg-navy-blue text-white',
        tertiary:
          'bg-soft-white border border-soft-lilac text-soft-lilac',
        outline:
          'border border-navy-blue text-navy-blue',
        primaryOutline:
          'border border-power-blue text-power-blue',
      },
      disabled: {
        true: 'pointer-events-none',
        false: 'cursor-pointer'
      }
    },
    compoundVariants: [
      {
        variant: 'main',
        disabled: true,
        class: 'bg-disabled-blue text-soft-lilac border border-soft-lilac'
      },
      {
        variant: 'secondary',
        disabled: true,
        class: 'bg-disabled-navy text-soft-lilac border border-soft-lilac'
      },
      {
        variant: 'tertiary',
        disabled: true,
        class: 'bg-soft-white border border-soft-blue text-soft-blue'
      },
      {
        variant: 'outline',
        disabled: true,
        class: 'border border-disabled-navy text-disabled-navy'
      },
      {
        variant: 'primaryOutline',
        disabled: true,
        class: 'border border-disabled-blue text-disabled-blue'
      }
    ],
    defaultVariants: {
      variant: 'main',
    }
  }
)


const Button = ({ label, onClick, variant = 'main', disabled = false, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={cn(classNameVariants({ variant, disabled }))}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default Button