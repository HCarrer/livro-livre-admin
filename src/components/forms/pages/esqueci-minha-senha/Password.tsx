import { ForgotPasswordFormProps } from "@/constants/forms/esqueci-minha-senha"
import Input from "@/design-system/input"
import { useEffect, useState } from "react"
import { useFormContext } from "react-hook-form"

const Password = () => {
	const [showPassword, setShowPassword] = useState(false)

	const {
		formState: { errors },
		setValue,
		register,
		watch,
		setError,
		clearErrors
	} = useFormContext<ForgotPasswordFormProps>()

	const newPasswordValue = watch('newPassword')
	const newPasswordConfirmationValue = watch('newPasswordConfirmation')

	useEffect(() => {
		if (!!newPasswordConfirmationValue && newPasswordValue !== newPasswordConfirmationValue)
			setError('newPasswordConfirmation', { type: 'manual', message: 'As senhas não coincidem' })
		else if (newPasswordValue === newPasswordConfirmationValue)
			clearErrors('newPasswordConfirmation')
	}, [newPasswordValue, newPasswordConfirmationValue])

	const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue('newPassword', e.target.value, { shouldValidate: true, shouldDirty: true })
	}

	return (
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
	)
}

export default Password