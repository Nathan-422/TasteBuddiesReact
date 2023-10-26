import Auth from '../services/AuthenticationService'

function submitForm(event: React.FormEvent<HTMLFormElement>) {
	console.log('Button was pressed')
	event.preventDefault()

	Auth.login({ email: 'nathan@example.net', password: 'password' })
		.then((response) => {
			localStorage.setItem('JWT', response.data.idToken)
			console.log(response.data)
		})
		.catch((error) => {
			alert(error)
		})
		.finally(() => {
			console.log('This might have worked')
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
