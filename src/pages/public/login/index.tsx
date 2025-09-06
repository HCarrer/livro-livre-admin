import Button from "@/design-system/button"
import Input from "@/design-system/input"
import Image from "next/image"
import { useState } from "react"
import GoogleIcon from "../../../../public/icons/google.svg"
import Logo from "../../../../public/icons/logo.svg"
import Background from "../../../../public/icons/background.svg"
import Link from "next/link"
import { RESET_PASSWORD, SIGNUP } from "@/constants/routes"
import { useForm } from "react-hook-form"

const GoogleButtonContent = () => (
	<p className="flex gap-x-4 justify-center items-center">
		<Image src={GoogleIcon} width={24} height={24} alt="Logomarca - Google" />
		<span className="text-f5 font-semibold">Google</span>
	</p>
)

const Login = () => {
	const [showPassword, setShowPassword] = useState(false)
	const {
		formState: { isValid, errors },
		setValue,
		register,
		handleSubmit
	} = useForm({
		defaultValues: { username: "", password: "" },
		mode: 'all',
    criteriaMode: 'all'
	})

	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue('username', e.target.value, { shouldValidate: true, shouldDirty: true })
	}

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue('password', e.target.value, { shouldValidate: true, shouldDirty: true })
	}

	const onSubmit = (data: any) => {
		// TODO: deixar login funcional
		console.log(data)
	}

	return (
		<div className="relative w-screen h-screen px-6 py-8 flex items-center justify-center">
			<div className="z-2 w-full flex flex-col justify-center items-center gap-y-4">
				<div className="flex justify-center gap-x-4 items-center">
					<p className="text-f2 font-semibold flex gap-x-2 items-center">
						<Image src={Logo} width={38} height={53} alt="Logotipo - Livro Livre" />
						Bem vindo!
					</p>
				</div>
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
				<Button label="Realizar login" variant="main" disabled={!isValid} type="submit" onClick={handleSubmit(onSubmit)} className="w-full"/>
				<div className="w-full flex justify-between text-f7">
					<Link href={RESET_PASSWORD}>
						<p className="text-navy-blue">Esqueci minha senha</p>
					</Link>
					<Link href={SIGNUP}>
						<p className="text-power-blue">Quero criar uma conta</p>
					</Link>
				</div>
				<div className="w-full h-0.5 bg-[#D9D9D9] rounded rounded-full" id="separator-bar"/>
				{/* TODO: implementar login do google */}
				<Button label={<GoogleButtonContent />} variant="tertiary" className="w-full"/>
			</div>
			<Image src={Background} width={496} height={744} alt="Marca D'agua - Livro Livre" className="absolute z-1" />
		</div>
	)
}

export default Login