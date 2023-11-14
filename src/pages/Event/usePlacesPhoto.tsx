import axios from 'axios'
import { useState } from 'react'

export const usePlacesPhoto = () => {
	const [photo, setPhoto] = useState()
	const [isLoading, setIsLoading] = useState(false)
	const [controller] = useState(new AbortController())
	const PLACES_API = 'http://localhost:8080/api/places/'

	const getPhotoDetails = async (
		photo_reference: string,
		maxWidth?: number,
		maxHeight?: number
	) => {
		try {
			const queryParams = ['photo_reference=' + photo_reference]

			if (maxWidth === undefined && maxHeight === undefined) {
				throw Error('Either or both maxwidth or maxheight are required')
			}

			if (maxWidth !== undefined && maxWidth > 0) {
				queryParams.push('maxwidth=' + maxWidth)
			}

			if (maxHeight !== undefined && maxHeight > 0) {
				queryParams.push('maxheight=' + maxHeight)
			}

			setIsLoading(true)

			const res = await axios.get(
				PLACES_API + 'image' + '?' + queryParams.join('&'),
				{
					responseType: 'blob',
					signal: controller.signal,
				}
			)

			return setPhoto(res.data)
		} catch (e) {
			if (e.message !== 'cancelled') {
				console.error(e)
			} else {
				console.log('--Photo load cancelled')
			}
		} finally {
			setIsLoading(false)
		}
	}

	return {
		photo,
		isLoading,
		getPhotoDetails,
		gcontroller,
	}
}
