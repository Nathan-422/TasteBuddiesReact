import { Suspense, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Await, Link, defer, useLoaderData } from 'react-router-dom'
import { Event as TEvent } from '../../models/Event'
import EventService from '../../services/EventService'
import { usePlacesPhoto } from './usePlacesPhoto'
import { useRestaurantDetails } from './useRestaurantDetails'
import useSubmitLike from './useSubmitLike'

export const loader = async ({ params }: { params: { eventId: string } }) => {
	const eventRes = await EventService.getEvent(params.eventId)
	const resultRes = await EventService.getEventResults(
		Number.parseInt(params.eventId)
	)
	return defer({ eventRes, resultRes })
}

export default function Event() {
	const maxPhotoWidth = 640
	const data = useLoaderData().eventRes.data as TEvent
	const resultData = useLoaderData().resultRes.data
	const {
		restaurant,
		isLoading: isRestaurantLoading,
		getRestaurantDetails,
	} = useRestaurantDetails()
	const { photo, isLoading: isPhotoLoading, getPhotoDetails } = usePlacesPhoto()
	const submitLike = useSubmitLike()
	const [hasNextRestaurant, setHasNextRestaurant] = useState(true)

	useEffect(() => {
		if (data.restaurants[0] !== undefined) {
			getRestaurantDetails(data.restaurants[0].id)
		} else {
			setHasNextRestaurant(false)
		}
	}, [])

	useEffect(() => {
		if (restaurant.photos !== undefined) {
			getPhotoDetails(restaurant.photos[0].photo_reference, maxPhotoWidth)
		}
	}, [restaurant])

	const saveLike = (isLike: boolean) => {
		if (data.restaurants[0] !== undefined) {
			const currentRestaurant = data.restaurants.shift().id
			submitLike({
				eventId: '' + data.id,
				restaurantId: currentRestaurant,
				isLike: isLike,
			})
			getRestaurantDetails(data.restaurants[0].id)
		}
	}

	return (
		<>
			<Helmet>
				<title>Event - TasteBuddies</title>
			</Helmet>
			<Suspense fallback={<p>Loading page data...</p>}>
				<Await resolve={data} errorElement={<p>There was an error!</p>}>
					<div className="event-card card">
						<h2>Event: {data.entryCode}</h2>
						{hasNextRestaurant ? (
							<>
								<h3>{!isRestaurantLoading ? restaurant.name : 'Loading...'}</h3>
								{!isPhotoLoading && photo ? (
									<img
										className="my-2 rounded-2xl"
										src={URL.createObjectURL(photo)}
										width={maxPhotoWidth}
									/>
								) : (
									<p>Loading image...</p>
								)}
								<h4>Info:</h4>
								<p>
									{!isRestaurantLoading
										? restaurant.formatted_address
										: 'Loading...'}
								</p>
								<p>
									{!isRestaurantLoading && restaurant.types?.length !== 0
										? restaurant.types?.join(', ')
										: 'Loading...'}
								</p>
								<div className="mb-4 flex justify-center gap-4 sm:gap-8 md:gap-12">
									<button
										className="btn-success w-40"
										onClick={() => {
											saveLike(true)
										}}
									>
										Yes
									</button>
									<button
										className="btn-danger w-40"
										onClick={() => {
											saveLike(false)
										}}
									>
										No
									</button>
								</div>
							</>
						) : (
							<p>No more restaurants to show</p>
						)}
						<div className="mb-4 flex justify-center">
							{resultData.mutuallyLikedRestaurant ? (
								<Link className="active btn-no-col bg-yellow-400" to={'./results'}>
									Your group has a match
								</Link>
							) : (
								<p className="text-gray-600">No match yet</p>
							)}
						</div>
					</div>
				</Await>
			</Suspense>
		</>
	)
}
