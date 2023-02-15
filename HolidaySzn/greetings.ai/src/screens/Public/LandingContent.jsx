import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import styles from '../../static/styles.module.css';
import Login from "./login";
function LandingContent()
{

    return(

        <Container fluid = "sm">
            <h1 className={styles.heading}>Welcome to greetings.ai</h1>
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
            </Container>
            <Container>
                <b>greetings.ai</b> 
                </Container><Container>
                    Whenever you find out about an event, just fill out details with descriptions and forget about it. 
                <br />
                We'll do the rest.
            </Container>
            <Container>
                <Login />
            </Container>
            </Col>
            <Col md="2">
            </Col>
            </Row>
        </Container>
    );
}

export default LandingContent;