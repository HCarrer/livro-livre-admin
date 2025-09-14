import { ForgotPasswordFormProps } from "@/constants/forms/esqueci-minha-senha"
import Button from "@/design-system/button"
import Input from "@/design-system/input"
import { useMemo } from "react"
import { useFormContext } from "react-hook-form"

const EmailStep = ({handleClick} : {handleClick: () => void}) => {
	const {
		formState: { errors },
		setValue,
		register,
		watch,
	} = useFormContext<ForgotPasswordFormProps>()

	const emailValue = watch('email')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue('email', e.target.value, { shouldValidate: true, shouldDirty: true })
	}

		const shouldDisableEmailButton = useMemo(() => {
			if (!emailValue) return true
			if (emailValue) {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
				return !emailRegex.test(emailValue)
			}
		}, [emailValue])

	return (
		<>
			<Input
				{...register('email', {
					required: 'Campo obrigatório'
				})}
				className="w-full"
				placeholder="E-mail"
				type="text"
				icon="email"
				onChange={handleChange}
				errorMessage={errors.email?.message}
			/>
			<Button label="Continuar" variant="main" disabled={shouldDisableEmailButton} type="submit" onClick={handleClick} className="w-full"/>
		</>
	)
}

export default EmailStep