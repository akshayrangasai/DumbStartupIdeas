import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

class NewOccasionForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            text: "",
            isListening: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.toggleListening = this.toggleListening.bind(this);
        axios.defaults.withCredentials = true;

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.setState(prevState => ({
                    text: prevState.text + (prevState.text ? " " : "") + transcript,
                    isListening: false
                }));
            };

            this.recognition.onerror = (event) => {
                console.error("Speech recognition error", event.error);
                this.setState({ isListening: false });
            };

            this.recognition.onend = () => {
                this.setState({ isListening: false });
            };
        }
    }


    onChange = e =>
    {
        this.setState( { [e.target.name] : e.target.value});
    }

    toggleListening() {
        if (this.state.isListening) {
            if (this.recognition) this.recognition.stop();
            this.setState({ isListening: false });
        } else {
            if (this.recognition) {
                this.recognition.start();
                this.setState({ isListening: true });
            } else {
                alert("Speech recognition not supported in this browser.");
            }
        }
    }

    handleClick(e)
    {
        e.preventDefault();
        const apiEndPoint = "/crud/occasion/create-from-text/";
        const serverURL = process.env.REACT_APP_SERVER_URL;
        
        axios.post(serverURL.concat(apiEndPoint), { text: this.state.text })
        .then(message => {
            alert('Successfully added greeting! Check your greetings in My Greetings');
            this.setState({ text: "" });
        }).catch(
            (err) => alert('Unable to add your greeting! Try again!')
        );
    }

    render(){
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
                                    <Col xs lg="12">
                                        <Form.Label>Describe the greeting you want to send</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={5}
                                            name='text'
                                            placeholder="Remind me to wish Taylor a happy birthday next Friday. Her email is taylor@swift.com. She is the best."
                                            value={this.state.text}
                                            onChange={this.onChange}
                                        />
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col className="d-flex gap-2">
                                        <Button variant={this.state.isListening ? "danger" : "secondary"} onClick={this.toggleListening}>
                                            {this.state.isListening ? "Stop Listening" : "Start Speaking"}
                                        </Button>
                                        <Button onClick={this.handleClick}>Create Greeting</Button>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Form>
                        </Col>
                    </Row>
                </Container>

            );
    }

}

export default NewOccasionForm;
