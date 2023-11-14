import axios from 'axios'
import { useCallback, useEffect, useState } from 'react'

type TRestaurant = {
	place_id: string
	name: string
	formatted_address: string
	types: Array<string>
	photos: Array<{
		photo_reference: string
		html_attributions: Array<string>
		height: number
		width: number
	}>
}

export const useRestaurantDetails = () => {
	const [restaurant, setResturant] = useState<TRestaurant>({} as TRestaurant)
	const [isLoading, setIsLoading] = useState(false)
	const [controller, setController] = useState(new AbortController())
	const PLACES_API = 'http://localhost:8080/api/places/'
	const getRestaurantDetails = useCallback(
		async (restaurantId: string) => {
			try {
				setIsLoading(true)

				const res = await axios.get(
					PLACES_API + 'restaurant' + '?placeID=' + restaurantId,
					{ signal: controller.signal }
				)

				return setResturant(res.data)
			} catch (e) {
				if (e.message !== 'canceled') {
					console.error(e)
				} else {
					console.log('--Event load cancelled')
				}
			} finally {
				setIsLoading(false)
			}
		},
		[controller]
	)

	useEffect(() => {
		console.log('-getRestaurantDetails has been updated')
	}, [getRestaurantDetails])

	useEffect(() => {
		console.log('-Setting a new controller')
		setController(new AbortController())

		return () => {
			console.log('---Running restaurant cleanup')
			controller.abort('cancelled due to page unload')
			setResturant({} as TRestaurant)
			setIsLoading(false)
		}
	}, [])

	// const getRestuarantDetails = async (restaurantId: string) => {
	// 	try {
	// 		console.log('-Starting to load event')
	// 		setIsLoading(true)
	//
	// 		const res = await axios.get(
	// 			PLACES_API + 'restaurant' + '?placeID=' + restaurantId,
	// 			{ signal: controller.signal }
	// 		)
	//
	// 		setController(new AbortController())
	//
	// 		return setResturant(res.data)
	// 	} catch (e) {
	// 		if (e.message !== 'canceled') {
	// 			console.error(e)
	// 		} else {
	// 			console.log('--Event load cancelled')
	// 		}
	// 	} finally {
	// 		setIsLoading(false)
	// 	}
	// }

	return {
		restaurant,
		isLoading,
		getRestaurantDetails,
	}
}
