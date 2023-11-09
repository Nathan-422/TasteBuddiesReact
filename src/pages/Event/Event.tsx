import { Helmet } from 'react-helmet'
import { useLoaderData } from 'react-router-dom'
import { Event as TEvent } from '../../models/Event'
import { useEffect } from 'react'
import { useRestaurantDetails } from './useEventDetails'

export default function Event() {
	// I'm not sure I have a better solution for this. react-router just doesn't support typescript well.
	// I saw one library that implements ts better, but I'd rather stick to this one...
	const data = useLoaderData().data as TEvent
	const [restaurant, isLoading, getRestuarantDetails, controller] =
		useRestaurantDetails()

	console.log(data)

	useEffect(() => {
		return controller.abort
	}, [isLoading, controller])

	useEffect(() => {
		;async () => {
			await getRestuarantDetails(data.restaurants[0])
		}
	})
	return (
		<>
			<Helmet>
				<title>Event - TasteBuddies</title>
			</Helmet>
			<h2>Event: {data.entryCode}</h2>
			<div>
				<p>Event ID: {data.id}</p>
				{!isLoading && <h3>{restaurant.name}</h3>}
			</div>
		</>
	)
}
