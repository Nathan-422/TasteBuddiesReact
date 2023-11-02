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
			<p>Sign out</p>
			<button onClick={handleLogout}>Sign out</button>
		</>
	)
}

export default SignOut
