import axios, { AxiosRequestConfig } from 'axios'
import { useState } from 'react'

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
	const [controller] = useState(new AbortController())
	const PLACES_API = 'http://localhost:8080/api/places/'

	const getRestuarantDetails = async (restaurantId: string) => {
		try {
			setIsLoading(true)

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const config: AxiosRequestConfig<any> = {
				signal: controller.signal,
			}

			const res = await axios.get(
				PLACES_API + 'restaurant' + '?placeID=' + restaurantId,
				config
			)

			return setResturant(res.data)
		} catch (e) {
			console.error(e)
		} finally {
			setIsLoading(false)
		}
	}

	return {
		restaurant,
		isLoading,
		getRestuarantDetails,
		controller,
	}
}
