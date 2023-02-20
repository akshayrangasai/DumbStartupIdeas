import { Link, renderMatches } from "react-router-dom";
//require('dotenv').config();
import styles from "../../static/styles.module.css";
import { useEffect, useState } from "react";
import { MessageCard, EmailCard } from "../../components/displayCard";
import Row from 'react-bootstrap/Row'
import NewOccasionForm from "../../components/createNewOccasion";
import axios from "axios";

function ShowOccasions() {
	
	const [occasionRender, setOccasionRender] = useState(null);

	const getData = ()=>{
	const serverURL = process.env.REACT_APP_SERVER_URL; 
	const url = serverURL.concat("/crud/occasion/all");
			
	axios.get(url, { withCredentials: true }).then(
		(data) => {
			//console.log(data.data)
			const mapData = data.data;
			//console.log(mapData);
			//const renderValue = mapData.map(function(props,i){ console.log(props); return (<MessageCard props = {props} key = {i} />)});
			setOccasionRender(mapData);
		}).catch(
			(err)=> {
				console.log(err);
			}
		);
	}

	useEffect(() => {
		getData();
	}, []);


	return (
		<div className={styles.container}>
			<Row>
			<h1 className={styles.heading}>My Scheduled Greetings</h1>
			</Row>
			{occasionRender?occasionRender.map(function(props,i){ 
					return (<MessageCard data = {props} key = {i}/>)
				}
				)
			:<div>"No Greetings Scheduled Yet. Click on Add Occasion to get started!"</div>
			}
			
		</div>
	);

	
}

function NewOccasions() {

	return(<NewOccasionForm />)

}

function SentOccasions() {
	
	const [occasionRender, setOccasionRender] = useState(null);

	const getData = ()=>{
	const serverURL = process.env.REACT_APP_SERVER_URL; 
	const url = serverURL.concat("/crud/occasion/sent/all");
			
	axios.get(url, { withCredentials: true }).then(
		(data) => {
			//console.log(data.data)
			const mapData = data.data;
			console.log("mappy");
			//const renderValue = mapData.map(function(props,i){ console.log(props); return (<MessageCard props = {props} key = {i} />)});
			setOccasionRender(mapData);
		}).catch(
			(err)=> {
				console.log(err);
			}
		);
	}

	useEffect(() => {
		getData();
	}, []);


	return (
		<div className={styles.container}>

			<Row>
				<h1 className={styles.heading}>My Sent Greetings</h1>
			</Row>
			
			{occasionRender?occasionRender.map(function(props,i){ console.log(props); return (<EmailCard data = {props} key = {i} />)}):<div>"No Greetings Sent Yet. We'll send them as soon as the day arrives!"</div>}
			
		</div>
	);

	
}
export default ShowOccasions;
export{NewOccasions,ShowOccasions, SentOccasions};