import { Link, renderMatches } from "react-router-dom";
import styles from "../../static/styles.module.css";
import Container from "react-bootstrap/esm/Container";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import axios from "axios";
function AuthenticatedNav(props)
{

    const logOut = () =>
    {
    const serverURL = process.env.REACT_APP_SERVER_URL; 
	const url = serverURL.concat("/auth/logout");
			
	axios.get(url, { withCredentials: true }).then(
		(data) => {
			//console.log(data.data)
			localStorage.removeItem('user');
            window.open(
                '/',
                "_self"
            );

		}).catch(
			(err)=> {
				console.log(err);
			}
		);
	}
    
    return(
        <Container fluid="md">
            <Navbar expand="lg" variant="light" bg="light">
                    <Navbar.Brand href = "/">greetings.ai</Navbar.Brand>
                    <Nav className = "justify-content-end" activeKey={props.pathname}>
                        
                        <Nav.Link href = "/user">My Profile</Nav.Link>
                        <Nav.Link href = "/addOccasion" >Add Occasion</Nav.Link>
                        <Nav.Link href = "/myOccasions">My Occasions</Nav.Link>
                        <Nav.Link href = "#" onClick={logOut}>Logout</Nav.Link>
                        </Nav>
                        <Nav className = "ms-auto">
                        <Nav.Item className="justify-content-right">
                            {props.user}
                        </Nav.Item>
                        </Nav>
                    
            
        </Navbar>
        </Container>

    )
}



export default AuthenticatedNav;