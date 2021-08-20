import React from 'react';
import { AppBar, Typography, makeStyles, Button } from '@material-ui/core';
import { KeyboardArrowLeft, Add } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    appbar: {
        alignContent: "center",
        alignItems: "center",
        flexDirection: "row"
        
    },
    createChat: {
        color: "#fff",
        position: 'fixed',
        top: theme.spacing(2),
        right: theme.spacing(0.5),
    },
    returnBtn: {
        color: "#fff",
        position: 'fixed',
        top: theme.spacing(2),
        left: theme.spacing(0.5),
    },
    titleLeft: {
        padding: "2%",
    },
    titleRight: {
        padding: "2%",
        paddingLeft: "10%",
    },
}));


export default function ChatsAppBar({chatId, title, handleOnReturn, handleOnCreate}) {
    const classes = useStyles();
    return (
        <AppBar position="sticky" className={classes.appbar}>
                <Typography className={chatId? classes.titleRight :classes.titleLeft} variant="h4" >{ title }</Typography>
                {chatId ?
                <Button className={classes.returnBtn} onClick={e => handleOnReturn()}>
                        <KeyboardArrowLeft />
                    </Button>
                :
                handleOnCreate && <Button className={classes.createChat} onClick={(e) => handleOnCreate()}>
                        <Add  />
                </Button>
                }
            </AppBar>
    );
 }