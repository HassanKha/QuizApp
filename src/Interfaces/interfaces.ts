export interface ILogData {
  id?: string
  email?: string
  name?: string
  role?: string
}

export interface AuthState {
  token: string | null
  LogData: ILogData | null
}

export interface UserRegister{
    first_name:string,
    last_name:string,
    email:string,
    password:string,
    role:string
}

export interface ForgotPasswordForm {
  email: string
}

export interface ResetPasswordForm {
  email: string
  otp: string
  password: string
  confirmPassword: string
}
export interface ChangePasswordForm {
 
  password: string
 password_new:string
}
