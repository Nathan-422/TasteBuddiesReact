import { useNavigate } from 'react-router-dom'
import { useAuth } from '../providers/authProvider'
import { Helmet } from 'react-helmet'
import Button from '../components/elements/Button'

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
			<Button onClick={handleLogout}>Sign out</Button>
		</>
	)
}

export default SignOut
