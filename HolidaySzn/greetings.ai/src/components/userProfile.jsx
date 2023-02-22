import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/esm/Image';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
const moment = require('moment');

function UserProfileView(props){

    const recepientView = props.recepientData.map(function(r){return (<div>{r}</div>)})

    return(
        <Container className='mx-auto'>
        <Row>
            <Col>
            <Image src = {props.userData.image} />
            </Col>
            <Col>
            <Row>
            {props.userData}
            </Row>
            <Row>
            {props.recepientData[0]}
            </Row>
            </Col>

        </Row>
        </Container>
    )

}


export {UserProfileView}