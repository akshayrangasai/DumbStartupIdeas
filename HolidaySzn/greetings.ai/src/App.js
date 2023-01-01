import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./components/login";
import "./App.css";

function App() {
	const [user, setUser] = useState(null);

  /* Check user exists, if not check with server and then add local storage, if not change stack */
	const getUser = async () => {
		try {
			const url = `${process.env.SERVER_URL}/auth/user`;
			const { data } = await axios.get(url, { withCredentials: true });
			setUser(data.user);
			
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<div className="container">
      <Routes>
				<Route
					exact
					path="/login"
					element={user ? <Navigate to="/" /> : <Login />}
				/>
			</Routes>
		</div>
	);
}

export default App;