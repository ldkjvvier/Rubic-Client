import { useAuth } from '@/modules/auth/hooks/useAuth'

export const Home = () => {
	const { user, logout } = useAuth()
	return (
		<div>
			<h1>Home</h1>
			<p>Bienvenido {user.name}</p>
			<button onClick={logout}>Cerrar sesión</button>
		</div>
	)
}
