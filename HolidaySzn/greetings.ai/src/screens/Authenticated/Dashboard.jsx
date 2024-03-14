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
import moment from "moment";

function Dashboard() {

	const [occasionRender, setOccasionRender] = useState(null);
	const [sentEmailRender, setSentEmailRender] = useState(null);

	const getOccasionData = () => {
		const serverURL = process.env.REACT_APP_SERVER_URL;
		const url = serverURL.concat("/crud/occasion/all");

		axios.get(url, { withCredentials: true }).then(
			(data) => {
				//console.log(data.data)
				const mapData = data.data;
				//const renderValue = mapData.map(function(props,i){ console.log(props); return (<MessageCard props = {props} key = {i} />)});
				if (mapData.length > 0)
					setOccasionRender(mapData);
			}).catch(
				(err) => {
					console.log(err);
				}
			);
	}
	const getSentEmailData = () => {

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
				(err) => {
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


						<h1 className={styles.heading}>	<u>Upcoming Greetings in {moment().year()} </u></h1>


						{occasionRender ? occasionRender.map(function (props, i) {
							let todayMonthDay = moment().format('MM-DD');
							let occasionDate_m = new Date(props.occasionDate);
							occasionDate_m = moment(occasionDate_m).year(moment().year());
							console.log(moment(occasionDate_m, 'MM-DD'))
							//console.log(moment(props.occasionDate, 'MM-DD'), moment(props.occasionDate, 'MM-DD').isAfter(moment(todayMonthDay, 'MM-DD')))
							if (moment(occasionDate_m, 'MM-DD').isAfter(moment(todayMonthDay, 'MM-DD'))) {
								//console.log()
								return (<MessageCard data={props} key={i} />)
							}
							else {
								return (<div></div>)
							}
						}) : <EmptyState />}
					</Col>
					<Col md={1}></Col>
					<Col>
						<h1 className={styles.heading}>	<u>Delievered Greetings in {moment().year()}</u></h1>
						{sentEmailRender ? sentEmailRender.map(function (props, i) {
							let todayMonthDay = moment().format('MM-DD');
							let occasionDate_m = new Date(props.occasionDate);
							occasionDate_m = moment(occasionDate_m).year(moment().year());
							if (moment(occasionDate_m, 'MM-DD').isBefore(moment(todayMonthDay, 'MM-DD'))) {
								return (<EmailCard data={props} key={i} />)
							}
							else {
								return (<div></div>)
							}
						}) : "No Greetings Sent Yet. We'll send them as soon as the day arrives!"}
					</Col>

				</Row>


			</Container>
		</div>
	);


}




export default Dashboard;
