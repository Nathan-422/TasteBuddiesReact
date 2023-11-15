import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from '../ProtectedRoute'
import { UnauthenticatedOnlyRoute } from '../UnauthenticatedOnlyRoute'
import { Navbar } from '../components/navbar/Navbar'
import CreateEvent from '../pages/Create/CreateEvent'
import Error from '../pages/Error'
import Event, { loader } from '../pages/Event/Event'
import Events from '../pages/Events'
import Home from '../pages/Home'
import JoinEvent from '../pages/JoinEvent'
import Register from '../pages/Register'
import Result, { resultsLoader } from '../pages/Result/Result'
import SignIn from '../pages/SignIn'
import SignOut from '../pages/SignOut'

const NavbarWrapper = () => {
	return (
		<>
			<Navbar />
			<Outlet />
		</>
	)
}

const Routes = () => {
	const routesForPublic = [
		{
			path: '/',
			element: <NavbarWrapper />,
			errorElement: <Error />,
			title: 'Taste Buddies',
			children: [
				{
					path: '/',
					element: <Home />,
				},
			],
		},
	]

	const routesForAuthenticatedOnly = [
		{
			path: '/',
			element: <ProtectedRoute />,
			children: [
				{
					path: '/',
					element: <NavbarWrapper />,
					children: [
						{
							path: '/event',
							element: <Events />,
						},
						{
							path: '/logout',
							element: <SignOut />,
						},
						{
							path: '/event/join',
							element: <JoinEvent />,
						},
						{
							path: '/event/create',
							element: <CreateEvent />,
						},
						{
							path: '/event/:eventId',
							element: <Event />,
							loader: loader,
						},
						{
							path: '/event/:eventId/results',
							element: <Result />,
							loader: resultsLoader,
						},
					],
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
					path: '/',
					element: <NavbarWrapper />,
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
