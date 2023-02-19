import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row';
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
).then(message => console.log(message));
        console.log(e.target);

    }
    render(){
        //if(this.props.type == "login")
        //{
            return(
                <Container className = "mx-auto mt-5">
                    <Row>
                        <h4 className='mx-auto'>
                            Add a new greeting!
                        </h4>
                        <Form className='d-grid gap-6'>
                            <Form.Group controlID = 'createOccasion' className = 'mb-3 d-grid gap-6'>
                                <Form.Label>Recepient Name</Form.Label>
                                <Form.Control type="text" name = 'toName' placeholder="Taylor Swift" onChange={this.onChange} />
                                <br />
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="email" name = 'toEmail' placeholder="taylor@swift.com" onChange={this.onChange} />
                                <br />
                                <Form.Label>Some adjectives to describe this person</Form.Label>
                                <Form.Control type="textarea" name = 'toDetails' placeholder="Most beautiful, talented and entreprneurial person in the world" onChange={this.onChange} />
                                <br />
                                
                                <Form.Label>What is the greeting for?</Form.Label>
                                <Form.Control type="text" name = 'occasionName' placeholder="Birthday" onChange={this.onChange} />
                                <br />
                                <Form.Label>Date to send greeting</Form.Label>
                                <Form.Control type="date" name = 'occasionDate' placeholder="12/13/1989" onChange={this.onChange} />
                                <br />
                                <Form.Label>Try to form sentences, but words also work</Form.Label>
                                <Form.Control type="textarea" name = 'occasionDetails' placeholder="Best day in the world, and the birthday for good music" onChange={this.onChange} />
                                <br />
                                <Button onClick={this.handleClick}> Submit </Button>
                            </Form.Group>
                    
                        </Form>
                    </Row>
                </Container>

            );
        //}
    }

}

export default NewOccasionForm;