import { ForgotPasswordFormProps } from "@/constants/forms/esqueci-minha-senha"
import Input from "@/design-system/input"
import { useState } from "react"
import { useFormContext } from "react-hook-form"

const PasswordConfirmation = () => {
	const [showPassword, setShowPassword] = useState(false)

	const {
		formState: { errors },
		setValue,
		register,
		watch
	} = useFormContext<ForgotPasswordFormProps>()
	
	const newPasswordValue = watch('newPassword')

	const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue('newPasswordConfirmation', e.target.value, { shouldValidate: true, shouldDirty: true })
	}

	return (
		<Input
			{...register('newPasswordConfirmation', {
				required: 'Campo obrigatório',
				validate: value => value === newPasswordValue || 'As senhas não coincidem'
			})}
			className="w-full"
			placeholder="Confirme sua nova senha"
			type={showPassword ? "text" : "password"}
			icon={showPassword ? "openEye" : "closedEye"}
			onChange={handleNewPasswordChange}
			onIconClick={() => setShowPassword(!showPassword)}
			errorMessage={errors.newPasswordConfirmation?.message}
		/>
	)
}

export default PasswordConfirmation