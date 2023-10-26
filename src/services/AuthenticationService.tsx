import axios, { AxiosRequestConfig } from 'axios'
import StorageService from './StorageService'

const AUTH_API = 'http://localhost:8080/api/auth/'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const config: AxiosRequestConfig<any> = {
	headers: {
		'Content-Type': 'application/json',
	},
}

type loginCredentials = {
	email: string
	password: string
}

type registrationCredentials = loginCredentials & {
	displayName: string
}

export default {
	login: (credentials: loginCredentials) => {
		return axios.post(AUTH_API + 'authenticate', credentials, config)
	},

	register: (data: registrationCredentials) => {
		return axios.post(AUTH_API + 'authenticate', data, config)
	},

	logout(): void {
		StorageService.removeJwt()
	},

	isAuthenticated() {
		return StorageService.isLoggedIn()
	},
}
