import Password from "@/components/forms/pages/esqueci-minha-senha/Password"
import PasswordConfirmation from "@/components/forms/pages/esqueci-minha-senha/PasswordConfirmation"
import { ForgotPasswordFormProps } from "@/constants/forms/esqueci-minha-senha"
import { LOGIN } from "@/constants/routes"
import Button from "@/design-system/button"
import { useRouter } from "next/router"
import { useFormContext } from "react-hook-form"

const NewPasswordStep = () => {
	const {
		formState: { isValid },
		handleSubmit,
	} = useFormContext<ForgotPasswordFormProps>()

	const router = useRouter()

	const onSubmit = (data: ForgotPasswordFormProps) => {
		// TODO: deixar login funcional e hashear senha
		console.log(data)
		router.push(LOGIN)
	}

	return (
		<>
			<Password />
			<PasswordConfirmation />
			<Button label="Alterar senha" variant="main" disabled={!isValid} type="submit" onClick={handleSubmit(onSubmit)} className="w-full"/>
		</>
	)
}

export default NewPasswordStep