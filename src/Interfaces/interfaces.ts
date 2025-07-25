export interface Logged_in_Users  {  
    email: string,
    password: string,

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

// Add this to your existing interfaces file
export interface ResetPasswordForm {
  email: string
  otp: string
  password: string
  confirmPassword: string
}
