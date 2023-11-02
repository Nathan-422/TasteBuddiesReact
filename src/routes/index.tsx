import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from '../ProtectedRoute'
import { UnauthenticatedOnlyRoute } from '../UnauthenticatedOnlyRoute'
import Error from '../pages/Error'
import Home from '../pages/Home'
import Events from '../pages/Events'
import Event from '../pages/Event'
import SignIn from '../pages/SignIn'
import SignOut from '../pages/SignOut'
import JoinEvent from '../pages/JoinEvent'
import CreateEvent from '../pages/CreateEvent'
import Result from '../pages/Result'
import Register from '../pages/Register'

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
					path: 'event',
					element: <Events />,
				},
				{
					path: 'logout',
					element: <SignOut />,
				},
			],
		},
		{
			path: '/event',
			element: <ProtectedRoute />,
			children: [
				{
					path: 'join',
					element: <JoinEvent />,
				},
				{
					path: 'create',
					element: <CreateEvent />,
				},
				{
					path: ':eventId',
					element: <Event />,
				},
			],
		},
		{
			path: '/event/:eventId/results',
			element: <Result />,
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
				{
					path: 'register',
					element: <Register />,
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
