import { Link, renderMatches } from "react-router-dom";
//require('dotenv').config();
import styles from "../../static/styles.module.css";
import { useEffect, useState } from "react";
import { RecepientCard } from "../../components/displayCard";
import NewOccasionForm from "../../components/createNewOccasion";
import axios from "axios";

function ShowRecepients() {
	
	const [occasionRender, setOccasionRender] = useState(null);

	const getData = ()=>{
	const serverURL = process.env.REACT_APP_SERVER_URL; 
	const url = serverURL.concat("/crud/recepient/all");
			
	axios.get(url, { withCredentials: true }).then(
		(data) => {
			//console.log(data.data)
			const mapData = data.data;
			console.log(mapData);
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
			
			{occasionRender?occasionRender.map(function(props,i){  return (<RecepientCard data = {props} key = {i} />)}):"Nothing here yet"}
			
		</div>
	);

	
}



export default ShowRecepients;
export{ShowRecepients};