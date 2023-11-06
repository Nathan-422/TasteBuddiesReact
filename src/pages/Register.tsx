import { Helmet } from 'react-helmet'
import Auth from '../services/AuthenticationService'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../providers/authProvider'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'

interface IFormInput {
	email: string
	displayName: string
	password: string
	confirmPassword: string
}

export default function Register() {
	const { setToken } = useAuth()
	const [errorRes, setErrorRes] = useState(null)
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, dirtyFields, touchedFields },
	} = useForm<IFormInput>({
		defaultValues: {
			email: '',
			displayName: '',
			password: '',
			confirmPassword: '',
		},
	})
	const watchPassword = watch('password')
	const watchConfirmPassword = watch('confirmPassword')

	const [submitted, setSubmitted] = useState(false)
	const [submissionError, setSubmissionError] = useState('')
	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		setSubmitted(() => {
			return true
		})

		Auth.login(data)
			.then((response) => {
				setToken(response.data.idToken)
				navigate('../event', { replace: true, relative: 'path' })
			})
			.catch((error) => {
				// console.log(error.response)
				setErrorRes(() => {
					return error.response.status
				})
				setSubmissionError(() => {
					return 'Registration unsuccessful. Please try again.'
				})
				// TODO: add error message here
			})
			.finally(() => {
				// TODO: probably remove this? Clear password
			})
	}

	return (
		<>
			<Helmet>
				<title>Sign Up - TasteBuddies</title>
			</Helmet>
			<form
				className="mx-auto flex flex-col sm:w-96 [&>input]:rounded-md [&>input]:border-2 [&>input]:border-gray-400 [&>label]:mt-2 [&>p]:text-red-700"
				onSubmit={handleSubmit(onSubmit)}
			>
				<h2 className="text-4xl">Register</h2>
				<label htmlFor="email" content="Email">
					Email
				</label>
				<input
					type="email"
					id="email"
					{...register('email', {
						required: 'An email address is required',
						pattern: {
							value: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
							message: 'Must be an email',
						},
					})}
				/>
				{errors.email?.type === 'required' && (
					<p role="alert">{errors.email.message}</p>
				)}
				{errors.email?.type === 'pattern' && (
					<p role="alert">{errors.email.message}</p>
				)}
				<label htmlFor="displayName" content="displayName">
					Display Name
				</label>
				<input
					type="text"
					id="display-name"
					{...register('displayName', {
						required: 'A display name is required!',
						minLength: {
							value: 3,
							message: 'Display name must be at least 3 characters.',
						},
					})}
				/>
				{errors.displayName?.type === 'required' && (
					<p role="alert">{errors.displayName.message}</p>
				)}
				{errors.displayName?.type === 'minLength' && (
					<p role="alert">{errors.displayName.message}</p>
				)}
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					{...register('password', {
						required: 'A password is required',
						minLength: {
							value: 7,
							message: 'Password must be at least 7 characters',
						},
					})}
				/>
				<label htmlFor="confirmPassword">Password</label>
				<input
					type="password"
					id="confirmPassword"
					{...register('confirmPassword', {
						required: 'A password is required',
						minLength: {
							value: 7,
							message: 'Password must be at least 7 characters',
						},
					})}
				/>
				{errors.password?.type && <p role="alert">{errors.password.message}</p>}
				{(dirtyFields.password || touchedFields.password) &&
					(dirtyFields.confirmPassword || touchedFields.confirmPassword) &&
					watchPassword !== watchConfirmPassword && (
						<p role="alert">Passwords must match</p>
					)}
				<button
					className="w-20 mt-4 rounded-md bg-yellow-400 px-3 py-1 shadow-sm"
					type="submit"
					id="submit"
				>
					Submit
				</button>
				{errorRes && <p role="alert">{errorRes}</p>}
				{submitted && submissionError && <p role="alert">{submissionError}</p>}
			</form>
		</>
	)
}
