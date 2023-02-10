import { Link } from "react-router-dom";
//require('dotenv').config();
import styles from "./styles.module.css";

function Login() {
	const authURL = process.env.REACT_APP_SERVER_URL+'/auth/google';
	const googleAuth = () => {
		var serverURL = "http://localhost:5555/auth/google";
		serverURL = serverURL.concat(serverURL,"/auth/google");
		window.open(
			authURL,
			"_self"
		);
	};
	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Log in to greetings.ai</h1>
			<div className={styles.form_container}>
					<button className={styles.google_btn} onClick={googleAuth}>
						<span>Sign in with Google</span>
					</button>
			</div>
		</div>
	);
}

export default Login;