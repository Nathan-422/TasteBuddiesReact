import AuthProvider from './providers/authProvider.tsx'
import Routes from './routes/index.tsx'

export default function App() {
	return (
		<>
			<AuthProvider>
				<Routes />
			</AuthProvider>
		</>
	)
}
