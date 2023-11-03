import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../providers/authProvider'
import Auth from '../services/AuthenticationService'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useEffect, useState } from 'react'

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

	useEffect(() => {
		console.log(dirtyFields)
		console.log(watchPassword)
		console.log(watchConfirmPassword)
		// TODO: this only runs once as the initial change to the object triggers the effect, but not subsequent
	}, [dirtyFields, watchPassword, watchConfirmPassword, touchedFields])

	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		Auth.login(data)
			.then((response) => {
				setToken(response.data.idToken)
				navigate('../event', { replace: true, relative: 'path' })
				// TODO: continue form success message from here
			})
			.catch((error) => {
				// console.log(error.response)
				setErrorRes(error.response.status)
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
			<h1>Register</h1>
			<p>Registration page works</p>
			<form
				className="[&>label>input]:rounded-md [&>label>input]:border-2 [&>label>input]:border-gray-400"
				onSubmit={handleSubmit(onSubmit)}
			>
				<label htmlFor="email" content="Email">
					Email
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
				</label>
				{errors.email?.type === 'required' && (
					<p role="alert">{errors.email.message}</p>
				)}
				{errors.email?.type === 'pattern' && (
					<p role="alert">{errors.email.message}</p>
				)}
				<label htmlFor="displayName" content="displayName">
					Display Name
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
				</label>
				{errors.displayName?.type === 'required' && (
					<p role="alert">{errors.displayName.message}</p>
				)}
				{errors.displayName?.type === 'minLength' && (
					<p role="alert">{errors.displayName.message}</p>
				)}
				<label htmlFor="password">
					Password
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
				</label>
				<label htmlFor="confirmPassword">
					Password
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
				</label>
				{errors.password?.type === 'required' && (
					<p role="alert">{errors.password.message}</p>
				)}
				{/* TODO: Write password comparison   */}
				{errors.password?.type === 'required' && (
					<p role="alert">{errors.password.message}</p>
				)}
				<button
					className="rounded-md bg-yellow-400 px-3 py-1 shadow-sm"
					type="submit"
					id="submit"
				>
					Submit
				</button>
				{errorRes && <p role="alert">{errorRes}</p>}
			</form>
		</>
	)
}
