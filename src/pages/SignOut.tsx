import { useNavigate } from 'react-router-dom'
import { useAuth } from '../providers/authProvider'
import { Helmet } from 'react-helmet'

const SignOut = () => {
	const { setToken } = useAuth()
	const navigate = useNavigate()

	const handleLogout = () => {
		setToken(null)
		navigate('/', { replace: true })
	}

	return (
		<>
			<Helmet>
				<title>Sign out - TasteBuddies</title>
			</Helmet>
			<div className="card mx-auto flex w-96 flex-col justify-center text-center">
				<h2>Sign out</h2>
				<p className="mb-8">You will be logged out of your account</p>
				<div>
					<button className="btn" onClick={handleLogout}>
						Sign out
					</button>
				</div>
			</div>
		</>
	)
}

export default SignOut
