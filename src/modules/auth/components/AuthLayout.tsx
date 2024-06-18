import { Container } from '@mui/material'

export const AuthLayout = ({
	children,
}: {
	children: React.ReactNode
}) => {
	return (
		<Container className="bg-white rounded-lg text-black p-12 	">
			{children}
		</Container>
	)
}
