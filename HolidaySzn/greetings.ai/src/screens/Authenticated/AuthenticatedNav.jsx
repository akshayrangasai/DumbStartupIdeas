import { Link, renderMatches } from "react-router-dom";
import styles from "../../static/styles.module.css";
import Container from "react-bootstrap/esm/Container";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import axios from "axios";
import Button from "react-bootstrap/esm/Button";
import Image from "react-bootstrap/Image"
function AuthenticatedNav(props)
{


    
    const logOut = () =>
    {
    const serverURL = process.env.REACT_APP_SERVER_URL; 
	const url = serverURL.concat("/auth/logout");
			
	axios.get(url, { withCredentials: true }).then(
		(data) => {
			//console.log(data.data)
			localStorage.clear();
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
    
    const relogin =   <Row sm className = "mx-auto text-muted bg-warning text-xl p-1">
    <center>
    You can't send emails with your permissions, please <a href = "#" class="text-white bg-danger" onClick={logOut} style = {{textDecoration : 'none'}} >Login</a> again to the app with the right credentials on the login screen
    </center>
</Row>
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
                        
                        </Nav>
                        <Nav className = "ms-auto">
                        
                        <Nav.Item className="justify-content-right d-none d-xl-block p-1">
                        <Nav.Link href = "/userProfile" ><Image src={props.image} roundedCircle width = "35px" className=""/></Nav.Link>
                        </Nav.Item>
                        <Nav.Link href = "#" className="d-none justify-content-right d-sm-flex p-2 align-items-center ms-auto" onClick={logOut}>Logout</Nav.Link>    
                        </Nav>
                    
            
        </Navbar>
        {props.canSendEmail?"": relogin}
        </Container>

    )
}



export default AuthenticatedNav;