import axios from 'axios'
import { useEffect, useState } from 'react'

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

export const useRestaurantDetails = (restaurantId?: string) => {
	const [id, setId] = useState(restaurantId)
	const [restaurant, setResturant] = useState<TRestaurant>({} as TRestaurant)
	const [isLoading, setIsLoading] = useState(false)
	const PLACES_API = 'http://localhost:8080/api/places/'

	const fetchRestaurantData = (restaurantId: string) => {
		setId(restaurantId)
	}

	useEffect(() => {
		const localController = new AbortController()
		if (id !== '' && id !== undefined) {
			axios
				.get(PLACES_API + 'restaurant' + '?placeID=' + id, {
					signal: localController.signal,
				})
				.then((res) => {
					setIsLoading(true)
					setResturant(res.data)
				})
				.catch((e) => {
					if (e.message === 'cancelled') {
						console.log('Event load cancelled')
					} else {
						console.error(e)
					}
				})
				.finally(() => {
					setIsLoading(false)
				})
		}
		return () => {
			localController.abort('cancelled due to page unload')
			setResturant({} as TRestaurant)
			setIsLoading(false)
		}
	}, [id])

	return {
		restaurant,
		isLoading,
		getRestaurantDetails: fetchRestaurantData,
	}
}
