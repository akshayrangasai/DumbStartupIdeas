import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Navigate } from 'react-router-dom';
const moment = require('moment');
/*function MessageCard(props)
{
    return(Object.values(props.data))
}
*/
function MessageCard(prop)
{
    
    const [props, setProps] = useState(prop.data);

    useEffect(()=>
    {
        setProps(prop.data);
        //console.log(prop.data)

    },[]);
    
    
    const deleteMessage = (_id) => {

        console.log('delete called with id', _id)
        const serverURL = process.env.REACT_APP_SERVER_URL;
        const APIendPoint = '/crud/occasion/delete/'
        const urlEndPoint = serverURL.concat(APIendPoint, _id);
        console.log(urlEndPoint);
        axios.get(urlEndPoint,{withCredentials:true}).then(
            (data) => {return <Navigate to = "/occasion" />}
        ).catch(
            (err) => console.log(err)
        )

    }
    const editRedirect = (_id) => {
        
    }
    


    return(
        <div className = 'messageCard'>
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
            <span className = 'messageCardTitle'>Occasion Details : </span> <span className = 'messageCardValue'>{props.occasionId}</span>
            </div>
            <div className = 'messageCardSection'>
            <Button variant='primary' size = 'sm' onClick={editRedirect(props.occasionId)} className = 'messageButton'>Edit Message</Button>
            <Button variant='danger' size = 'sm' onClick={deleteMessage(props.occasionId)} className = 'messageButton'>Delete Message</Button>
            </div>
        </div>
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