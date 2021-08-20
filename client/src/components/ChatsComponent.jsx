import React, {useState, useEffect} from 'react';

import { useTrackedState } from '../Provider';


import MessagesGrid from './MessagesGrid';
import MessageBottomAppBar from './MessageBottomAppBar';
import ChatsList from './ChatsList';
import ChatsAppBar from './ChatsAppBar';


import { socket } from '../helpers/db';



export default function ChatsComponent({ isCustomer }) {
    const [chats, setChats] = useState([]);
    const [chatId, setChatId] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { userName } = useTrackedState();
    const [title, setTitle] = useState("Conversations");


    const populateChats = data => {
        setChats(data);
    };

    const sendNewMessage = (message, id) => {
        socket.emit("sendMessage", message, id, isCustomer);
    }

    const populateCustomerChat = data => {
        setMessages(data);
     }
    const updateChatMessages = id => {
        socket.emit("getChatMessages", id);
    }

    const createChat = id => {
        setChatId(id);
        socket.emit("getCustomerChats",userName);
    }

    useEffect(() => {
        socket.on("getChats", populateChats);
        socket.on("updateChatMessages", updateChatMessages);
        socket.on("getMessages", populateCustomerChat);
        socket.on("chatCreated", createChat);
        if (isCustomer) {
            socket.emit("getCustomerChats", userName);
        }
        else {
            socket.emit("getSupportChats");
         }
        return () => {
            socket.off("getChats");
            socket.off("updateChatMessages");
            socket.off("getMessages");
            socket.off("chatCreated");
        }
    }, [chatId]);



    return (
        <div>
            <ChatsAppBar chatId={chatId} title={title} handleOnReturn={() => {
                if (isCustomer) {
                    socket.emit("getCustomerChats", userName);
                }
                else {
                    socket.emit("getSupportChats");
                }
                setTitle("Conversations");
                setChatId(null);
            }} handleOnCreate ={isCustomer? ()=> socket.emit("createChat", userName): null} />
            {chatId ?
                <div>
                    <MessageBottomAppBar handleOnChange={(text)=>setNewMessage(text)} handleOnSubmit={()=> sendNewMessage(newMessage,chatId)} />
                    <MessagesGrid messages={messages} isCustomer={isCustomer} />
                </div> : <ChatsList chats={chats} isCustomer={isCustomer} handleItemClicked={(id,customerUserName) => {
                    updateChatMessages(id);
                    setChatId(id);
                    if (isCustomer) {
                        setTitle("Support");
                    }
                    else {
                        setTitle(customerUserName);
                    }
                }} />
                }
        </div>
    );
}