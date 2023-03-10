import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import styles from '../../static/styles.module.css';
import Button from "react-bootstrap/esm/Button";
import Image from "react-bootstrap/esm/Image";
const logo = require('../../static/google_button_small.png');

function LandingContent()
{

    const authURL = process.env.REACT_APP_SERVER_URL+'/auth/google';
	const googleAuth = () => {
		//var serverURL = "http://localhost:5555/auth/google";
		//serverURL = serverURL.concat(serverURL,"/auth/google");
		window.open(
			authURL,
			"_self"
		);
	};
    return(

        <Container fluid = "sm">
            <h1 className={styles.heading}>Welcome to greetings.ai</h1>
            <center><a href = "https://dumbstartupideas.substack.com/p/not-so-artificial-greetings" target="_blank">Origin Story</a></center>
            <Row>
            <Col md="2">
            </Col>
            <Col md="8">
            <p></p>
            <p></p>
            <p></p>
            <Container>
                Ever missed your anniversary or a friend's birthday and had to deal with their absolute disappointment in you?
                <br /><br />
            
                    Whenever you find out about an event, just fill out details with descriptions and forget about it. 
                <br />
                We'll do the rest.
                <br /><br />
                Use greetings in 4 easy steps:
                <br /><br />
                <ol>
                    <li>
                        Log-in using your google account
                        <ul><li>Don't forget to give permissions to send emails!</li></ul>
                    </li>
                    <br />
                    <li>
                        Enter your friend's email, occasion and a quick prompt on the app
                    </li>
                    <br />
                    <li>
                        Relax, as we generate a greeting and send it to your friend automagically
                    </li>
                    <br />
                    <li>
                        No more missed greeting!
                    </li>
                </ol>
                <br />
                <Button size="lg" className="mb-2" variant="light" onClick={googleAuth}>
                <Image src = {String(logo)} />
					</Button>
                    <br />
                <strong>Temporary Alert</strong>The app will throw a warning screen as you sign up as it is under verification from the google team. Click on continue and do not forget to give the app access to sending emails to use it!
                
            </Container>
            </Col>
            <Col md="2">
            </Col>
            </Row>
            <Row>
                <center>
            <span><a href = "/privacy">privacy policy</a></span>
            </center>
            </Row>
        </Container>
    );
}

export default LandingContent;