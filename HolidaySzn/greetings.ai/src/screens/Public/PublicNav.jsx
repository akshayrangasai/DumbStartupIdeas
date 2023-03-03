import { Link, renderMatches } from "react-router-dom";
import styles from "../../static/styles.module.css";
import Container from "react-bootstrap/esm/Container";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
function PublicNav(props)
{
    /* 
    <Nav.Link href = "/examples" variant="pills">Examples</Nav.Link>
    <Nav.Link href = "/login" col="red">Login</Nav.Link>
    <Nav.Link href = "/signup" col="red">Signup</Nav.Link>
    */
    return(
        <Container fluid="md">
            <Navbar expand="lg" variant="light" bg="light">
                    <Navbar.Brand href = "/">greetings.ai</Navbar.Brand>
                    <Nav className = "justify-content-right" activeKey={props.pathname}>
                        
                    </Nav>
            
        </Navbar>
        </Container>

    )
}

export default PublicNav;