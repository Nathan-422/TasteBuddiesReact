import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from '../ProtectedRoute'
import Home from '../pages/Home'
import SignOut from '../pages/SignOut'
import Events from '../pages/Events'
import SignIn from '../pages/SignIn'
import { UnauthenticatedOnlyRoute } from '../UnauthenticatedOnlyRoute'
import Error from '../pages/Error'

const Routes = () => {
	const routesForPublic = [
		{
			path: '/',
			element: <Home />,
			errorElement: <Error />,
			title: 'Taste Buddies',
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
		...routesForAuthenticatedOnly,
	])

	return <RouterProvider router={router} />
}

export default Routes
