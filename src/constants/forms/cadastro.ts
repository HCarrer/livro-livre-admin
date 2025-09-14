export interface SignUpFormProps {
	email: string;
	username: string;
	password: string;
	passwordConfirmation: string;
}

export const SignUpFormDefaultValues = {
	email: "",
	username: "",
	password: "",
	passwordConfirmation: ""
}