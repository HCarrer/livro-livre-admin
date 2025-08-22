interface ButtonProps {
    label?: string
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
    variant?: 'main' | 'secondary' | 'tertiary' | 'outline' | 'primaryOutline'
    disabled?: boolean
}

const BASE_CLASSNAME = 'px-6 py-3 min-w-[135px] h-[51px] text-f5 !leading-[16px] rounded-full font-semibold '

const VARIANT_CLASSNAME = {
  main: 'bg-power-blue text-white',
  secondary: 'bg-navy-blue text-white',
  tertiary: 'bg-soft-white border border-soft-lilac text-soft-lilac',
  outline: 'bg-white border border-navy-blue text-navy-blue',
  primaryOutline: 'bg-white border border-power-blue text-power-blue',
}

const  DISABLED_CLASSNAME = {
  main: 'bg-disabled-blue text-soft-lilac border border-soft-lilac',
  secondary: 'bg-disabled-navy text-soft-lilac border border-soft-lilac',
  tertiary: 'bg-soft-white border border-soft-blue text-soft-blue',
  outline: 'bg-white border border-disabled-navy text-disabled-navy',
  primaryOutline: 'bg-white border border-disabled-blue text-disabled-blue',
}

const HOVER_CLASSNAME = 'transition-all duration-100 ease-in-out hover:drop-shadow-[-2px_2px_4px_#00000030]'


const Button = ({label, onClick, variant = 'main', disabled = false, ...props }: ButtonProps) => {
  return (
    <button
      className={`${BASE_CLASSNAME} ${disabled ? DISABLED_CLASSNAME[variant] : `${VARIANT_CLASSNAME[variant]} ${HOVER_CLASSNAME} cursor-pointer`}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  );
}

export default Button