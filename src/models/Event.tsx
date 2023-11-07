import { User } from './User'
import { Restaurant } from './Restaurant'

export type Event = {
	id: number
	entryCode: string
	location: string
	searchRadius: string
	currentUser: User
	otherUsers: User[]
	restaurants: Restaurant[]
	mealTime: string
	mutuallyLikedRestaurant: number | null
}
