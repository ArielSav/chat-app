import React from 'react';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core';
import { PersonRounded } from '@material-ui/icons';


export default function ChatsList({chats,handleItemClicked, isCustomer}) {
    return (
        <List  >
        {chats.map((chat) => {
            return (
                <ListItem key={chat._id} item xs={6} button onClick={(e) => handleItemClicked(chat._id,chat.userName)}>
                    <ListItemAvatar>
                        <Avatar>
                            <PersonRounded />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={isCustomer? "Support" : chat.userName} secondary={chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].message + " " + chat.lastUpdate : `This chat is empty ${chat.lastUpdate}`} />
                </ListItem>
            );
        })}
    </List>
    );
 }