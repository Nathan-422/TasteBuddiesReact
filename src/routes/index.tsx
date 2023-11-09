import { AxiosResponse } from 'axios'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from '../ProtectedRoute'
import { UnauthenticatedOnlyRoute } from '../UnauthenticatedOnlyRoute'
import Error from '../pages/Error'
import Home from '../pages/Home'
import Event from '../pages/Event/Event'
import Events from '../pages/Events'
import { Event as TEvent } from '../models/Event'
import SignIn from '../pages/SignIn'
import SignOut from '../pages/SignOut'
import JoinEvent from '../pages/JoinEvent'
import CreateEvent from '../pages/CreateEvent'
import Result from '../pages/Result'
import Register from '../pages/Register'
import { Navbar } from '../components/navbar/Navbar'
import EventService from '../services/EventService'

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
							loader: async ({ params }: { params: { eventId: string } }) => {
								return await EventService.getEvent(params.eventId)
							},
						},
						{
							path: '/event/:eventId/results',
							element: <Result />,
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
