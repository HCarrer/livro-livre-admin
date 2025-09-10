import Image from "next/image"
import { useCallback, useMemo, useState } from "react"
import Logo from "../../../../public/icons/logo.svg"
import Link from "next/link"
import { LOGIN } from "@/constants/routes"
import { FormProvider, useForm } from "react-hook-form"
import { ForgotPasswordFormDefaultValues, ForgotPasswordFormProps } from "@/constants/forms/esqueci-minha-senha"
import EmailStep from "@/components/pages/esqueci-minha-senha/EmailStep"
import TwoFactorStep from "@/components/pages/esqueci-minha-senha/TwoFactorStep"
import NewPasswordStep from "@/components/pages/esqueci-minha-senha/NewPasswordStep"
import Skeleton from "@/components/common/Skeleton"

const ForgottenPassword = () => {
	const [currentStep, setCurrentStep] = useState<"email" | "twoFactor" | "newPassword">("email")

	const methods = useForm<ForgotPasswordFormProps>({
		defaultValues: ForgotPasswordFormDefaultValues,
		mode: 'all',
    criteriaMode: 'all'
	})
	
	const advanceStep = useCallback(() => {
		if (currentStep === "email") setCurrentStep("twoFactor")
		if (currentStep === "twoFactor") setCurrentStep("newPassword")
	}, [currentStep])
	
	const steps = useMemo(() => ({
		email: <EmailStep handleClick={advanceStep} />,
		twoFactor: <TwoFactorStep handleClick={advanceStep} />,
		newPassword: <NewPasswordStep />
	}), [advanceStep])

	return (
		<FormProvider {...methods} >
			<Skeleton>
					<div className="flex justify-center gap-x-4 items-center">
						<p className="text-f2 font-semibold flex gap-x-2 items-center">
							<Image src={Logo} width={38} height={53} alt="Logotipo - Livro Livre" />
							Alterar Senha
						</p>
					</div>
					{steps[currentStep]}
					<Link href={LOGIN}>
						<p className="text-navy-blue text-f7 w-full text-center">Voltar para o login</p>
					</Link>
			</Skeleton>
		</FormProvider>
	)
}

export default ForgottenPassword