import Button from "@/design-system/button"
import Input from "@/design-system/input"
import Image from "next/image"
import { useCallback, useEffect, useMemo, useState } from "react"
import Logo from "../../../../public/icons/logo.svg"
import Background from "../../../../public/icons/background.svg"
import Link from "next/link"
import { LOGIN } from "@/constants/routes"
import { useForm } from "react-hook-form"
import { ForgotPasswordFormDefaultValues, ForgotPasswordFormProps } from "@/constants/forms/esqueci-minha-senha"

const Login = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)
	const [currentStep, setCurrentStep] = useState<"email" | "twoFactor" | "newPassword">("email")

	const {
		formState: { isValid, errors },
		setValue,
		register,
		handleSubmit,
		watch,
		clearErrors
	} = useForm<ForgotPasswordFormProps>({
		defaultValues: ForgotPasswordFormDefaultValues,
		mode: 'all',
    criteriaMode: 'all'
	})

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue('email', e.target.value, { shouldValidate: true, shouldDirty: true })
	}

	const emailValue = watch('email')
	const twoFactorCodeValue = watch('twoFactorCode')
	const newPasswordValue = watch('newPassword')
	const newPasswordConfirmationValue = watch('newPasswordConfirmation')

	const handleTwoFactorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue('twoFactorCode', e.target.value, { shouldValidate: true, shouldDirty: true })
	}

	const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue('newPassword', e.target.value, { shouldValidate: true, shouldDirty: true })
	}

	const handleNewPasswordConfirmationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue('newPasswordConfirmation', e.target.value, { shouldValidate: true, shouldDirty: true })
	}

	const onSubmit = (data: ForgotPasswordFormProps) => {
		// TODO: deixar login funcional e hashear senha
		console.log(data)
	}

	const advanceStep = useCallback(() => {
		if (currentStep === "email") setCurrentStep("twoFactor")
		else if (currentStep === "twoFactor") setCurrentStep("newPassword")
	}, [currentStep])

	const shouldDisableEmailButton = useMemo(() => {
		if (!emailValue) return true
		if (emailValue) {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
			return !emailRegex.test(emailValue)
		}
	}, [emailValue])

	const shouldDisableTwoFactorButton = useMemo(() => {
		if (!twoFactorCodeValue) return true
		if (twoFactorCodeValue) {
			const twoFactorCodeRegex = /^\d{6}$/
			return !twoFactorCodeRegex.test(twoFactorCodeValue)
		}
	}, [twoFactorCodeValue])

	useEffect(() => {
		if (newPasswordValue == newPasswordConfirmationValue)
			clearErrors('newPasswordConfirmation')
	}, [newPasswordValue, newPasswordConfirmationValue])

	const EmailStepContent = useMemo(() => (
		<>
			<Input
				{...register('email', {
					required: 'Campo obrigatório'
				})}
				className="w-full"
				placeholder="E-mail"
				type="text"
				icon="avatar"
				onChange={handleEmailChange}
				errorMessage={errors.email?.message}
			/>
			<Button label="Continuar" variant="main" disabled={shouldDisableEmailButton} type="submit" onClick={advanceStep} className="w-full"/>
		</>
	), [shouldDisableEmailButton, advanceStep, handleEmailChange, register, errors.email?.message])

	const TwoFactorStepContent = useMemo(() => (
		<>
			<p className="text-navy-blue text-f6">Preencha os campos abaixo com os 6 dígitos que enviamos para o e-mail <span className="text-power-blue font-semibold">{emailValue}</span></p>
			<Input
				{...register('twoFactorCode', {
					required: 'Campo obrigatório'
				})}
				maxLength={6}
				className="w-full"
				placeholder="Código de 6 dígitos"
				type="text"
				icon={shouldDisableTwoFactorButton ? "locked" : "unlocked"}
				onChange={handleTwoFactorChange}
				errorMessage={errors.twoFactorCode?.message}
			/>
			<Button label="Continuar" variant="main" disabled={shouldDisableTwoFactorButton} type="submit" onClick={advanceStep} className="w-full"/>
		</>
	), [shouldDisableTwoFactorButton, advanceStep, handleTwoFactorChange, register, errors.twoFactorCode?.message, emailValue])

	const NewPasswordContent = useMemo(() => (
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
	), [handleNewPasswordConfirmationChange, register, errors, newPasswordValue])

	return (
		<div className="relative w-screen h-screen px-6 py-8 flex items-center justify-center">
			<div className="z-2 w-full flex flex-col justify-center items-center gap-y-4">
				<div className="flex justify-center gap-x-4 items-center">
					<p className="text-f2 font-semibold flex gap-x-2 items-center">
						<Image src={Logo} width={38} height={53} alt="Logotipo - Livro Livre" />
						Alterar Senha
					</p>
				</div>
				{currentStep === "email" && EmailStepContent}
				{currentStep === "twoFactor" && TwoFactorStepContent}
				{currentStep === "newPassword" && NewPasswordContent}
				<Link href={LOGIN}>
					<p className="text-navy-blue text-f7 w-full text-center">Voltar para o login</p>
				</Link>
			</div>
			<Image src={Background} width={496} height={744} alt="Marca D'agua - Livro Livre" className="absolute z-1" />
		</div>
	)
}

export default Login