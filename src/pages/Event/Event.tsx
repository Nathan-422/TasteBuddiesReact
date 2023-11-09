import { Helmet } from 'react-helmet'
import { Link, useLoaderData } from 'react-router-dom'
import { Event as TEvent } from '../../models/Event'
import { useEffect } from 'react'
import { useRestaurantDetails } from './useRestaurantDetails'
import { LoaderFunction } from 'react-router-dom'

export default function Event() {
	// I'm not sure I have a better solution for this. react-router just doesn't support typescript well.
	// I saw one library that implements ts better, but I'd rather stick to this one...
	const data = useLoaderData() as Awaited<ReturnType<TLoaderFn>>
	const { restaurant, isLoading, getRestuarantDetails, controller } =
		useRestaurantDetails()

	console.log('Event page rendered')
	console.log(data)

	// useEffect(() => {
	// 	return controller.abort('Cancelled by page unload')
	// }, [])

	useEffect(() => {
		;async () => {
			await getRestuarantDetails(data.restaurants[0].id)
		}
	}, [getRestuarantDetails, data.restaurants])
	// TODO: fix this mess
	const submitLike = () => {
		// TODO: Write useSubmitLike hook
		console.log()
		console.log(getRestuarantDetails('' + data.restaurants.shift()?.id))
	}

	return (
		<>
			<Helmet>
				<title>Event - TasteBuddies</title>
			</Helmet>
			<h2>Event: {data.entryCode}</h2>
			<div>
				<p>Event ID: {data.id}</p>
				<h3>{!isLoading ? restaurant.name : 'Loading...'}</h3>
				{/* <img>{!isLoading ? 'IMAGE' : 'Loading image...'}</img> */}
				<h4>Info:</h4>
				<p>{!isLoading ? restaurant.formatted_address : 'Loading...'}</p>
				<p>
					{/* {!isLoading && restaurant.types.length !== 0 */}
					{/* 	? restaurant.types.map((type) => { */}
					{/* 			return type */}
					{/* 	  }) */}
					{/* 	: 'Loading...'} */}
				</p>
				<button onClick={submitLike}>Yes</button>
				<button onClick={submitLike}>No</button>
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
