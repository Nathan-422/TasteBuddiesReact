import { useNavigate } from 'react-router-dom'
import { useAuth } from '../providers/authProvider'
import { useEffect } from 'react'

function SignIn() {
	const { setToken } = useAuth()
	const navigate = useNavigate()

	const handleLogin = (newToken: string) => {
		setToken(newToken)
		navigate('/', { replace: true })
	}

	useEffect(() => {
		handleLogin('Test token from SignIn component')
	}, [])

	return <p>SignIn</p>
}

export default SignIn
