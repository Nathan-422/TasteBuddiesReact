import Events from './pages/Events'
import Home from './pages/Home'
import Login from './pages/Login.tsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

export default function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/login" element={<Login />}></Route>
					<Route path="/events" element={<Events />}></Route>
				</Routes>
			</Router>
		</>
	)
}
