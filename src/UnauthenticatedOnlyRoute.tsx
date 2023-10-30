import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './providers/authProvider'

export const UnauthenticatedOnlyRoute = () => {
	const { token } = useAuth()

	if (token) {
		return <Navigate to="/" />
	}

	return <Outlet />
}
