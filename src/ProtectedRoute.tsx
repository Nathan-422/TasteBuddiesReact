import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './providers/authProvider'
import AuthenticationService from './services/AuthenticationService'

export const ProtectedRoute = () => {
	const { token } = useAuth()

	if (!token || !AuthenticationService.isAuthenticated()) {
		console.log('Hit the protected route')
		return <Navigate to="/login" />
	}

	return <Outlet />
}
