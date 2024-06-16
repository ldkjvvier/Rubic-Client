import { useContext, createContext, useState, useEffect } from 'react'
import { AuthResponse, User } from '../types/user'
import { tokenService } from '../services/tokenService'
import { userService } from '../services/userService'
interface AuthProviderProps {
	children: React.ReactNode
}

const AuthContext = createContext({
	isAuthenticated: false,
	getAccessToken: () => {},
	saveUser: (userData: AuthResponse) => {},
	getRefreshToken: () => {},
})

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [accessToken, setAccessToken] = useState<string>('')
	const [refreshToken, setRefreshToken] = useState<string>('')
	const [user, setUser] = useState<User>()

	useEffect(() => {
    checkAuth()
	}, [])

	const getUserInfo = async () => {
    const response = await userService(refreshToken)
    if (response) {
      return response
    }
    return null
  }
	const requestNewAccessToken = async (refreshToken: string) => {
		const response = await tokenService()
		if (response) {
			return response.body.accessToken
		}
		return null
	}
	const checkAuth = async () => {
		if (accessToken) {
      return 
		} else {
			const token = getRefreshToken()
			if (token) {
				const newAccessToken = await requestNewAccessToken(token)
				if (newAccessToken) {
					const userInfo = await getUserInfo()
					if (userInfo) {
						saveSessionInfo(userInfo, newAccessToken, token)
					}
				}
			}
		}
	}

	const saveSessionInfo = (
		user: User,
		accessToken: string,
		refreshToken: string
	) => {
		setAccessToken(accessToken)
		localStorage.setItem('token', JSON.stringify(refreshToken))
		setIsAuthenticated(true)
		setUser(user)
	}
	const getAccessToken = () => {
		return accessToken
	}
	const getRefreshToken = (): string | null => {
		const token = localStorage.getItem('token')
		if (token) {
			const { refreshToken } = JSON.parse(token)
			return refreshToken
		}
		return null
	}
	const saveUser = (userData: AuthResponse) => {
		saveSessionInfo(
			userData.body.user,
			userData.body.accessToken,
			userData.body.refreshToken
		)
	}
	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				getAccessToken,
				saveUser,
				getRefreshToken,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
