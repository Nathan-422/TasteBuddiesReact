import { useNavigate } from 'react-router-dom'
import { useAuth } from '../providers/authProvider'

const SignOut = () => {
	const { setToken } = useAuth()
	const navigate = useNavigate()

	const handleLogout = () => {
		setToken(null)
		navigate('/', { replace: true })
	}

	return (
		<>
			<p>Sign out</p>
			<button onClick={handleLogout}>Sign out</button>
		</>
	)
}

export default SignOut
