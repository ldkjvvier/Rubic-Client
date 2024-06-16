import { User } from '../types/user'
export const userService = async (refreshToken: string) => {
	try {
		const response = await fetch(
			'http://localhost:5000/v1/api/auth/user',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${refreshToken}`,
				},
				body: JSON.stringify({ refreshToken }),
			}
		)

		if (!response.ok) {
			const errorData = await response.json()
      throw new Error(errorData.body.message || 'Error al obtener el usuario')
		}

		const data = (await response.json()) as { body: User }
		return data.body

	} catch (error) {
		console.error('Error al refrescar el token', error)
		return null
	}
}
