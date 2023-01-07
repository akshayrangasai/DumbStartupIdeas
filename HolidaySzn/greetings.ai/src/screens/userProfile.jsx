import { Link, renderMatches } from "react-router-dom";
//require('dotenv').config();
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { UserCard } from "../components/displayCard";
import axios from "axios";

function UserProfile() {
	const [userProfile, setUserProfile] = useState(null);
	var userProfileComponent = null;
  /* Check user exists, if not check with server and then add local storage, if not change stack */
	const getUserProfile = () => {

			const serverURL = process.env.REACT_APP_SERVER_URL; 
			const url = serverURL.concat("/auth/user/profile");
			
			axios.get(url, { withCredentials: true }).then(
				(data) => {
				console.log(data.data);
				
				//console.log(userProfile)
				
				userProfileComponent = Object.values(data.data);
				console.log('userProfile', userProfileComponent);
				setUserProfile(userProfileComponent);
				}
			).catch( (err) => console.log(err))
			}

	
	useEffect(() => {
		getUserProfile();
	}, []);

	return (
		<div className={styles.container}>

			{
				userProfile ? userProfile.map(function(obj,i){
					return <UserCard key = {i} props = {obj} /> ;
				}):"Waiting for profile details"
			}
			
		</div>
	);
}

export default UserProfile;