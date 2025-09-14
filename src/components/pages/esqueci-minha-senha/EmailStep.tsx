import Email from "@/components/forms/pages/esqueci-minha-senha/Email"
import { ForgotPasswordFormProps } from "@/constants/forms/esqueci-minha-senha"
import Button from "@/design-system/button"
import { useMemo } from "react"
import { useFormContext } from "react-hook-form"

const EmailStep = ({handleClick} : {handleClick: () => void}) => {
	const {
		watch,
	} = useFormContext<ForgotPasswordFormProps>()

	const emailValue = watch('email')

	const shouldDisableEmailButton = useMemo(() => {
		if (!emailValue) return true
		if (emailValue) {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
			return !emailRegex.test(emailValue)
		}
	}, [emailValue])

	return (
		<>
			<Email />
			<Button label="Continuar" variant="main" disabled={shouldDisableEmailButton} type="submit" onClick={handleClick} className="w-full"/>
		</>
	)
}

export default EmailStep