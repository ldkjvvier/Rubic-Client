import { useContext, createContext, useState, useEffect } from 'react'
import { AuthResponse, User } from '../types/user'
import { verifyTokenService } from '../services/verifyTokenService'
interface AuthProviderProps {
	children: React.ReactNode
}

const AuthContext = createContext({
	isAuthenticated: false,
	saveUser: (userData: AuthResponse) => {},
	user: {} as User,
	isLoading: false,
	logout: () => {},
})

const defaultUser = {
	id: '',
	name: '',
	lastname: '',
	email: '',
	role: '',
} as User
export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [user, setUser] = useState<User>(defaultUser)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const checkAuth = async () => {
			setIsLoading(true)
			try {
				const data = await verifyTokenService()
				if (data.statusCode !== 200) {
					setIsAuthenticated(false)
					setIsLoading(false)
					return
				}
				console.log(user)
				saveSessionInfo(data.body.user)
				setIsAuthenticated(true)
				setIsLoading(false)
			} catch (error) {
				setIsAuthenticated(false)
				setIsLoading(false)
			}
		}
		checkAuth()
	}, [])

	const saveSessionInfo = (user: User) => {
		console.log({ user })
		setIsAuthenticated(true)
		setUser(user)
	}

	const saveUser = (userData: AuthResponse) => {
		saveSessionInfo(userData.body.user)
	}

	const logout = async () => {
		try {
			const res = await fetch(
				'http://localhost:5000/v1/api/auth/logout',
				{
					method: 'POST',
					credentials: 'include',
				}
			)
			const data = await res.json()
			if (data.statusCode === 200) {
				setIsAuthenticated(false)
				setUser(defaultUser)
			}
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				user,
				saveUser,
				isLoading,
				logout,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
