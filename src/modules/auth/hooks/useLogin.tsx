import { loginService } from '../services/loginService'
import { useMutation } from '@tanstack/react-query'
import { AuthResponse } from '../types/user'

export const useLogin = () => {
	const mutation = useMutation({
		mutationKey: ['login'],
		mutationFn: async (credentials: AuthResponse) => {
			return loginService(credentials)
		},
	})

	return mutation
}

export default useLogin
