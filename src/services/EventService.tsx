import axios, { AxiosRequestConfig } from 'axios'
import { Event } from '../models/Event'

type NewEventDTO = {
	location: string
	searchRadius: string
	mealTime: Date
}

type UserLikesDTO = {
	eventId: string
	restaurantId: string
	isLike: boolean
}

const EVENT_API = 'http://localhost:8080/api/event/'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const config: AxiosRequestConfig<any> = {
	headers: {
		'Content-Type': 'application/json',
	},
}

export default {
	createEvent: (event: NewEventDTO, controller?: AbortController) => {
		config.signal = controller?.signal
		return axios.post(EVENT_API + 'create', event, config)
	},

	getEvents: (controller?: AbortController) => {
		config.signal = controller?.signal
		return axios.get<Event[]>(EVENT_API + 'all', config)
	},

	getEvent: (eventID: string, controller?: AbortController) => {
		config.signal = controller?.signal
		return axios.post(EVENT_API, JSON.stringify(eventID), config)
	},

	joinEvent: (entryCode: string, controller?: AbortController) => {
		config.signal = controller?.signal
		return axios.post(EVENT_API + 'join', JSON.stringify(entryCode), config)
	},

	saveLike: (userLikes: UserLikesDTO, controller?: AbortController) => {
		config.signal = controller?.signal
		return axios.post(EVENT_API + 'like', userLikes, config)
	},

	getEventResults: (eventID: number, controller?: AbortController) => {
		config.signal = controller?.signal
		return axios.get(`${EVENT_API}${eventID}/result`)
	},

	getVotingProgress: (eventID: number, controller?: AbortController) => {
		config.signal = controller?.signal
		return axios.get(`${EVENT_API}${eventID}/votingProgress`)
	},
}
