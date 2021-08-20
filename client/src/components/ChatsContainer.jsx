import React from 'react';
import { Popper, Paper, makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    toolbar: theme.mixins.toolbar,

    content: {
        width: "500px",
        height: "400px",
        overflowX: "hidden",
        overflowY: "visible",
    }
}));

export default function ChatsContainer({ open, anchorEl, children }) {
    const classes = useStyles();

    return (
        <Popper  open={ open} anchorEl={anchorEl}>
            <Paper className={classes.content} elevation={3}>
                <div className={classes.toolbar}>
                    {children}
                </div>
            </Paper> 
        </Popper>
    );
 }