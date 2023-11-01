import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './providers/authProvider'
import AuthenticationService from './services/AuthenticationService'

export const ProtectedRoute = () => {
	const { token } = useAuth()

	if (!token || !AuthenticationService.isAuthenticated()) {
		return <Navigate to="/login" replace={true} />
	}

	return <Outlet />
}
