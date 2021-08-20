import React, {useState} from 'react';

import OpenChatsContainerButton from '../components/OpenChatsContainerButton';
import ChatsContainer from '../components/ChatsContainer';
import ChatsComponent from '../components/ChatsComponent';

export default function HomePage({isCustomer}) {
    const [anchorEl, setAnchorEl] = useState(null);

    const openChats = Boolean(anchorEl);

    return (
        <div>
            <div>{isCustomer? "You Are On Customer Page" : "You Are On Support Page"}</div>
            <OpenChatsContainerButton open={openChats} handleStateChange={(e) => setAnchorEl(anchorEl ? null : e.currentTarget)} />
            <ChatsContainer open={openChats} anchorEl={anchorEl} children={<ChatsComponent isCustomer={isCustomer} /> }/>
        </div>
    );
 }