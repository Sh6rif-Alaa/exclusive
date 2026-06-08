export type UserRole = "user" | "admin"
export type ProviderType = "system" | "google"
export type emailType = 'confirmEmail' | 'forgetPassword'

export interface IUser {
  firstName: string
  lastName: string
  email: string
  address?: string
  role: UserRole
  profilePicture?: {
    public_id?: string
    secure_url: string
  }
}

export interface Token {
  accessToken: string
  refreshToken: string
}

export interface AuthState {
  message: string;
  data: IUser | null;
  token: Token | null;
}

export interface userState {
  message: string;
  data: IUser | null;
}
