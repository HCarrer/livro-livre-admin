import Image from "next/image"
import { useCallback, useMemo, useState } from "react"
import Logo from "../../../../public/icons/logo.svg"
import Background from "../../../../public/icons/background.svg"
import Link from "next/link"
import { LOGIN } from "@/constants/routes"
import { FormProvider, useForm } from "react-hook-form"
import { ForgotPasswordFormDefaultValues, ForgotPasswordFormProps } from "@/constants/forms/esqueci-minha-senha"
import EmailStep from "@/constants/pages/esqueci-minha-senha/EmailStep"
import TwoFactorStep from "@/constants/pages/esqueci-minha-senha/TwoFactorStep"
import NewPasswordStep from "@/constants/pages/esqueci-minha-senha/NewPasswordStep"

const ForgottenPassword = () => {
	const [currentStep, setCurrentStep] = useState<"email" | "twoFactor" | "newPassword">("email")

	const methods = useForm<ForgotPasswordFormProps>({
		defaultValues: ForgotPasswordFormDefaultValues,
		mode: 'all',
    criteriaMode: 'all'
	})

	const advanceStep = useCallback(() => {
		if (currentStep === "email") setCurrentStep("twoFactor")
		else if (currentStep === "twoFactor") setCurrentStep("newPassword")
	}, [currentStep])

	const memoContent = useMemo(() => {
		if (currentStep === "email") return <EmailStep handleClick={advanceStep} />
		if (currentStep === "twoFactor") return <TwoFactorStep handleClick={advanceStep} />
		if (currentStep === "newPassword") return <NewPasswordStep />
	}, [currentStep, advanceStep])

	return (
		<FormProvider {...methods} >
			<div className="relative w-screen h-screen px-6 py-8 flex items-center justify-center">
				<div className="z-2 w-full flex flex-col justify-center items-center gap-y-4">
					<div className="flex justify-center gap-x-4 items-center">
						<p className="text-f2 font-semibold flex gap-x-2 items-center">
							<Image src={Logo} width={38} height={53} alt="Logotipo - Livro Livre" />
							Alterar Senha
						</p>
					</div>
					{memoContent}
					<Link href={LOGIN}>
						<p className="text-navy-blue text-f7 w-full text-center">Voltar para o login</p>
					</Link>
				</div>
				<Image src={Background} width={496} height={744} alt="Marca D'agua - Livro Livre" className="absolute z-1" />
			</div>
		</FormProvider>
	)
}

export default ForgottenPassword