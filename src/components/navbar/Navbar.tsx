import { Link } from 'react-router-dom'
import AuthenticationService from '../../services/AuthenticationService'

type link = {
	text: string
	path: string
}

const links = [
	{
		text: 'Event',
		path: '/event',
	},
]
const login: link = { text: 'login', path: '/login' }
const logout: link = { text: 'Log out', path: '/logout' }

export const Navbar = () => {
	const authLink = () => {
		return AuthenticationService.isAuthenticated() ? logout : login
	}

	return (
		<nav>
			<Link to="/">Home</Link>
			<div className="flex justify-end">
				{links.map((link) => {
					return (
						<Link to={link.path} key={link.text}>
							{link.text}
						</Link>
					)
				})}
				{<Link to={authLink().path}>{authLink().text}</Link>}
			</div>
		</nav>
	)
}
