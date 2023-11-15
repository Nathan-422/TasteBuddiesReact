import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import EventService from '../../services/EventService'

export default function CreateEvent() {
	interface IFormInput {
		location: string
		searchRadius: string
		mealTime: Date
	}

	const [errorRes, setErrorRes] = useState(null)
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>({
		defaultValues: {
			location: '',
			searchRadius: '',
			mealTime: new Date(),
		},
	})
	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		EventService.createEvent(data)
			.then(() => {
				setErrorRes(null)
				navigate('../', { replace: true, relative: 'path' })
			})
			.catch((e) => {
				setErrorRes(() => {
					return e.response.status
				})
			})
	}

	return (
		<>
			<Helmet>
				<title>Create Event - TasteBuddies</title>
			</Helmet>
			<form
				className="form card"
				id="join-event-form"
				onSubmit={handleSubmit(onSubmit)}
			>
				<h2>Create event</h2>
				<label htmlFor="location">Where</label>
				<input
					type="text"
					id="location"
					placeholder="Zip code"
					{...register('location', {
						required: 'A zip code is required',
					})}
				/>
				{errors.location && <p role="alert">{errors.location.message}</p>}
				<label htmlFor="searchRadius">Search radius</label>
				<input
					type="number"
					id="searchRadius"
					placeholder="Radius in miles"
					{...register('searchRadius', {
						required: 'A search radius is required',
						min: { message: 'A positive value is required', value: 0.01 },
					})}
				/>
				{errors.searchRadius && <p role="alert">{errors.searchRadius.message}</p>}
				<label htmlFor="date">When</label>
				<input
					type="datetime-local"
					id="date"
					placeholder={new Date().toString()}
					{...register('mealTime', {
						required: 'A time is required',
					})}
				/>
				{/* <Button type="submit" id="Submit" form="join-event-form"> */}
				{/* 	Submit */}
				{/* </Button> */}
				<div className="flex justify-end">
					<button className="btn" type="submit" id="Submit" form="join-event-form">
						Submit
					</button>
				</div>
				{errorRes && <p role="alert">{errorRes}</p>}
			</form>
		</>
	)
}
