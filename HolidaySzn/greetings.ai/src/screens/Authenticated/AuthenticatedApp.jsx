import { Routes, Route, Navigate } from "react-router-dom";
import UserProfile from "./userProfile";
//import NewOccasionForm from "./components/createNewOccasion";
import { NewOccasions, ShowOccasions } from "./Occasion";

import styles from "../../static/styles.module.css";
//require('dotenv').config();

function AuthenticatedApp(props) {
	return (
		<div className="container">
		{"Welcome " + props.user}
      <Routes>
				<Route
					exact
					path="/"
					element= {<NewOccasions />}
				/>
				<Route
					exact
					path="/user"
					element={<UserProfile />}
				/>
				<Route
					exact
					path="/occasion"
					element={<ShowOccasions />}
				/>
			</Routes>
		</div>
	);
}

export default AuthenticatedApp;
