import { loginService } from '../services/loginService'
import { useMutation } from '@tanstack/react-query'
import { LoginCredentials } from '../types/user'

export const useLogin = () => {
	const mutation = useMutation({
		mutationKey: ['login'],
		mutationFn: async (credentials : LoginCredentials) => {
			return loginService(credentials)
		},
	})

	return mutation
}

export default useLogin

