import React from 'react';
import { Fab, makeStyles } from '@material-ui/core';
import { Close, Chat } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function OpenChatsContainerButton({open, handleStateChange}) {
    const classes = useStyles();

    return (
        <Fab onClick={(e)=> handleStateChange(e)} size="medium" color="secondary" aria-label="add" className={classes.fab}>
                {open? <Close /> : <Chat />}
            </Fab>
    );

 };
