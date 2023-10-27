import { createContext, useMemo, useContext, useState } from 'react'
import { useNavgate } from 'react-router-dom'
import axios from 'axios'
import StorageService from '../services/StorageService'
const AuthContext = createContext()
const [token, setToken_] = useState(StorageService.getJwt())
const navigate = useNavgate();

const setToken = (token: string) => {
	setToken_(token)
}

useEffect(() => {
	if (token) {
		axios.defaults.headers.common["Authorization"] = 'Bearer ' + token
		StorageService.saveJwt(token)	
	} else {
		delete axiox.defaults.headers.common['Authorization']
		StorageService.removeJwt()
	}
})
const logout = () => {
	setUser(null)
	navigate("/", { replace: true })
}

const value = useMemo(
	() => ({
		user: token,
		login,
		logout,
	}),
	[token]
)

const AuthProvider = ({children: React.ReactNode}) => {
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
	return useContext(AuthContext)
}
