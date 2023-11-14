import { Helmet } from 'react-helmet'
import { Link, useLoaderData } from 'react-router-dom'
import { Event as TEvent } from '../../models/Event'
import { usePlacesPhoto } from './usePlacesPhoto'
import { useRestaurantDetails } from './useRestaurantDetails'
import { useEffect } from 'react'
import EventService from '../../services/EventService'

export const loader = async ({ params }: { params: { eventId: string } }) => {
	return await EventService.getEvent(params.eventId)
}

export default function Event() {
	const data = useLoaderData().data as TEvent
	const {
		restaurant,
		isLoading: isRestaurantLoading,
		getRestaurantDetails,
	} = useRestaurantDetails()
	const { photo, isLoading: isPhotoLoading, getPhotoDetails } = usePlacesPhoto()

	useEffect(() => {
		console.log('1. EVENT LOADING USE EFFECT RAN')
		getRestaurantDetails(data.restaurants[0].id)
	}, [])

	useEffect(() => {
		console.log(`-Restaurant has updated and is now: ${restaurant.name}`)
	}, [restaurant])

	// useEffect(() => {
	// 	console.log('PHOTO LOADING USE EFFECT RAN')
	// 	if (restaurant.photos !== undefined) {
	// 		console.log('-Photo reference = ' + restaurant.photos[0]?.photo_reference)
	// 		getPhotoDetails(restaurant.photos[0]?.photo_reference)
	// 	} else {
	// 		console.log('-Photo array was empty')
	// 	}
	// 	// return () => photoController.abort('Cancelled by page unload')
	// }, [restaurant])

	// useEffect(() => {
	// 	;async () => {
	// 		await getRestuarantDetails(data.restaurants[0].id)
	// 		await getPhotoDetails(restaurant.photos[0].photo_reference, 400)
	// 	}
	// }, [getRestuarantDetails, data.restaurants])

	// TODO: fix this mess
	const submitLike = (isLike: boolean) => {
		// TODO: Write useSubmitLike hook

		console.log(isLike)
		console.log(getRestaurantDetails('' + data.restaurants.shift()?.id))
	}
	const loadRestaurant = () => {
		getRestaurantDetails(data.restaurants[0].id)
	}
	const loadPhoto = () => {
		getPhotoDetails(restaurant.photos[0].photo_reference, 400)
	}

	return (
		<>
			<Helmet>
				<title>Event - TasteBuddies</title>
			</Helmet>
			<h2>Event: {data.entryCode}</h2>
			<div>
				<p>Event ID: {data.id}</p>
				<h3>{!isRestaurantLoading ? restaurant.name : 'Loading...'}</h3>
				{!isPhotoLoading && photo ? (
					<img src={URL.createObjectURL(photo)} width={400} />
				) : (
					<p>Loading image...</p>
				)}
				<h4>Info:</h4>
				<p>{!isRestaurantLoading ? restaurant.formatted_address : 'Loading...'}</p>
				<p>
					{/* {!isLoading && restaurant.types.length !== 0 */}
					{/* 	? restaurant.types.map((type) => { */}
					{/* 			return type */}
					{/* 	  }) */}
					{/* 	: 'Loading...'} */}
				</p>
				<button onClick={loadRestaurant}>LOAD DATA</button>
				<br />
				<button onClick={loadPhoto}>LOAD PHOTO</button>
				<br />
				<button
					onClick={() => {
						submitLike(true)
					}}
				>
					Yes
				</button>
				<button
					onClick={() => {
						submitLike(false)
					}}
				>
					No
				</button>
				<p>
					{data.mutuallyLikedRestaurant ? (
						<Link to={'/'}>Your group has a match</Link>
					) : (
						'No match yet'
					)}
				</p>
			</div>
		</>
	)
}
