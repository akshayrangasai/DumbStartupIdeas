import { Link, renderMatches } from "react-router-dom";
//require('dotenv').config();
import styles from "../../static/styles.module.css";
import { useEffect, useState } from "react";
import { EmptyState } from "../../components/emptyState";
import { MessageCard } from "../../components/displayCard";
import NewOccasionForm from "../../components/createNewOccasion";
import axios from "axios";

function Dashboard() {
	
	const [occasionRender, setOccasionRender] = useState(null);

	const getData = ()=>{
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

	useEffect(() => {
		getData();
	}, []);


	return (
		<div className={styles.container}>
			
			{occasionRender?occasionRender.map(function(props,i){ return (<MessageCard data = {props} key = {i} />)}):<EmptyState />}
			
		</div>
	);

	
}




export default Dashboard;
