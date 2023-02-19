import { Link, renderMatches } from "react-router-dom";
//require('dotenv').config();
import styles from "../../static/styles.module.css";
import { useEffect, useState } from "react";
import { EmptyState } from "../../components/emptyState";
import { MessageCard, EmailCard } from "../../components/displayCard";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import axios from "axios";
import Container from "react-bootstrap/esm/Container";

function Dashboard() {
	
	const [occasionRender, setOccasionRender] = useState(null);
	const [sentEmailRender, setSentEmailRender] = useState(null);

	const getOccasionData = ()=>{
	const serverURL = process.env.REACT_APP_SERVER_URL; 
	const url = serverURL.concat("/crud/occasion/all");
			
	axios.get(url, { withCredentials: true }).then(
		(data) => {
			//console.log(data.data)
			const mapData = data.data;
			//const renderValue = mapData.map(function(props,i){ console.log(props); return (<MessageCard props = {props} key = {i} />)});
			if(mapData.length >0)
			setOccasionRender(mapData);
		}).catch(
			(err)=> {
				console.log(err);
			}
		);
	}
	const getSentEmailData = ()=>{
	
	const serverURL = process.env.REACT_APP_SERVER_URL; 
	const url = serverURL.concat("/crud/occasion/sent/all");
			
	axios.get(url, { withCredentials: true }).then(
		(data) => {
			//console.log(data.data)
			const mapData = data.data;
			//console.log(mapData);
			//const renderValue = mapData.map(function(props,i){ console.log(props); return (<MessageCard props = {props} key = {i} />)});
			setSentEmailRender(mapData);
		}).catch(
			(err)=> {
				console.log(err);
			}
		);
		}
		
	useEffect(() => {
		getOccasionData();
		getSentEmailData();
	}, []);


	return (
		<div className={styles.Container}>
		<Container fluid className="mt-10">
			
			<Row>

			<Col>
			
			
			<h1 className={styles.heading}>	<u>Greetings Scheduled </u></h1>
			
			
			{occasionRender?occasionRender.map(function(props,i){ 
				if(i<=4) 
				{
					return (<MessageCard data = {props} key = {i} />)
				}
				else{
					return (<div></div>)
				}
				}):<EmptyState />}
			</Col>
			<Col md={1}></Col>
			<Col>
			<h1 className={styles.heading}>	<u>Greetings Sent </u></h1>
			{sentEmailRender?sentEmailRender.map(function(props,i){ 
				if(i<=4) 
				{
					return (<EmailCard data = {props} key = {i} />)
				}
				else{
					return (<div></div>)
				}
				}):"No Greetings Sent Yet. We'll send them as soon as the day arrives!"}
			</Col>
			
			</Row>
			
			
		</Container>
		</div>
	);

	
}




export default Dashboard;
