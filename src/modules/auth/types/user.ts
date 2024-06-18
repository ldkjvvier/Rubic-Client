export interface AuthResponse {
	statusCode: number
	body: {
		user: User
	}
}

export interface User {
	id: string
	name: string
	lastname: string
	email: string
	role?: string
}

export interface LoginData {
	email: string
	password: string
}
