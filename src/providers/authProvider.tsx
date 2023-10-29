import React from 'react'
import { createContext, useMemo, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import StorageService from '../services/StorageService'

interface IAuthContext {
	token: string | null
	setToken: (newToken: string) => void
}

const AuthContext = createContext<IAuthContext | null>(null)

interface Props {
	children: React.ReactNode
}

const AuthProvider = ({ children }: Props) => {
	const [token, setToken_] = useState(StorageService.getJwt())

	const setToken = (newToken: string) => {
		setToken_(newToken)
	}

	useEffect(() => {
		if (token) {
			axios.defaults.headers.common['Authorization'] = token
			StorageService.saveJwt(token)
		} else {
			delete axios.defaults.headers.common['Authorization']
			StorageService.removeJwt()
		}
	}, [token])

	const contextValue = useMemo(
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
