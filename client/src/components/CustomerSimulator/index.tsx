import { Fab, Grid, Divider, TextField, List, Box, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import MessageComponent from "../ChatsContainer/components/CurrentChat/components/Message";
import { useAppDispatch, useAppSelector, useCurrentChatId, useUserEmail } from "../../hooks";
import { sendMessageCustomer } from "../../features/sessionControl/chatSlice";

export default function CustomerSimulator(){

    const [messageInput, setMessageInput] = useState<string>('');
    const conversationOnScreen = useAppSelector(state => state.chat.conversationOnScreen);
    const currentChatId = useCurrentChatId();

    const loggedUser = useUserEmail();   

    const dispatch = useAppDispatch();

    const handleSubmit = () =>{
        sendNewMessage();
    }

    const sendNewMessage = async () => {
        console.log('sendNewMessage called.')
        const response = await fetch('http://localhost:3000/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "authorization": `${localStorage.getItem('token')}`
              },
              body: JSON.stringify({
                adminReference: loggedUser,
                customerReference: currentChatId,
                content: messageInput,
                senderType: 'customer',
                date: new Date(),
            })
        })
        const data = await response.json();
        console.log('isResponseOk: ', response.ok)
        console.log('data: ', data)
        if(response.ok){
            dispatch(sendMessageCustomer(messageInput));
            setMessageInput('')
        }
    }

    return(
        // <Grid item xs={9}>
        <Grid item>
            <Box sx={{display: 'grid', placeItems: 'center', paddingY: 1, borderBottom: '1px solid #ccc'}}>
                <Typography variant='body1' color='darkgreen' fontWeight={'600'}>Customer view</Typography>
            </Box>
            <List sx={{height: '70vh', overflowY: 'auto'}}>
                {conversationOnScreen.messages ? (conversationOnScreen.messages.map((message, index) => (
                    <div key={index}>
                        <MessageComponent index={index} content={message.content} senderType={message.senderType === 'admin' ? 'customer' : 'admin'} date={message.date}/>
                    </div>
                ))) : (<div></div>)}
            </List>
            <Divider />
            <Grid container style={{padding: '10px'}}>
                <Grid item xs={10}>
                    <TextField id="customer-simulator-input-field" label="Customer chat" fullWidth value={messageInput} onChange={(e) => {e.preventDefault; setMessageInput(e.target.value)}} onKeyPress={(e) => {if (e.key === 'Enter') {handleSubmit();}}} />
                </Grid>
                <Grid item xs={2} sx={{textAlign: "right"}}>
                    <Fab color="primary" aria-label="add"><SendIcon id='send-customer-message-icon' onClick={() => handleSubmit()} /></Fab>
                </Grid>
            </Grid>
        </Grid>
    )
}
// Credits for this component's UI:
// https://medium.com/@awaisshaikh94/chat-component-built-with-react-and-material-ui-c2b0d9ccc491