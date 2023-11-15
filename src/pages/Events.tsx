import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Event } from '../models/Event'
import EventService from '../services/EventService'
import { Link } from 'react-router-dom'

export default function Events() {
	const [upcommingEvents, setUpcomingEvents] = useState<Event[]>([])
	const [pastEvents, setPastEvents] = useState<Event[]>([])

	useEffect(() => {
		const controller = new AbortController()

		EventService.getEvents(controller)
			.then((res) => {
				for (const event of res.data) {
					if (Number.parseInt(event.mealTime) > new Date().getTime()) {
						setUpcomingEvents((currentEvents) => {
							return [event].concat(...currentEvents)
						})
					} else {
						setPastEvents((currentEvents) => {
							return [event].concat(...currentEvents)
						})
					}
				}
			})
			.catch((error) => {
				if (error.message !== 'canceled') {
					console.error(error)
				}
			})
		return () => {
			setUpcomingEvents([])
			setPastEvents([])
			controller.abort('Cancelled in cleanup')
		}
	}, [])

	return (
		<>
			<Helmet>
				<title>Events - TasteBuddies</title>
			</Helmet>
			<div className="card mx-auto flex w-[640px] flex-col justify-center gap-8">
				<h2>Events</h2>
				<div className="flex justify-center gap-6">
					<Link className="btn" to="./join">
						Join an event
					</Link>
					<Link className="btn" to="./create">
						Create an event
					</Link>
				</div>
				<div className="mb-8 grid grid-cols-2 gap-6">
					<div className="flex flex-col text-center">
						<h4>Upcomming Events</h4>
						<ul>
							{upcommingEvents.length === 0 && (
								<p>No upcomming events. Go make one!</p>
							)}
							{upcommingEvents.map((event) => {
								const date = new Date(event.mealTime)
								const formattedDate = `${date.toDateString().replace(' ', ', ')} | ${
									date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
								}:${date.getMinutes()}${date.getHours() < 12 ? 'am' : 'pm'}`
								return (
									<li key={event.entryCode}>
										{
											<Link to={'' + event.id}>
												{formattedDate + ' - ' + event.entryCode}
											</Link>
										}
									</li>
								)
							})}
						</ul>
					</div>
					<div className="flex flex-col text-center">
						<h4>Past Events</h4>
						<ul>
							{pastEvents.length === 0 && <p>No upcomming events. Go make one!</p>}
							{pastEvents.map((event) => {
								const date = new Date(event.mealTime)
								const formattedDate = `${date.toDateString().replace(' ', ', ')} | ${
									date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
								}:${date.getMinutes()}${date.getHours() < 12 ? 'am' : 'pm'}`
								return (
									<li key={event.entryCode}>
										{
											<Link to={'' + event.id}>
												{formattedDate + ' - ' + event.entryCode}
											</Link>
										}
									</li>
								)
							})}
						</ul>
					</div>
				</div>
			</div>
		</>
	)
}
