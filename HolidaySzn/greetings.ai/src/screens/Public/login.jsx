import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import Image from "react-bootstrap/esm/Image";
//require('dotenv').config();
import styles from "../../static/styles.module.css";

function Login() {
	const authURL = process.env.REACT_APP_SERVER_URL+'/auth/google';
	const googleAuth = () => {
		//var serverURL = "http://localhost:5555/auth/google";
		//serverURL = serverURL.concat(serverURL,"/auth/google");
		window.open(
			authURL,
			"_self"
		);
	};
	return (
			<Container fluid="md">
				<h1 className={styles.heading}>Get started with greetings</h1>
				<Row>
					<Col></Col>
					<Col></Col>
					<Col>
					<Button size="lg" className="mb-2" variant="primary" onClick={googleAuth}>
						<Image src = "../../public/google_button.png" />
					</Button>
					</Col>
					<Col></Col>
					<Col></Col>
				
				</Row>
			</Container>
	);
}

export default Login;