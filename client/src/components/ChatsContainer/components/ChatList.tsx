import { Avatar, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import { Customers } from "../../../data/customers";
import { useAppDispatch, useConversationsInMemory} from "../../../hooks";
import { setNewCurrentChatId } from "../../../features/sessionControl/chatSlice";
export default function ChatList(){

    // let customers = Customers.filter(customer => customer.recipientId === 'test@gmail.com')

    const conversationsInMemory = useConversationsInMemory();
    
    const customers = conversationsInMemory.map(conversation => {
        // console.log('conversation.customerId: ', conversation.customerId)
        return conversation.customerId; // There is a type error in here. The is containing an object {phoneNumber: ''} when it should have only the value.
    })

    // const customers = useConversationsInMemory().map(conversation => {
    //     return {customer: conversation.messages}
    // })



    const dispatch = useAppDispatch();

    const handleSelectConversation = (index: number) => {
        dispatch(setNewCurrentChatId(customers[index]));
    }
    
    return(
        <List>
        {
            customers ? (
            customers.map((customer, index) => (
                <ListItem button key={index} onClick={() => {handleSelectConversation(index)}}>
                <ListItemIcon>
                    <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                </ListItemIcon>
                <ListItemText primary={customer}></ListItemText>
            </ListItem>
            ))
            ) : (<div></div>)
        }

        {/* {conversationsToLoad?.map((customerConversation, index) => (
            <ListItem button key={index} onClick={() => {handleSelectConversation(index)}}>
                <ListItemIcon>
                    <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                </ListItemIcon>
                <ListItemText primary={customerConversation.customerId}>Alice</ListItemText>
            </ListItem>
        ))} */}
        {/* <ListItem button key="RemySharp"> 
            <ListItemIcon>
                <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
            </ListItemIcon>
            <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
            <ListItemText secondary="online" sx={{ textAlign: "right"}}></ListItemText>
        </ListItem>
        <ListItem button key="Alice">
            <ListItemIcon>
                <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
            </ListItemIcon>
            <ListItemText primary="Alice">Alice</ListItemText>
        </ListItem>
        <ListItem button key="CindyBaker">
            <ListItemIcon>
                <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
            </ListItemIcon>
            <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
        </ListItem> */}
    </List>
    )
}