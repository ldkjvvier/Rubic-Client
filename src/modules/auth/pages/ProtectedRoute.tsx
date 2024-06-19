import { Outlet, Navigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { Loading } from '@/components/loader/Loading'

interface ProtectedRouteProps {
	role?: string
	children?: React.ReactNode
	redirectTo: string
}

export const ProtectedRoute = ({
	role,
	children,
	redirectTo,
}: ProtectedRouteProps) => {
	const auth = useAuth()
	if (auth.isLoading) return <Loading />
	if (!auth.isLoading && !auth.isAuthenticated) {
		return <Navigate to={redirectTo} />
	}

	if (role && auth.user.role !== role) {
		return <Navigate to="/notfound" />
	}
	return children ? children : <Outlet />
}
