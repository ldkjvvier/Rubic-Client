export const verifyTokenService = async () => {
	const response = await fetch(
		'http://localhost:5000/v1/api/auth/verify-token',
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		}
	)
	return response.json()
}
