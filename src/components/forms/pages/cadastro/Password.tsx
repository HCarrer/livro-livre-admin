import { SignUpFormProps } from "@/constants/forms/cadastro"
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
	} = useFormContext<SignUpFormProps>()

	const passwordValue = watch('password')
	const passwordConfirmationValue = watch('passwordConfirmation')

	useEffect(() => {
		if (!!passwordConfirmationValue && passwordValue != passwordConfirmationValue)
			setError('passwordConfirmation', { type: 'manual', message: 'As senhas não coincidem' })
		else if (passwordValue == passwordConfirmationValue)
			clearErrors('passwordConfirmation')
	}, [passwordValue, passwordConfirmationValue])

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue('password', e.target.value, { shouldValidate: true, shouldDirty: true })
	}

	return (
		<Input
			{...register('password', {
				required: 'Campo obrigatório'
			})}
			className="w-full"
			placeholder="Senha"
			type={showPassword ? "text" : "password"}
			icon={showPassword ? "openEye" : "closedEye"}
			onChange={handlePasswordChange}
			onIconClick={() => setShowPassword(!showPassword)}
			errorMessage={errors.password?.message}
		/>
	)
}

export default Password