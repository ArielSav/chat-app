import React,{useRef, useEffect} from 'react';
import { makeStyles, Grid, Chip } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    msgGridContainer: {
        display: "flex",
        flexDirection: "column",
        marginBottom: "14%",
    },
    
    notCurrentUser: {
        alignSelf: "end",
    }
}));



export default function MessagesGrid({messages, isCustomer}) {

    const classes = useStyles();

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behivor: "smooth" });
    }
    
    useEffect(() => {
        scrollToBottom();
    }, [messages])

    return (
        <Grid className={classes.msgGridContainer} container spacing={1}>
            {messages.map(msg => {
                const notCurrentUser = isCustomer ? msg.isSenderCustomer ? null : classes.notCurrentUser : msg.isSenderCustomer ? classes.notCurrentUser : null;
                return (
                    <Grid key={messages.indexOf(msg)} item xs className={notCurrentUser}>
                        <Chip label={msg.message} />
                    </Grid>
                );
            })}
            <div ref={messagesEndRef} />
        </Grid>
    );
}
