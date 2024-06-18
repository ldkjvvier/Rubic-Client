import { PdfUrl } from '../components/PdfUrl'
import { PdfFile } from '../components/PdfFile'
import { useAuth } from '@/modules/auth/provider/AuthProvider'
export const Home = (): JSX.Element => {
	const { user, logout } = useAuth()

	return (
		<>
			<div>
				<h3>
					Welcome {user?.name} {user?.lastname}
				</h3>
				<h3>{user?.email}</h3>
				<br />
				<br />
			</div>
			<PdfUrl />
			<br />
			<PdfFile />
			<br />
			<button className="p-3 bg-cyan-900 rounded" onClick={logout}>
				Logout
			</button>
		</>
	)
}
