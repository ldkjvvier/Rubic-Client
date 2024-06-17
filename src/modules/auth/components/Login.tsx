import { useLogin } from '../hooks/useLogin'
import { useState } from 'react'
import { useAuth } from '../provider/AuthProvider'
import { useNavigate } from 'react-router'
import { IconButton, Container, TextField } from '@mui/material'

import {
	Login as LoginIcon,
	VisibilityOff,
	Visibility,
	Person as PersonIcon,
} from '@mui/icons-material'

export const Login = (): JSX.Element => {
	const { mutate } = useLogin()
	const [showPassword, setShowPassword] = useState(false)
	const [errorMessage, setErrorMessage] = useState<string | null>(
		null
	)
	const auth = useAuth()
	const Navigate = useNavigate()

	if (auth.isAuthenticated) {
		Navigate('/')
	}
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setErrorMessage(null)
		const form = e.currentTarget as HTMLFormElement
		const email = form.email.value
		const password = form.password.value

		const credentials = { email, password }
		mutate(credentials, {
			onSuccess: (data) => {
				if (data) {
					console.log('Login correcto', data)
					setErrorMessage(null)
					auth.saveUser(data)
				}
			},
			onError: (error) => {
				console.log('Error en el login', error)

				setErrorMessage(error.message)
			},
		})
	}

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword)
	}

	return (
		<Container className="bg-white rounded-lg text-black p-12 	">
			<div>
				<LoginIcon
					className="text-indigo-600"
					sx={{ fontSize: 40 }}
				/>
				<h1 className="text-3xl font-semibold mt-4">Welcome</h1>
				<p className="text-gray-500 mt-2">
					Ingresa tus credenciales para iniciar sesión
				</p>
			</div>
			<form
				action="submit"
				onSubmit={handleSubmit}
				className="flex flex-col w-full text-left mt-8  min-w-96"
			>
				<div className="flex flex-col gap-8">
					<TextField
						type="email"
						id="email"
						label="Email"
						placeholder="example@gmail.com"
						autoComplete="email"
						required
						InputProps={{
							endAdornment: (
								<IconButton
									aria-label="toggle password visibility"
									edge="end"
									disabled
								>
									<PersonIcon className="text-[24px] text-gray-400" />
								</IconButton>
							),
						}}
					/>

					<TextField
						id="password"
						label="Password"
						placeholder="Escribe tu contraseña"
						type={showPassword ? 'text' : 'password'}
						required
						autoComplete="current-password"
						InputProps={{
							endAdornment: (
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword}
									edge="end"
								>
									{showPassword ? (
										<Visibility className="text-[24px] text-gray-400" />
									) : (
										<VisibilityOff className="text-[24px] text-gray-400" />
									)}
								</IconButton>
							),
						}}
					/>
				</div>
				<div className="text-sm text-right mt-2">
					<a
						href="#"
						className="font-semibold text-indigo-600 hover:text-indigo-500"
					>
						Olvidaste tu contraseña?
					</a>
				</div>
				<button
					type="submit"
					className="mt-24 rounded-lg p-3 bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300 ease-in-out"
				>
					Iniciar Sesión
				</button>

				<p className="text-red-500 mt-4 text-center">
					{errorMessage && errorMessage}
				</p>
			</form>
		</Container>
	)
}

export const LabelLayout = ({
	text,
	children,
}: {
	text: string
	children: React.ReactNode
}) => {
	return (
		<label htmlFor={text} className="flex flex-col">
			<span>{text}</span>
			{children}
		</label>
	)
}
