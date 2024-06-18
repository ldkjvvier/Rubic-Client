import { Home } from '@/modules/core'
import { Login, Register, ProtectedRoute } from '@/modules/auth'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export const AppRoutes = () => {
	return (
		<BrowserRouter>
			<Routes>
				{/* RUTAS PUBLICAS */}
				<Route path="/" element={<Login />} />
				<Route
					path="*"
					element={
						<div>
							<h1>404</h1>
							<p>Página no encontrada</p>
						</div>
					}
				/>
				<Route path="/register" element={<Register />} />
				{/* RUTAS DEL ADMINISTRADOR */}
				<Route
					path="/admin"
					element={
						<ProtectedRoute role="admin" redirectTo="/admin">
							<div>ROL DE ADMINISTRADOR</div>
						</ProtectedRoute>
					}
				/>
				{/* RUTAS DEL USUARIO */}
				<Route
					path="/user"
					element={
						<ProtectedRoute role="user" redirectTo="/">
							<Home />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</BrowserRouter>
	)
}
