import { AuthResponse } from '../types/user'
export const loginService = async (credentials: AuthResponse) => {
	try {
		const response = await fetch(
			'http://localhost:5000/v1/api/auth/login',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify(credentials),
			}
		)
		if (!response.ok) {
			const errorData = await response.json()
			throw new Error(errorData.body.message || 'Error en el login')
		}

		const data = (await response.json()) as AuthResponse
		return data
	} catch (error) {
		console.error('Error en el login', error)
		throw error
	}
}
