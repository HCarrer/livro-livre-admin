import { SignUpFormProps } from "@/constants/forms/cadastro"
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
	} = useFormContext<SignUpFormProps>()

	const passwordValue = watch('password')

	const handlePasswordConfirmationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue('passwordConfirmation', e.target.value, { shouldValidate: true, shouldDirty: true })
	}

	return (
		<Input
			{...register('passwordConfirmation', {
				required: 'Campo obrigatório',
				validate: value => value === passwordValue || 'As senhas não coincidem'
			})}
			className="w-full"
			placeholder="Confirme sua senha"
			type={showPassword ? "text" : "password"}
			icon={showPassword ? "openEye" : "closedEye"}
			onChange={handlePasswordConfirmationChange}
			onIconClick={() => setShowPassword(!showPassword)}
			errorMessage={errors.passwordConfirmation?.message}
		/>
	)
}

export default PasswordConfirmation