import React, { useEffect, useState } from 'react';

import { Avatar, IconButton } from '@mui/material'
import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@mui/icons-material';

import db from "../firebase/firebase"

import SidebarChat from "./SidebarChat";
import { useStateValue } from "../state/StateProvider";
import "../css/sidebar.css";

function Sidebar() {

    const [rooms, setRooms] = useState([]);
    const { user } = useStateValue()[0];
    useEffect(() => {
        const unsubscribe = db.collection('rooms')
            .onSnapshot((snapshot) => {
                setRooms(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })

        return (() => { unsubscribe() });
    }, []);

    return (
        <div className="sidebar">

            {/* Sidebar header */}
            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />

                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLarge />
                    </IconButton>

                    <IconButton>
                        <Chat />
                    </IconButton>

                    <IconButton>
                        <MoreVert />
                    </IconButton>

                </div>
            </div>

            {/* Sidebar Search */}
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input type="text" placeholder="Search or start new chat" />
                </div>
            </div>
            {/* Sidebar Chats */}
            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                {rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} roomName={room.data.name} />
                ))}
            </div>
        </div>
    );
}

export default Sidebar;
