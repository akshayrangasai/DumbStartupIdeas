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
    
    /*
    If I ever want a user profile in the future
    <Nav.Link href = "/user">My Profile</Nav.Link>
    */
    return(
        <Container fluid="md">
            <Navbar expand="sm" variant="light" bg="light">
                    <Navbar.Brand href = "/">greetings.ai</Navbar.Brand>
                    <Nav className = "justify-content-end" activeKey={props.pathname}>
                        
                        
                        <Nav.Link href = "/addOccasion" >Add Occasion</Nav.Link>
                        <Nav.Link href = "/myGreetings"  className="d-none d-lg-block">My Greetings</Nav.Link>
                        <Nav.Link href = "/myPeople"  className="d-none d-lg-block">My People</Nav.Link>
                        <Nav.Link href = "/sentGreetings"  className="d-none d-lg-block">Sent Greetings</Nav.Link>
                        <Nav.Link href = "#" className="d-none d-sm-block" onClick={logOut}>Logout</Nav.Link>
                        </Nav>
                        <Nav className = "ms-auto">
                        <Nav.Item className="justify-content-right d-none d-xl-block">
                            {props.user}
                        </Nav.Item>
                        </Nav>
                    
            
        </Navbar>
        </Container>

    )
}



export default AuthenticatedNav;