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
		console.log('Now send this data!')
		console.log(data)

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
			<h2>Join event</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="entryCode">Entry code</label>
				<input
					type="text"
					id="entryCode"
					placeholder="ABCDEF"
					{...register('entryCode', {
						required: 'A six letter entry code is required',
					})}
				/>
				{errors.entryCode && <p role="alert">{errors.entryCode.message}</p>}
				<button type="submit" id="Submit">
					Submit
				</button>
				{errorRes && <p role="alert">{errorRes}</p>}
			</form>
		</>
	)
}
