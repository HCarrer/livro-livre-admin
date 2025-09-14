import Button from "@/design-system/button"
import Input from "@/design-system/input"
import Image from "next/image"
import { useState } from "react"
import Logo from "../../../../public/icons/logo.svg"
import Link from "next/link"
import { HOME, LOGIN } from "@/constants/routes"
import { useForm } from "react-hook-form"
import Skeleton from "@/components/common/Skeleton"
import { SignUpFormDefaultValues, SignUpFormProps } from "@/constants/forms/cadastro"
import { redirect } from "next/navigation"
import { useRouter } from "next/router"

const SignUp = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false)

	const {
		formState: { isValid, errors },
		setValue,
		register,
		handleSubmit,
		setError,
	} = useForm({
		defaultValues: SignUpFormDefaultValues,
		mode: 'all',
    criteriaMode: 'all'
	})

	const router = useRouter()

	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue('username', e.target.value, { shouldValidate: true, shouldDirty: true })
	}

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue('email', e.target.value, { shouldValidate: true, shouldDirty: true })
	}

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue('password', e.target.value, { shouldValidate: true, shouldDirty: true })
	}

	const handlePasswordConfirmationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue('passwordConfirmation', e.target.value, { shouldValidate: true, shouldDirty: true })
	}

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
		return router.push(HOME)
		// TODO: deixar cadastro funcional e hashear senha
		// TODO: validar se email e username já existem
		console.log({data})
	}

	return (
		<Skeleton>
			<div className="flex justify-center gap-x-4 items-center">
				<p className="text-f2 font-bold text-navy-blue flex gap-x-2 items-center">
					<Image src={Logo} width={38} height={53} alt="Logotipo - Livro Livre" />
					Cadastro
				</p>
			</div>
			<Input
				{...register('email', {
					required: 'Campo obrigatório'
				})}
				className="w-full"
				placeholder="E-mail"
				type="text"
				icon="email"
				onChange={handleEmailChange}
				errorMessage={errors.email?.message}
			/>
			<Input
				{...register('username', {
					required: 'Campo obrigatório'
				})}
				className="w-full"
				placeholder="Nome de usuário"
				type="text"
				icon="avatar"
				onChange={handleUsernameChange}
				errorMessage={errors.username?.message}
			/>
			<Input
				{...register('password', {
					required: 'Campo obrigatório'
				})}
				className="w-full"
				placeholder="Senha"
				type={showPassword ? "text" : "password"}
				icon={showPassword ? "openEye" : "closedEye"}
				onIconClick={() => setShowPassword(!showPassword)}
				onChange={handlePasswordChange}
				errorMessage={errors.password?.message}
			/>
			<Input
				{...register('passwordConfirmation', {
					required: 'Campo obrigatório'
				})}
				className="w-full"
				placeholder="Senha"
				type={showPasswordConfirmation ? "text" : "password"}
				icon={showPasswordConfirmation ? "openEye" : "closedEye"}
				onIconClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
				onChange={handlePasswordConfirmationChange}
				errorMessage={errors.passwordConfirmation?.message}
			/>
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