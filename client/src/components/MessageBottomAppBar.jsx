import React,{useState} from 'react';
import { makeStyles, AppBar, TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    msgAppBar: {
        top: 'auto',
        bottom: 0,
    },
}));


export default function MessageBottomAppBar({handleOnSubmit, handleOnChange}) {
    const classes = useStyles();
    
    return (
        <AppBar position="fixed" color="secondary" className={classes.msgAppBar}>
            <TextField
                variant="filled"
                style={{ margin: 8 }}
                placeholder="Enter a new message here ..."
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={(e) => handleOnChange(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        if (e.target.value.length > 0) {
                            handleOnSubmit();
                            handleOnChange("");
                            e.target.value = "";   
                        }
                    }
                }}
            />
        </AppBar>
    );
}