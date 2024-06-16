export interface AuthResponse {
	statusCode: number
	body: {
		user: User
		accessToken: string
		refreshToken: string
	}
}

export interface User {
	id: string
	name: string
	email: string
}

export interface AccessTokenResponse {
	statusCode: number
	body: {
		accessToken: string
	}
	error?: string
}