import React from 'react'
import { createContext, useMemo, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import StorageService from '../services/StorageService'

type AuthContextType = {
	token: string | null
	setToken: (newToken: string | null) => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

interface Props {
	children: React.ReactNode
}

const AuthProvider = ({ children }: Props) => {
	const [token, setToken_] = useState(StorageService.getJwt())

	const setToken = (newToken: string | null) => {
		setToken_(newToken)
	}

	useEffect(() => {
		if (token) {
			axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
			StorageService.saveJwt(token)
		} else {
			delete axios.defaults.headers.common['Authorization']
			StorageService.removeJwt()
		}
	}, [token])

	const contextValue: AuthContextType = useMemo(
		() => ({
			token,
			setToken,
		}),
		[token]
	)

	return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
	// this check allows for runtime checks that this hook is being used correctly
	if (!AuthContext) {
		throw new Error('useAuth must be used within <AuthContext.Provider>')
	}

	return useContext(AuthContext)
}

export default AuthProvider
