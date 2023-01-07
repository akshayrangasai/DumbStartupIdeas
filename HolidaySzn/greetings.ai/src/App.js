import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./screens/login";
import UserProfile from "./screens/userProfile";
//import NewOccasionForm from "./components/createNewOccasion";
import { NewOccasions, ShowOccasions } from "./screens/Occasion";

import "./App.css";
//require('dotenv').config();

function App() {
	const [user, setUser] = useState(null);
	//const [hitUser, sethitUser] = useState(false);

  /* Check user exists, if not check with server and then add local storage, if not change stack */
	const getUser = async () => {
	
		if(localStorage.getItem('user'))	
		{
		setUser(localStorage.getItem('user'))
		}
		else
		{
		try {
			const serverURL = process.env.REACT_APP_SERVER_URL; 
			const url = serverURL.concat("/auth/user");
			const { data } = await axios.get(url, { withCredentials: true });
			//console.log(data);
			setUser(data.user);
			console.log(data.user);
			localStorage.setItem("user", data.user)
			}
		catch(err)
		{
		console.log(err);
		}
	}
};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<div className="container">
		{user?"Welcome " + user: "Please Login"}
      <Routes>
				<Route
					exact
					path="/"
					element={user ? <NewOccasions /> : <Login />}
				/>
				<Route
					exact
					path="/user"
					element={user ? <UserProfile /> : <Login />}
				/>
				<Route
					exact
					path="/occasion"
					element={user ? <ShowOccasions /> : <Login />}
				/>
			</Routes>
		</div>
	);
}

export default App;