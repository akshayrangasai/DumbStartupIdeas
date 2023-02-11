import { Link } from "react-router-dom";
import PublicNav from "./PublicNav";
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
			<div className={styles.form_container}>
					<button className={styles.google_btn} onClick={googleAuth}>
						<span>Sign in with Google</span>
					</button>
			</div>
	);
}

export default Login;