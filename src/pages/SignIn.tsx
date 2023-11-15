import { useNavigate } from 'react-router-dom'
import { useAuth } from '../providers/authProvider'
import Auth from '../services/AuthenticationService'
import { Helmet } from 'react-helmet'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import Button from '../components/elements/Button'

interface IFormInput {
	email: string
	password: string
}

function SignIn() {
	const { setToken } = useAuth()
	const [errorRes, setErrorRes] = useState(null)
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>()
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
				<title>Login - TasteBuddies</title>
			</Helmet>
			<h2>Login</h2>
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
				{errors.password?.type === 'required' && (
					<p role="alert">{errors.password.message}</p>
				)}
				<Button id="submit" type="submit">
					Submit
				</Button>
				{errorRes && <p role="alert">{errorRes}</p>}
			</form>
		</>
	)
}

export default SignIn
