import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Home() {
	return (
		<>
			<Helmet>
				<title>TasteBuddies</title>
			</Helmet>
			<h2>Home</h2>
			<p>Home works</p>
			<ul>
				<li>
					<Link to={'/'}>Home</Link>
				</li>
				<li>
					<Link to={'/login'}>Login</Link>
				</li>
				<li>
					<Link to={'/logout'}>Sign out</Link>
				</li>
				<li>
					<Link to={'/event'}>Events</Link>
				</li>
			</ul>
		</>
	)
}
