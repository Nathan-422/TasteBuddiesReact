import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../providers/authProvider'

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
	const { token } = useAuth()
	const authLink = () => {
		return token ? logout : login
	}

	return (
		<>
			<header className="flex px-6">
				<div className="mr-auto">
					<Link to="/">Home</Link>
				</div>
				<nav className="">
					<ul className="flex gap-4 hover:[&>li]:underline">
						{links.map((link) => {
							return (
								<li key={link.text}>
									<NavLink to={link.path}>{link.text}</NavLink>
								</li>
							)
						})}
						{
							<li>
								<NavLink to={authLink().path}>{authLink().text}</NavLink>
							</li>
						}
					</ul>
				</nav>
			</header>
		</>
	)
}
