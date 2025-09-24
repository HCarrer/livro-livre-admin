export interface ForgotPasswordFormProps {
  email: string;
  twoFactorCode?: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

export const ForgotPasswordFormDefaultValues = {
  email: "",
  twoFactorCode: "",
  newPassword: "",
  newPasswordConfirmation: "",
};
