import { Helmet } from 'react-helmet'
import { Await, defer, useLoaderData } from 'react-router-dom'
import { Event as TEvent } from '../../models/Event'
import { usePlacesPhoto } from '../Event/usePlacesPhoto'
import { useRestaurantDetails } from '../Event/useRestaurantDetails'
import { Suspense, useEffect } from 'react'
import EventService from '../../services/EventService'

export async function resultsLoader({ params }: { params: { eventId: string } }) {
	const eventData = await EventService.getEvent(params.eventId)
	const matchData = await EventService.getEventResults(
		Number.parseInt(params.eventId)
	)
	return defer({ res: eventData, matches: matchData })
}

export default function Event() {
	const maxPhotoWidth = 640

	const loaderData = useLoaderData()
	const data = useLoaderData().res.data as TEvent
	const {
		restaurant,
		isLoading: isRestaurantLoading,
		getRestaurantDetails,
	} = useRestaurantDetails()
	const { photo, isLoading: isPhotoLoading, getPhotoDetails } = usePlacesPhoto()

	useEffect(() => {
		getRestaurantDetails(loaderData.matches.data.mutuallyLikedRestaurant)
	}, [])

	useEffect(() => {
		if (restaurant.photos !== undefined) {
			getPhotoDetails(restaurant.photos[0].photo_reference, maxPhotoWidth)
		}
	}, [restaurant])

	return (
		<>
			<Helmet>
				<title>Results - TasteBuddies</title>
			</Helmet>
			<Suspense fallback={<p>Loading page data...</p>}>
				<Await resolve={loaderData} errorElement={<p>Had an error...</p>}>
					<div className="event-card card">
						<h2>Event: {data.entryCode}</h2>
						<h3>{!isRestaurantLoading ? restaurant.name : 'Loading...'}</h3>
						{!isPhotoLoading && photo ? (
							<img
								className="my-2 aspect-auto max-h-96 rounded-2xl object-scale-down"
								src={URL.createObjectURL(photo)}
							/>
						) : (
							<p>Loading image...</p>
						)}
						<h4>Info:</h4>
						<p>
							{!isRestaurantLoading ? restaurant.formatted_address : 'Loading...'}
						</p>
						<p>
							{!isRestaurantLoading && restaurant.types?.length !== 0
								? restaurant.types?.join(', ')
								: 'Loading...'}
						</p>
					</div>
				</Await>
			</Suspense>
			<div></div>
		</>
	)
}
