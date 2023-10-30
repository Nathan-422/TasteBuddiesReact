import { Link } from "react-router-dom";

export default function Home() {
	return (
		<>
			<h2>Home</h2>
			<p>Home works</p>
			<ul>
				<li><Link to={"/"}>Home</Link></li>
				<li><Link to={"/login"}>Login</Link></li>
				<li><Link to={"/signout"}>Sign out</Link></li>
				<li><Link to={"/events"}>Events</Link></li>
			</ul>
		</>
	)
}
