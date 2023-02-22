import { Link, renderMatches } from "react-router-dom";
//require('dotenv').config();
import styles from "../../static/styles.module.css";
import { useEffect, useState } from "react";
import { UserProfileView } from "../../components/userProfile";
import axios from "axios";
import Image from 'react-bootstrap/esm/Image';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/Card';
import CardHeader from "react-bootstrap/esm/CardHeader";
import { RecepientCard } from "../../components/displayCard";
import CardImg from "react-bootstrap/esm/CardImg";
const moment = require('moment');


function UserProfile() {
	const [userProfile, setUserProfile] = useState(null);
	const [recepient, setRecepient] = useState(null);
	var userProfileComponent = null;
  /* Check user exists, if not check with server and then add local storage, if not change stack */
	const getUserProfile = () => {

			const serverURL = process.env.REACT_APP_SERVER_URL; 
			const url = serverURL.concat("/auth/user/profile");
			
			axios.get(url, { withCredentials: true }).then(
				(data) => {
				console.log(data.data);
				
				setUserProfile(data.data);
				}
			).catch( (err) => console.log(err))
			}
		
			const getRecepientData = ()=>{
				const serverURL = process.env.REACT_APP_SERVER_URL; 
				const url = serverURL.concat("/crud/recepient/all");
						
				axios.get(url, { withCredentials: true }).then(
					(data) => {
						//console.log(data.data)
						const mapData = data.data;
						console.log(mapData);
						//const renderValue = mapData.map(function(props,i){ console.log(props); return (<MessageCard props = {props} key = {i} />)});
						setRecepient(mapData);
					}).catch(
						(err)=> {
							console.log(err);
						}
					);
				}
	
	useEffect(() => {
		getUserProfile();
		getRecepientData();
	}, []);

	return (
		
		<Container className='mx-auto' fluid>
        {userProfile?(
			<Container>
		<Row>
            <Col className="mx-auto" md = {4}>
				<Card fluid="xl" className = "mt-4 lh-3" bg = "light" md="450">
				<CardImg src= {userProfile.image}></CardImg>
					<CardHeader><b>{userProfile.name}'s Profile</b><br />
					Email: {userProfile.user}<br />
					Joined: {moment(userProfile.createdAt).format("ddd DD-MM-YY")}<br />
					Updated : {moment(userProfile.modifiedAt).format("ddd DD-MM-YY")}
					<br />
					{userProfile.canSendEmail?<span className="text-primary">Email Permissions Enabled</span>:<span className="text-warning bg-dark">Can't Send Email. Please Update Permissions</span>}
					</CardHeader>
				</Card>
				</Col>
				<Col>
			<Container className="mt-3 d-block">
            <Row xs={3}>
				<h1>My Contacts</h1>
			{recepient?recepient.map(function(props,i){  return (<Col md = {6}><Card key = {i} className="border-none d-block p-2 mt-2" bg = "light" style = {{height : '8rem'}}><Card.Body className="mt-0"><b>{props.toName}</b><br />{props.toEmail}<br />{props.toDetails}</Card.Body></Card></Col>)}):"Nothing here yet"}
            </Row>
			</Container>
				</Col>
			</Row>
			
            

        </Container>):"Loading User Profile"}
        </Container>
	);
}

export default UserProfile;