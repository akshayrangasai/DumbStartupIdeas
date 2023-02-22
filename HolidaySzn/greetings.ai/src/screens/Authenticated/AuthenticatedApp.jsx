import { Routes, Route, Navigate } from "react-router-dom";
import UserProfile from "./userProfile";
//import NewOccasionForm from "./components/createNewOccasion";
import { NewOccasions, ShowOccasions, SentOccasions } from "./Occasion";
import {ShowRecepients} from './Recepient'
import Container from "react-bootstrap/esm/Container";
import AuthenticatedNav from "./AuthenticatedNav";
import Dashboard from "./Dashboard";
import styles from "../../static/styles.module.css";
//require('dotenv').config();

function AuthenticatedApp(props) {
	return (
		<Container>
		<AuthenticatedNav user={props.user} canSendEmail = {props.canSendEmail} name = {props.name} image = {props.image}/>
      	<Routes>
				<Route
					exact
					path="/addOccasion"
					element= {<NewOccasions user = {props.user} props = {props} />}
				/>
                <Route
					exact
					path="/"
					element= {<Dashboard user = {props.user} props = {props}/>}
				/>
				<Route
					exact
					path="/userProfile"
					element={<UserProfile user = {props.user} props = {props}/>}
				/>
				<Route
					exact
					path="/myGreetings"
					element={<ShowOccasions user = {props.user} props = {props}/>}
				/>
				<Route
					exact
					path="/myPeople"
					element={<ShowRecepients user = {props.user} props = {props}/>}
				/>
				<Route
					exact
					path="/sentGreetings"
					element={<SentOccasions user = {props.user} props = {props}/>}
				/>
			</Routes>
		</Container>
	);
}

export default AuthenticatedApp;
