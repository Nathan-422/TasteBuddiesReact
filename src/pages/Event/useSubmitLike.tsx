import axios from 'axios'

type UserLikesDTO = {
	eventId: string
	restaurantId: string
	isLike: boolean
}

export default function useSubmitLike() {
	const EVENT_API = 'http://localhost:8080/api/event/'

	const submitLike = (userLike: UserLikesDTO) => {
		axios
			.post(EVENT_API + 'like', JSON.stringify(userLike), {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then((res) => {
				if (res.status === 200) {
					null
				}
			})
			.catch((e) => {
				console.error(e)
			})
			.finally(() => {
				null
			})
	}

	return submitLike
}
