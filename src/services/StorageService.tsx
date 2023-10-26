const TOKEN = 'TasteBuddiesJWT'
export default {
	clean: () => {
		window.localStorage.clear()
	},
	saveJwt(jwt: string) {
		this.removeJwt()
		window.localStorage.setItem(TOKEN, jwt)
	},
	removeJwt() {
		window.localStorage.removeItem(TOKEN)
	},
	getJwt() {
		const token = window.localStorage.getItem(TOKEN)
		return token ? token : null
	},
	isLoggedIn(): boolean {
		const token = this.getJwt()

		if (token == null) {
			return false
		}

		return this.isTokenExpired(token)
	},
	isTokenExpired(token: string): boolean {
		const expiry = JSON.parse(atob(token.split('.')[1])).exp

		const expired = Math.floor(new Date().getTime() / 1000) >= expiry

		if (expired) {
			this.removeJwt()
			return false
		}

		return true
	},
}
