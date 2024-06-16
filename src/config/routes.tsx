import { createBrowserRouter } from 'react-router-dom'
import { Home } from '@/modules/core'
import { AuthLayout } from '@/modules/auth'
import { ProtectedRoute } from '@/modules/auth'
const routes = [
	{ 
		path: '/', 
		element: <ProtectedRoute />, 
		children: [
			{
				path: '/',
				element: <Home />,
			},
		],
	},
	{
		element: <AuthLayout />,
		children: [
			{
				path: '/login',
				element: <div>login</div>,
			},
			{
				path: '/register',
			},
		],
	},
]
export const router = createBrowserRouter(routes)
