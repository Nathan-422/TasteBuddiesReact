import axios from 'axios'
import { useEffect, useState } from 'react'

export const usePlacesPhoto = (
	photoReference?: string,
	maxWidth?: number,
	maxHeight?: number
) => {
	const [photo_reference, setPhoto_reference] = useState(photoReference)
	const [width, setMaxWidth] = useState(maxWidth)
	const [height, setMaxHeight] = useState(maxHeight)
	const [photo, setPhoto] = useState()
	const [isLoading, setIsLoading] = useState(false)
	const PLACES_API = 'http://localhost:8080/api/places/'

	const getPhotoDetails = (
		photo_reference: string,
		maxWidth?: number,
		maxHeight?: number
	) => {
		setPhoto_reference(photo_reference)
		setMaxWidth(maxWidth)
		setMaxHeight(maxHeight)
	}

	useEffect(() => {
		const queryParams = ['photo_reference=' + photo_reference]
		const controller = new AbortController()

		try {
			if (width === undefined && height === undefined) {
				throw Error('Either or both maxwidth or maxheight are required')
			}

			if (width !== undefined && width > 0) {
				queryParams.push('maxwidth=' + width)
			}

			if (height !== undefined && height > 0) {
				queryParams.push('maxheight=' + height)
			}

			axios
				.get(PLACES_API + 'image' + '?' + queryParams.join('&'), {
					responseType: 'blob',
					signal: controller.signal,
				})
				.then((res) => {
					setIsLoading(true)
					setPhoto(res.data)
				})
				.catch((e) => {
					if (e.message !== 'cancelled') {
						console.error(e)
					}
				})
				.finally(() => {
					setIsLoading(false)
				})
		} catch (e) {
			if (e.message !== 'canceled') {
				console.log(e)
			}
		}
		return () => {
			controller.abort()
			setIsLoading(false)
		}
	}, [photo_reference])

	return {
		photo,
		isLoading,
		getPhotoDetails,
	}
}
