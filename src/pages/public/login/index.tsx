import Button from "@/design-system/button"
import Image from "next/image"
import GoogleIcon from "../../../../public/icons/google.svg"
import Logo from "../../../../public/icons/logo.svg"
import Link from "next/link"
import { RESET_PASSWORD, SIGNUP } from "@/constants/routes"
import { FormProvider, useForm } from "react-hook-form"
import { LoginFormDefaultValues, LoginFormProps } from "@/constants/forms/login"
import Skeleton from "@/components/common/Skeleton"
import Username from "@/components/forms/pages/login/Username"
import Password from "@/components/forms/pages/login/Password"

const GoogleButtonContent = () => (
	<p className="flex gap-x-4 justify-center items-center">
		<Image src={GoogleIcon} width={24} height={24} alt="Logomarca - Google" />
		<span className="text-f5 font-semibold">Google</span>
	</p>
)

const Login = () => {
	const methods = useForm<LoginFormProps>({
		defaultValues: LoginFormDefaultValues,
		mode: 'all',
		criteriaMode: 'all'
	})

	const {
		formState: { isValid },
		handleSubmit,
	} = methods

	const onSubmit = (data: LoginFormProps) => {
		// TODO: deixar login funcional e hashear senha
		console.log({...data })
	}

	return (
		<Skeleton>
			<div className="flex justify-center gap-x-4 items-center">
				<p className="text-f2 font-bold text-navy-blue flex gap-x-2 items-center">
					<Image src={Logo} width={38} height={53} alt="Logotipo - Livro Livre" />
					Bem vindo!
				</p>
			</div>
			<FormProvider {...methods} >
				<Username />
				<Password />
			</FormProvider>
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
		</Skeleton>
	)
}

export default Login