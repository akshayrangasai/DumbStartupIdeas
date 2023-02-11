import { Link, renderMatches } from "react-router-dom";
import styles from "../../static/styles.module.css";
import Container from "react-bootstrap/esm/Container";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'

function PublicNav(props)
{
    return(
        <Container>
            <Navbar expand="lg" variant="light" bg="light">
                <Container>
                    <Navbar.Brand href = "/">greetings.ai</Navbar.Brand>
                </Container>
                <Container>
                    <Nav className = "me-auto">
                        <Nav.Link href = "/login">Login</Nav.Link>
                        <Nav.Link href = "/about">About</Nav.Link>
                        <Nav.Link href = "/examples">Examples</Nav.Link>
                    </Nav>
            </Container>
        </Navbar>
        </Container>

    )
}

export default PublicNav;