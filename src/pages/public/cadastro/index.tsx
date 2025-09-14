import Button from "@/design-system/button"
import Input from "@/design-system/input"
import Image from "next/image"
import { useState } from "react"
import Logo from "../../../../public/icons/logo.svg"
import Link from "next/link"
import { HOME, LOGIN } from "@/constants/routes"
import { FormProvider, useForm } from "react-hook-form"
import Skeleton from "@/components/common/Skeleton"
import { SignUpFormDefaultValues, SignUpFormProps } from "@/constants/forms/cadastro"
import { redirect } from "next/navigation"
import { useRouter } from "next/router"
import Email from "@/components/forms/pages/cadastro/Email"
import Username from "@/components/forms/pages/cadastro/Username"
import Password from "@/components/forms/pages/cadastro/Password"
import PasswordConfirmation from "@/components/forms/pages/cadastro/PasswordConfirmation"

const SignUp = () => {
	const methods = useForm<SignUpFormProps>({
		defaultValues: SignUpFormDefaultValues,
		mode: 'all',
		criteriaMode: 'all'
	})

	const {
		formState: { isValid },
		handleSubmit,
		setError
	} = methods

	const router = useRouter()

	const onSubmit = (data: SignUpFormProps) => {
		const { email, password, passwordConfirmation } = data
		const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
		let hasError = false

		if (!emailRegex.test(email)) {
			setError('email', { type: 'manual', message: 'Formato inválido de e-mail' })
			hasError = true
		}
		if (password !== passwordConfirmation) {
			setError('passwordConfirmation', { type: 'manual', message: 'As senhas não coincidem' })
			hasError = true
		}
		if (hasError) {
			return false
		}
		// TODO: deixar cadastro funcional e hashear senha
		// TODO: validar se email e username já existem
		console.log(data)
		return router.push(HOME)
	}

	return (
		<Skeleton>
			<div className="flex justify-center gap-x-4 items-center">
				<p className="text-f2 font-bold text-navy-blue flex gap-x-2 items-center">
					<Image src={Logo} width={38} height={53} alt="Logotipo - Livro Livre" />
					Cadastro
				</p>
			</div>
			<FormProvider {...methods} >
				<Email />
				<Username />
				<Password />
				<PasswordConfirmation />
			</FormProvider>
			<div className="flex justify-between w-full gap-x-4">
				<Link href={LOGIN} className="w-full">
					<Button label="Voltar" variant="tertiary" type="button" className="w-full"/>
				</Link>
				<Button label="Criar conta" variant="main" disabled={!isValid} type="submit" onClick={handleSubmit(onSubmit)} className="w-full"/>
			</div>
		</Skeleton>
	)
}

export default SignUp