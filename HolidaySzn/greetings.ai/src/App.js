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
	const [name, setName] = useState(null);
	const [canSendEmail, setcanSendEmail] = useState(false);
	const [image, setImage] = useState(false);
	
	//const [hitUser, sethitUser] = useState(false);

  /* Check user exists, if not check with server and then add local storage, if not change stack */
	const getUser = async () => {
	
		if(localStorage.getItem('user'))	
		{
		setUser(localStorage.getItem('user'))
		setcanSendEmail(localStorage.getItem('canSendEmail'))
		setName(localStorage.getItem('name'))
		setImage(localStorage.getItem('image'))
		
		}
		else
		{

		try {
			const serverURL = process.env.REACT_APP_SERVER_URL; 
			const url = serverURL.concat("/auth/user");
			const { data } = await axios.get(url, { withCredentials: true });
			//console.log(data);
			setUser(data.user);
			setName(data.name);
			setcanSendEmail(data.canSendEmail);
			console.log(data.user);
			localStorage.setItem("user", data.user)
			localStorage.setItem("name", data.name)
			localStorage.setItem("canSendEmail", data.canSendEmail)
			localStorage.setItem("image", data.image)
			
			}
		catch(err)
		{
		//console.log(err);

		}
	}
};

	useEffect(() => {
		getUser();
	}, []);

	return (
		<div className="container">
			<ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} minBreakpoint="xxs" > 
				
				{user ? <AuthenticatedApp user = {user} canSendEmail = {canSendEmail} name = {name} image = {image}/> : <PublicLanding /> }
			
			</ThemeProvider>
		</div>
	);
}

export default App;