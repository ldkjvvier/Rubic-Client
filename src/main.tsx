import React from 'react'
import ReactDOM from 'react-dom/client'
import {
	QueryClientProvider,
	QueryClient,
} from '@tanstack/react-query'
import { AppRoutes } from './config/routes'
import './index.css'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { AuthProvider } from './modules/auth/provider/AuthProvider'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
	<React.StrictMode>
		<AuthProvider>
			<QueryClientProvider client={new QueryClient()}>
				<AppRoutes />
			</QueryClientProvider>
		</AuthProvider>
	</React.StrictMode>
)
