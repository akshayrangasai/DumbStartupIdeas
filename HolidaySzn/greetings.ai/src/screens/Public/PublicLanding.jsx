import { Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import PublicNav from "./PublicNav";
import Login from "./login";
import Container from "react-bootstrap/esm/Container";
import LandingContent from "./LandingContent";
//require('dotenv').config();
import styles from "../../static/styles.module.css";
import PrivacyPolicy from "./PrivacyPolicy";

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
		<Container fluid = "xl">
			<PublicNav />
			<Routes>
				<Route
					exact
					path="/login"
					element= {<Login />}
				/>
				<Route
					exact
					path="/privacy"
					element= {<PrivacyPolicy />}
				/>
				<Route
					exact
					path="/"
					element={<LandingContent />}
				/>
				<Route
					exact
					path="/signup"
					element={<Login />}
				/>
			</Routes>
			
		</Container>
	);
}

export default PublicLanding;