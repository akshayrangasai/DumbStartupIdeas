import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import styles from '../../static/styles.module.css';
import Button from "react-bootstrap/esm/Button";
import Login from "./login";
import { Link } from "react-router-dom";
function PrivacyPolicy()
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
            <h1 className={styles.heading}>greetings Privacy Policy</h1>
            <Row>
            <Col md="2">
            </Col>
            <Col md="8">
            <p></p>
            <p></p>
            <p></p>
            <Container>
            <b>Privacy Policy for DumbStartupIdeas.com</b>
            <br />

Effective Date: 2/18/2023<br /><br />

At DumbStartupIdeas.com, we value your privacy and understand the importance of protecting your personal information. This Privacy Policy outlines the types of personal information we collect, how we use it, and the steps we take to safeguard your information. This application complies with the Google API Services User Data Policy, including the Limited Use requirements.
<br /><br />
<b>
Information We Collect
</b>
<br />
We collect your email address when you sign up for our service. We use the Google Gmail API to send emails on your behalf, but we do not store any of your personal email or Google information with anyone else. We use restricted email scopes in the Gmail API to ensure that we only have access to the minimum amount of data necessary to provide our service.
<br /><br /><b>
Use of Information
</b><br />
We use your email address to send emails on your behalf using the Gmail API. We do not use your email address for any other purpose, nor do we share your email address with third parties.
<br /><br /><b>
Data Security
</b><br />
We take the security of your personal information seriously and use appropriate technical and organizational measures to protect your personal information against unauthorized or unlawful processing and against accidental loss, destruction or damage.
<br /><br />
<b>Retention of Information
</b><br />
We will retain your email address for as long as you use our service or until you delete your account. If you delete your account, we will delete your email address from our systems.
<br /><br />
<b>Your Rights
</b><br />
You have the right to access, rectify, erase, restrict or object to the processing of your personal information. You may also request a copy of your personal information or ask us to transfer your personal information to another data controller. If you wish to exercise any of these rights, please contact us using the contact details provided below.
<br /><br />
<b>Contact Us
</b><br />
If you have any questions or concerns about our Privacy Policy, please contact us at privacy@dumbstartupideas.com. We will respond to your request as soon as possible.
<br /><br />
Disclosure: Dumbstartupidea's use and transfer of information received from Google APIs to any other app will adhere to <a href = "https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes">Google API Services User Data Policy</a>, including the Limited Use requirements 
<b>Changes to Privacy Policy
</b><br />
We reserve the right to modify or amend this Privacy Policy at any time. Any changes we make to this Privacy Policy will be updated on our website. Your continued use of our service after the changes have been made will constitute your acceptance of the changes.
              
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

export default PrivacyPolicy;