import { useNavigate } from 'react-router-dom'
import { useAuth } from '../providers/authProvider'
import Auth from '../services/AuthenticationService'
import StorageService from '../services/StorageService'
const { setToken } = useAuth()
const navigate = useNavigate()

function submitForm(event: React.FormEvent<HTMLFormElement>) {
	console.log('Submit form fired')
	event.preventDefault()

	Auth.login({ email: 'nathan@example.net', password: 'password' })
		.then((response) => {
			setToken(response.data.idToken)
			navigate('events', { replace: true})
			// StorageService.saveJwt(response.data.idToken)
			// TODO: continue form success message from here
		})
		.catch((error) => {
			alert(error)
			// TODO: add error message here
		})
		.finally(() => {
			console.log('This might have worked')
			// TODO: probably remove this? Clear password
		})
}

export default function Login() {
	return (
		<>
			<h2>Login</h2>
			<form
				className="[&>label>input]:rounded-md [&>label>input]:border-2 [&>label>input]:border-gray-400"
				onSubmit={submitForm}
			>
				<label htmlFor="email" content="Email">
					Email
					<input type="text" name="email" id="email" />
				</label>
				<label htmlFor="password">
					Password
					<input type="password" name="password" id="password" />
				</label>
				<button
					className="rounded-md bg-yellow-400 px-3 py-1 shadow-sm"
					type="submit"
					id="submit"
				>
					Submit
				</button>
			</form>
		</>
	)
}
