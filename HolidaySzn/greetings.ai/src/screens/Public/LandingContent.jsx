import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import styles from '../../static/styles.module.css'
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
            <p>Ever missed your anniversary or a friend's birthday and had to deal with their absolute disappointment in you?</p><p>
            We have, and that is why greetings.ai</p>

            </Col>
            <Col md="2">
            </Col>
            </Row>
        </Container>
    );
}

export default LandingContent;