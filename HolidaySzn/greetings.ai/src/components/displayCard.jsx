import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const moment = require('moment');

function MessageCard(prop)
{
    
    const [props, setProps] = useState(prop.data);

    useEffect(()=>
    {
        setProps(prop.data);
        //console.log(prop.data)

    },[]);
    
    /*
    Have decided to not have an edit message button just for simplicity of launch. And makes life so much easier for everyone.
    */
    const deleteMessage = (_id) => {

        return function(){
        console.log('delete called with id', _id)
        const serverURL = process.env.REACT_APP_SERVER_URL;
        const APIendPoint = '/crud/occasion/delete/'
        const urlEndPoint = serverURL.concat(APIendPoint, _id);
        console.log(urlEndPoint);
        axios.get(urlEndPoint,{withCredentials:true}).then(
            (data) => {alert("Successfully Deleted Message"); window.location.reload(true);}
        ).catch(
            (err) => console.log(err)
        )

    }
    }
    
    const previewMessage = (occasionId) => {

        return function(){
            const serverURL = process.env.REACT_APP_SERVER_URL;
            const APIendPoint = '/crud/occasion/message/';
            const urlEndPoint = serverURL.concat(APIendPoint, occasionId);
            console.log(urlEndPoint);
            axios.get(urlEndPoint,{withCredentials:true}).then(
                (data) => {
                    //console.log(data.data);
                    const win = window.open("", "Title", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=200,top=300,left=400");
                    win.document.body.innerHTML = data.data;
                }
            ).catch(
                (err) => console.log(err)
            )
    
        }
        

    }

    const testMessage = (occasionId) => {

        return function(){
            const serverURL = process.env.REACT_APP_SERVER_URL;
            const APIendPoint = '/platform/test/message/';
            const urlEndPoint = serverURL.concat(APIendPoint, occasionId);
            console.log(urlEndPoint);
            axios.get(urlEndPoint,{withCredentials:true}).then(
                (data) => {
                    //console.log(data.data);
                    alert('Check your sent messages for the email just sent!')
                }
            ).catch(
                (err) => alert('Unable to send test email! Check your email settings or login again with email permissions set!')
            )
    
        }
        

    }

    return(
        <Card fluid="xl" className = "mt-5" md="450">
            <div className = 'messageCardSection'>
            <span className = 'messageCardTitle'>Name : </span> <span className = 'messageCardValue'>{props.toName}</span>
            <span className = 'messageCardTitle'>Email : </span> <span className = 'messageCardValue'>{props.toEmail}</span>
            </div>
            <div className = 'messageCardSection'>
            <span className = 'messageCardTitle'>Occasion : </span> <span className = 'messageCardValue'>{props.occasionName}</span>
            <span className = 'messageCardTitle'>Date : </span> <span className = 'messageCardValue'>{moment.utc(props.occasionDate).format("MMM-DD")}</span>
            </div>
            <div className = 'messageCardSection'>
            <span className = 'messageCardTitle'><b>Person</b>alization : </span> <span className = 'messageCardValue'>{props.toDetails}</span> 
            <br />
            <span className = 'messageCardTitle'>Occasion Details : </span> <span className = 'messageCardValue'>{props.occasionDetails}</span>
            </div>
            <div className = 'messageCardSection'>
            <Button variant='primary' size = 'sm' onClick={previewMessage(props.occasionId)} className = 'messageButton'>Preview Message</Button>
            <Button variant='danger' size = 'sm' onClick={deleteMessage(props.occasionId)} className = 'messageButton'>Delete Message</Button>
            <Button variant='secondary' size = 'sm' onClick={testMessage(props.occasionId)} className = 'messageButton'>Email NOW!</Button>
            </div>
        </Card>
    );
}

function RecepientCard(props)
{
    return(
        <Card fluid="xl" className = "mt-5" md="450">
            <span className = 'messageCardTitle'>Name : </span> <span className = 'messageCardValue'>{props.data.toName}</span>
            <span className = 'messageCardTitle'>Email:  </span> <span className = 'messageCardValue'>{props.data.toEmail}</span>
            <span className = 'messageCardTitle'><b>Person</b>alization : </span> <span className = 'messageCardValue'>{props.data.toDetails}</span>
        </Card>
    );
}

function EmailCard(prop)
{
    
    const [props, setProps] = useState(prop.data);

    useEffect(()=>
    {
        setProps(prop.data);
        //console.log(prop.data)

    },[]);
    
    const openMessage = (html) => {

        const win = window.open("", "Title", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=780,height=200,top=300,left=400");
        win.document.body.innerHTML = html;

    }


    return(
        <Card fluid="xl" className = "mt-5" md="450">
            <div className = 'messageCardSection'>
            <span className = 'messageCardTitle'>Name : </span> <span className = 'messageCardValue'>{props.toName}</span>
            <span className = 'messageCardTitle'>Email : </span> <span className = 'messageCardValue'>{props.toEmail}</span>
            </div>
            <div className = 'messageCardSection'>
            <span className = 'messageCardTitle'>Subject : </span> <span className = 'messageCardValue'>{props.emailSubject}</span>
            </div>
            <div className = 'messageCardSection'>
            <span className = 'messageCardTitle'>Date : </span> <span className = 'messageCardValue'>{moment.utc(props.occasionDate).format("MMM-DD")}</span>
            </div>
            <div className = 'messageCardSection'>
            <Button variant='danger' size = 'sm' onClick={() => {openMessage(props.emailContent)}} className = 'messageButton'>Open Sent Message</Button>
            </div>
        </Card>
    );
}



function UserCard(props)
{
    return(
        
            <div>{Object.values(props)}</div>
        
    );
}

export {MessageCard, RecepientCard, UserCard, EmailCard}