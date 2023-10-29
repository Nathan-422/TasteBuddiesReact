import { routerProvider, createBrowserRouter } from 'react-router-dom'
import { useAuth } from '../providers/authProvider'
import { ProtectedRoute } from '../ProtectedRoute'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Events from '../pages/Events'

const Routes = () => {
	const { token } = useAuth()

	const routesForPublic = [
		{
			path: '/',
			element: <Home />,
		},
		{
			path: '/login',
			element: <Login />,
		},
	]

	const routesForAuthenticatedOnly = [
		{
			path: '/',
			element: <ProtectedRoute />,
			children: [
				{
					path: '/events',
					element: Events,
				},
			],
		},
	]
}
