import { useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Helmet } from 'react-helmet'
import EventService from '../services/EventService'
import { useState } from 'react'

export default function JoinEvent() {
	interface IFormInput {
		entryCode: string
	}

	const [errorRes, setErrorRes] = useState(null)
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>({
		defaultValues: {
			entryCode: '',
		},
	})
	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		EventService.joinEvent(data.entryCode)
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
				className="form"
				id="create-event-form"
				onSubmit={handleSubmit(onSubmit)}
			>
				<h2>Join event</h2>
				<label htmlFor="entryCode">Entry code</label>
				<input
					type="text"
					id="entryCode"
					placeholder="ABCDEF"
					{...register('entryCode', {
						required: 'A six letter entry code is required',
						min: { message: 'Entry code must be six letters', value: 6 },
						max: { message: 'Entry code must be six letters', value: 6 },
					})}
				/>
				{errors.entryCode && <p role="alert">{errors.entryCode.message}</p>}
				<button className="btn" type="submit" id="Submit" form="create-event-form">
					Submit
				</button>
				{errorRes && <p role="alert">{errorRes}</p>}
			</form>
		</>
	)
}
