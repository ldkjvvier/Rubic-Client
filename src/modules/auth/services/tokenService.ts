import { AccessTokenResponse } from '../types/user'

export const tokenService = async () => {
	try {
		const response = await fetch(
			'http://localhost:5000/v1/api/auth/refresh-token',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					credentials: 'include',
				},
			}
		)

		if (!response.ok) {
			const errorData = (await response.json()) as AccessTokenResponse
			throw new Error(
				errorData.error || 'Error al refrescar el token'
			)
		}

		const data = (await response.json()) as AccessTokenResponse
		console.log(data)
		return data
	} catch (error) {
		console.error('Error al refrescar el token', error)
		return null
	}
}
