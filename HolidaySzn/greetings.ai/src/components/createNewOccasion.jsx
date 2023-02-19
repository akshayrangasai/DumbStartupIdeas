import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Toast from 'react-bootstrap/Toast'
class NewOccasionForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            toEmail: null,
            toPhone: null,
            toName: null,
            toDetails: null ,
            occasionDate: null,
            occasionDetails: null,
            occasionName: null
        };
        //bind(this.onChange,this);
        this.handleClick = this.handleClick.bind(this);
        axios.defaults.withCredentials = true;

    }


    onChange = e =>
    {
        console.log(e.target.value)
        this.setState( { [e.target.name] : e.target.value});
        //console.log(e.target.value);
    }

    handleClick(e)
    {
        e.preventDefault();
        //console.log(this.state);
        const apiEndPoint = "/crud/occasion/create/";
        const serverURL = process.env.REACT_APP_SERVER_URL;
        //console.log(serverURL.concat(apiEndPoint));
        /*Replace with global context on serverURL or maybe not*/
        
        //console.log(JSON.stringify(this.state))
        axios.post(serverURL.concat(apiEndPoint),
        //JSON.parse(JSON.stringify(this.state))
        this.state
            /*
            toEmail: null ||,
            toPhone: null ||,
            toName: null ||,
            toDetails: null || ,
            occasionDate: null ||,
            occasionDetails: null ||,
            occasionName: null ||,
            */
).then(message => alert('Successfully added greeting! Check your greetings in My Greetings')).catch(
    (err) => alert('Unable to add your greeting! Try again!')
);
        //console.log(e.target);
        

    }
    render(){
        //if(this.props.type == "login")
        //{
            return(
                <Container className = "mx-auto mt-3">
                    <Row>
                   
                        <Col xs lg="10" md="auto" className="d-block align-items-center">
                        <Row>
                        <h4 className='mx-auto d-block align-items-center'>
                            Add a new greeting!
                        </h4>
                        </Row>
                        <Form className='d-grid gap-6'>
                            <br />
                            <Form.Group controlID = 'createOccasion' className = 'mb-3 d-grid gap-6'>
                                <Row>
                                    <Col xs lg="3" md="auto" className="d-flex align-items-center"><Form.Label>Recepient Name</Form.Label></Col>
                                    <Col xs lg="6"><Form.Control type="text" name = 'toName' placeholder="Taylor Swift" onChange={this.onChange} /></Col>
                                </Row>
                                <br />
                                <Row>
                                <Col xs lg="3" md="auto" className="d-flex align-items-center"><Form.Label>Email Address</Form.Label></Col>
                                <Col xs lg="6"><Form.Control type="email" name = 'toEmail' placeholder="taylor@swift.com" onChange={this.onChange} /></Col>
                                </Row>
                                <br />
                                <Row>
                                <Col xs lg="3" md="auto" className="d-flex align-items-top"><Form.Label>Adjectives to describe recepient</Form.Label></Col>    
                                <Col xs lg="6" md="auto"><Form.Control type="text" className = "mx-auto" name = 'toDetails' placeholder="Most beautiful, talented and entreprneurial person in the world" onChange={this.onChange} />
                                <Form.Text xs lg="4" className="text-muted mx-auto">
                                    Descrption stays constant for every person. Be as descriptive as possible. <br /> Sentences or just words acceptable
                                </Form.Text>
                                
                                </Col>
                                
                                </Row>
                                <br />
                                <Row>
                                    <Col xs lg="3" md="auto" className="d-flex align-items-top"><Form.Label>What kind of event are we sending greetings for?</Form.Label></Col>
                                    <Col xs lg="6" md="auto" className="d-flex align-items-center"><Form.Control type="text" name = 'occasionName' placeholder="Birthday" onChange={this.onChange} /></Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col xs lg="3" md="auto" className="d-flex align-items-center"><Form.Label>Date to send greeting</Form.Label></Col>
                                    <Col xs lg="6" md="auto" className="d-flex align-items-center"><Form.Control type="date" className='mx-auto' name = 'occasionDate' placeholder="12/13/1989" onChange={this.onChange} /><br />
                                <br />
                                
                                </Col>
                                <Form.Text xs lg="4" className="text-muted mx-auto">
                                    We send it annually, more options on frequency coming soon!
                                </Form.Text>
                                </Row>
                                <br />
                                <Row>
                                    <Col xs lg="3" md="auto" className="d-flex align-items-center"><Form.Label>Event Description</Form.Label></Col>
                                    <Col xs lg="6" md="auto" className="d-flex align-items-center"><Form.Control type="textarea" className="mx-auto" name = 'occasionDetails' placeholder="Best day in the world, and the birthday for good music" onChange={this.onChange} /></Col>
                                <Form.Text className="text-muted" xs lg="4">
                                    Try to form sentences, but words also work. This can be modified for each event you add.
                                </Form.Text>
                                </Row>
                                <br />
                                <Row>
                                    <Col xs lg="3" md="auto" className="d-flex align-items-center"><Button onClick={this.handleClick}> Submit </Button></Col>
                                </Row>
                                
                            </Form.Group>
                    
                        </Form>
                        </Col>
                    </Row>
                </Container>

            );
        //}
    }

}

export default NewOccasionForm;