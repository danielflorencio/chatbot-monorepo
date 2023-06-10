import { Box, Button, Divider, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
export default function BotConfig(){
    
    const [greetingMessages, setGreetingMessages] = useState<string[]>(['First Greeting Message']);
    
    const handleGreetingMessageChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, indexToChange: number) => {
        e.preventDefault();
        let newGreetingMessagesState = [...greetingMessages]
        newGreetingMessagesState[indexToChange] = e.target.value
        setGreetingMessages([...newGreetingMessagesState])
    }

    const handleGreetingsMessageDelete = (indexToRemove: number) => {
        // e.preventDefault();
        let newGreetingMessagesState = [...greetingMessages]
        newGreetingMessagesState.splice(indexToRemove, 1)
        setGreetingMessages([...newGreetingMessagesState])        
    }

    return(
        <Box>
            <Box component='form'>
                {
                    greetingMessages.map((greetingMessage, index) => (
                    <Box key={index}>
                        <TextField fullWidth placeholder="Greeting Message" value={greetingMessage} onChange={(e) => handleGreetingMessageChange(e, index)}/>
                        <Button variant="outlined" sx={{marginTop: 1}} color='error' startIcon={<DeleteIcon />} onClick={() => handleGreetingsMessageDelete(index)}> Delete </Button>
                        <Divider sx={{marginY: 1}}/>
                    </Box>
                    ))
                }
                {/* <TextField fullWidth placeholder="Greeting Message" value={greetingMessages}/> */}
            </Box>
            <Box>
                <Button variant="outlined" color='success' onClick={() => setGreetingMessages([...greetingMessages, ''])}>New Greeting Message</Button>
            </Box>
            <Divider sx={{marginTop: 1}}></Divider>
        </Box>

    )
}