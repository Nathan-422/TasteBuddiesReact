import { useNavigate } from "react-router-dom"
import { useAuth } from "../providers/authProvider"
import { useEffect } from "react"


const SignOut = () => {
	const { setToken } = useAuth()
	const navigate = useNavigate()
	const handleLogout = () => {
		setToken(null)
		navigate('/', {replace: true})
	}

 useEffect(() => {
		handleLogout()
	}, []) 

	return (
	<>
		<p>Sign out</p>
	</>
	)
}

export default SignOut
