import { ForgotPasswordFormProps } from "@/constants/forms/esqueci-minha-senha"
import Button from "@/design-system/button"
import Input from "@/design-system/input"
import { useMemo } from "react"
import { useFormContext } from "react-hook-form"

const TwoFactorStep = ({handleClick} : {handleClick: () => void}) => {
	const {
		formState: { errors },
		setValue,
		register,
		watch,
	} = useFormContext<ForgotPasswordFormProps>()

	const twoFactorCodeValue = watch('twoFactorCode')
	const emailValue = watch('email')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue('twoFactorCode', e.target.value, { shouldValidate: true, shouldDirty: true })
	}

	const shouldDisableTwoFactorButton = useMemo(() => {
		if (!twoFactorCodeValue) return true
		if (twoFactorCodeValue) {
			const twoFactorCodeRegex = /^\d{6}$/
			return !twoFactorCodeRegex.test(twoFactorCodeValue)
		}
	}, [twoFactorCodeValue])

	return (
		<>
			<p className="text-navy-blue text-f6">Preencha os campos abaixo com os 6 dígitos que enviamos para o e-mail{' '}
				<span className="text-power-blue font-semibold">
				{emailValue}
				</span>
			</p>
			<Input
				{...register('twoFactorCode', {
					required: 'Campo obrigatório'
				})}
				maxLength={6}
				className="w-full"
				placeholder="Código de 6 dígitos"
				type="text"
				icon={shouldDisableTwoFactorButton ? "locked" : "unlocked"}
				onChange={handleChange}
				errorMessage={errors.twoFactorCode?.message}
			/>
			<Button label="Continuar" variant="main" disabled={shouldDisableTwoFactorButton} type="submit" onClick={handleClick} className="w-full"/>
		</>
	)
}

export default TwoFactorStep