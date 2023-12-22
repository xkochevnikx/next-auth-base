import type { IUser } from '@/utils/types'

export interface IAuthResponse {
	accessToken: string
	user: IUser
}

export interface IFormData {
	email: string
	password: string
}
