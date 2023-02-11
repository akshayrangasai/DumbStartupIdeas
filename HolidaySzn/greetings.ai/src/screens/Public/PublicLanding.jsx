import { Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import PublicNav from "./PublicNav";
import Login from "./login";
import Container from "react-bootstrap/esm/Container";
import LandingContent from "./LandingContent";
//require('dotenv').config();
import styles from "../../static/styles.module.css";

function PublicLanding() {
	const authURL = process.env.REACT_APP_SERVER_URL+'/auth/google';
	const googleAuth = () => {
		//var serverURL = "http://localhost:5555/auth/google";
		//serverURL = serverURL.concat(serverURL,"/auth/google");
		window.open(
			authURL,
			"_self"
		);
	};
	return (
		<Container>
			<PublicNav />
			<h1 className={styles.heading}>Welcome to greetings.ai</h1>
			<Routes>
				<Route
					exact
					path="/login"
					element= {<Login />}
				/>
				<Route
					exact
					path="/"
					element={<LandingContent />}
				/>
			</Routes>
			
		</Container>
	);
}

export default PublicLanding;