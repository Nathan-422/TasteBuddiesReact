import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useAuth } from '../providers/authProvider'
import { ProtectedRoute } from '../ProtectedRoute'
import Home from '../pages/Home'
import SignOut from '../pages/SignOut'
import Events from '../pages/Events'
import SignIn from '../pages/SignIn'
import { UnauthenticatedOnlyRoute } from '../UnauthenticatedOnlyRoute'

const Routes = () => {
	const { token } = useAuth()

	const routesForPublic = [
		{
			path: '/',
			element: <Home />,
		},
	]

	const routesForAuthenticatedOnly = [
		{
			path: '/',
			element: <ProtectedRoute />,
			children: [
				{
					path: 'events',
					element: <Events />,
				},
				{
					path: 'logout',
					element: <SignOut />,
				},
				{
					path: '/',
					element: <Home />,
				},
			],
		},
	]

	const routesForNotAuthenticatedOnly = [
		{
			path: '/',
			element: <UnauthenticatedOnlyRoute />,
			children: [
				{
					path: 'login',
					element: <SignIn />,
				},
			],
		},
	]

	const router = createBrowserRouter([
		...routesForPublic,
		...routesForNotAuthenticatedOnly,
		// ...(!token ? routesForNotAuthenticatedOnly : []),
		...routesForAuthenticatedOnly,
	])

	return <RouterProvider router={router} />
}

export default Routes
