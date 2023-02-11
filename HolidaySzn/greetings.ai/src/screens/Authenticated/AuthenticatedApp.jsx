import { Routes, Route, Navigate } from "react-router-dom";
import UserProfile from "./userProfile";
//import NewOccasionForm from "./components/createNewOccasion";
import { NewOccasions, ShowOccasions } from "./Occasion";
import Container from "react-bootstrap/esm/Container";
import AuthenticatedNav from "./AuthenticatedNav";
import Dashboard from "./Dashboard";
import styles from "../../static/styles.module.css";
//require('dotenv').config();

function AuthenticatedApp(props) {
	return (
		<Container>
		<AuthenticatedNav user={props.user} />
      <Routes>
				<Route
					exact
					path="/addOccasion"
					element= {<NewOccasions />}
				/>
                <Route
					exact
					path="/"
					element= {<Dashboard />}
				/>
				<Route
					exact
					path="/user"
					element={<UserProfile />}
				/>
				<Route
					exact
					path="/myOccasions"
					element={<ShowOccasions />}
				/>
			</Routes>
		</Container>
	);
}

export default AuthenticatedApp;
