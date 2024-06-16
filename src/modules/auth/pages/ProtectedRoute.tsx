import { Outlet, Navigate } from 'react-router'
import { useAuth } from '../provider/AuthProvider'

export const ProtectedRoute = () => {
  const auth = useAuth()

	return auth.isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
