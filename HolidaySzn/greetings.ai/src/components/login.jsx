import { Link } from "react-router-dom";
//require('dotenv').config();
import styles from "./styles.module.css";

function Login() {
	const googleAuth = () => {
		var serverURL = "http://localhost:5555/auth/google";
		serverURL = serverURL.concat(serverURL,"/auth/google");
		window.open(
			'http://localhost:5555/auth/google',
			"_self"
		);
	};
	return (
		<div className={styles.container}>
			<h1 className={styles.heading}>Log in Form</h1>
			<div className={styles.form_container}>
				<div className={styles.left}>
					<img className={styles.img} src="./images/login.jpg" alt="login" />
				</div>
				<div className={styles.right}>
					<h2 className={styles.from_heading}>Members Log in</h2>
					<input type="text" className={styles.input} placeholder="Email" />
					<input type="text" className={styles.input} placeholder="Password" />
					<button className={styles.btn}>Log In</button>
					<p className={styles.text}>or</p>
					<button className={styles.google_btn} onClick={googleAuth}>
						<span>Sign in with Google</span>
					</button>
					
				</div>
			</div>
		</div>
	);
}

export default Login;