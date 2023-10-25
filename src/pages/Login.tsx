export default function Login() {
	return (
		<>
			<h2>Login</h2>
			<form className="[&>label>input]:rounded-md [&>label>input]:border-2 [&>label>input]:border-gray-400">
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
					type="button"
					id="submit"
				>
					Submit
				</button>
			</form>
		</>
	)
}
