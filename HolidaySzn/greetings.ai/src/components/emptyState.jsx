import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import NewOccasionForm from './createNewOccasion';
import getUserProfile from '../middleware/localUserManager';
import { useEffect, useState } from 'react';
const moment = require('moment');

function EmptyState(props)
{

    const [userName, setUserName] = useState(null);
    

    const getUserName = () => {
        getUserProfile().then(
            (data) => setUserName(data)
        ).catch(err => console.log(err))
    }

    useEffect(() => {
		getUserName();
	}, []);

    return (
        <Container className = "mt-5">
            <Col md = {3}></Col>
            <Col md = "auto" >
            <Row >
                Hello {userName || "there"}, <br /><br />
                You don't have any greetings yet. Use the form below to get started
            </Row>
            <NewOccasionForm />
            </Col>
            <Col md = {3}></Col>
        </Container>
    )
}

export {EmptyState}