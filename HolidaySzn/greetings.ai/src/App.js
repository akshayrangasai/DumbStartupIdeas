import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PublicLanding from "./screens/Public/PublicLanding";
import UserProfile from "./screens/Authenticated/userProfile";
//import NewOccasionForm from "./components/createNewOccasion";
import { NewOccasions, ShowOccasions } from "./screens/Authenticated/Occasion";
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import AuthenticatedApp from "./screens/Authenticated/AuthenticatedApp";

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
			<ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} minBreakpoint="xxs" > 
				
				{user ? <AuthenticatedApp user = {user} /> : <PublicLanding />}
			
			</ThemeProvider>
		</div>
	);
}

export default App;