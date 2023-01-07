import { Link, renderMatches } from "react-router-dom";
//require('dotenv').config();
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { MessageCard } from "../components/displayCard";
import NewOccasionForm from "../components/createNewOccasion";
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
			
			{occasionRender?occasionRender.map(function(props,i){ console.log(props); return (<MessageCard data = {props} key = {i} />)}):"Nothing here yet"}
			
		</div>
	);

	
}

function NewOccasions() {

	return(<NewOccasionForm />)

}


export default ShowOccasions;
export{NewOccasions,ShowOccasions};