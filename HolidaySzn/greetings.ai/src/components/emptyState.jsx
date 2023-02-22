import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import NewOccasionForm from './createNewOccasion';
import {getUserProfile, getUserProfileName} from '../middleware/localUserManager';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
const moment = require('moment');

function EmptyState(props)
{

    const [userName, setUserName] = useState(null);
    

    const getUserName = () => {
        getUserProfileName().then(
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
                You don't have any greetings yet. <br /> <br />
                <Button href = "/addOccasion" className='d-block'>Click Here to Get Started</Button>
            </Row>
            </Col>
            <Col md = {3}></Col>
        </Container>
    )
}

export {EmptyState}