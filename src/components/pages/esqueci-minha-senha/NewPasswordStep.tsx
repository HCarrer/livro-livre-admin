import { ForgotPasswordFormProps } from "@/constants/forms/esqueci-minha-senha"
import { LOGIN } from "@/constants/routes"
import Button from "@/design-system/button"
import Input from "@/design-system/input"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"

const NewPasswordStep = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

	const {
		formState: { errors, isValid },
		setValue,
		register,
		watch,
		clearErrors,
		handleSubmit
	} = useFormContext<ForgotPasswordFormProps>()

	const router = useRouter()

	const newPasswordValue = watch('newPassword')
	const newPasswordConfirmationValue = watch('newPasswordConfirmation')

	const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue('newPassword', e.target.value, { shouldValidate: true, shouldDirty: true })
	}

	const handleNewPasswordConfirmationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue('newPasswordConfirmation', e.target.value, { shouldValidate: true, shouldDirty: true })
	}

	useEffect(() => {
		if (newPasswordValue == newPasswordConfirmationValue)
			clearErrors('newPasswordConfirmation')
	}, [newPasswordValue, newPasswordConfirmationValue])

	const onSubmit = (data: ForgotPasswordFormProps) => {
		// TODO: deixar login funcional e hashear senha
		console.log(data)
		router.push(LOGIN)
	}

	return (
		<>
			<Input
				{...register('newPassword', {
					required: 'Campo obrigatório'
				})}
				className="w-full"
				placeholder="Nova senha"
				type={showPassword ? "text" : "password"}
				icon={showPassword ? "openEye" : "closedEye"}
				onChange={handleNewPasswordChange}
				onIconClick={() => setShowPassword(!showPassword)}
				errorMessage={errors.newPassword?.message}
			/>
			<Input
				{...register('newPasswordConfirmation', {
					required: 'Campo obrigatório',
					validate: value => value === newPasswordValue || 'As senhas não coincidem'
				})}
				className="w-full"
				placeholder="Confirme sua nova senha"
				type={showPassword ? "text" : "password"}
				icon={showPasswordConfirmation ? "openEye" : "closedEye"}
				onChange={handleNewPasswordConfirmationChange}
				onIconClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
				errorMessage={errors.newPasswordConfirmation?.message}
			/>
			<Button label="Alterar senha" variant="main" disabled={!isValid} type="submit" onClick={handleSubmit(onSubmit)} className="w-full"/>
		</>
	)
}

export default NewPasswordStep