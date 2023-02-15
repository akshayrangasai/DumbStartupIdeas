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
    


    return(
        <Card fluid="xl" className = "mt-5" md="450">
            <div className = 'messageCardSection'>
            <span className = 'messageCardTitle'>Name : </span> <span className = 'messageCardValue'>{props.toName}</span>
            <span className = 'messageCardTitle'>Email : </span> <span className = 'messageCardValue'>{props.toEmail}</span>
            </div>
            <div className = 'messageCardSection'>
            <span className = 'messageCardTitle'>Occasion : </span> <span className = 'messageCardValue'>{props.occasionName}</span>
            <span className = 'messageCardTitle'>Date : </span> <span className = 'messageCardValue'>{moment(props.occasionDate).format("MMM-DD")}</span>
            </div>
            <div className = 'messageCardSection'>
            <span className = 'messageCardTitle'><b>Person</b>alization : </span> <span className = 'messageCardValue'>{props.toDetails}</span> 
            <br />
            <span className = 'messageCardTitle'>Occasion Details : </span> <span className = 'messageCardValue'>{props.occasionDetails}</span>
            </div>
            <div className = 'messageCardSection'>
            <Button variant='danger' size = 'sm' onClick={deleteMessage(props.occasionId)} className = 'messageButton'>Delete Message</Button>
            </div>
        </Card>
    );
}

function RecepientCard(props)
{
    return(
        <div className = 'recepientCard'>
            <span className = 'recepientCardTitle'>Name : </span> <span className = 'recepientCardValue'>{props.name}</span>
            <span className = 'recepientCardTitle'>Email:  </span> <span className = 'recepientCardValue'>{props.toEmail}</span>
            <span className = 'recepientCardTitle'><b>Person</b>alization : </span> <span className = 'recepientCardValue'>{props.toPromptText}</span>
            <Button variant='primary'>Edit Person</Button>
        </div>
    );
}

function UserCard(props)
{
    return(
        
            <div>{Object.values(props)}</div>
        
    );
}

export {MessageCard, RecepientCard, UserCard}