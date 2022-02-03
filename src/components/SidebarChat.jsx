import React, { useState, useEffect } from 'react';

import { Link } from "react-router-dom";

import { Avatar } from '@mui/material';

import "../css/sidebarChat.css";
import db from "../firebase/firebase"

function SidebarChat({ id, roomName, addNewChat }) {

    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState("");

    useEffect(() => {
        if (id) {
            db.collection("rooms")
                .doc(id)
                .collection("messages")
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) => (
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                ));
        }
    }, [id]);

    useEffect(() => {
        setSeed((Math.random() * 5000));
    }, []);

    const createChat = () => {
        const createRoomName = prompt("Please enter naame for chat room");
        if (createRoomName) {
            db.collection("rooms").add({
                name: createRoomName,
            })
        }
    };

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/male/${seed}.svg`} />
                <div className="sidebarChat__info">
                    <h2>{roomName}</h2>
                    <p>{messages.length > 0 ? `${messages[0]?.message?.substring(0, 40)} ${messages[0]?.length > 40 ? "..." : ""}` : ""}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add new Chat</h2>

        </div>
    );
}

export default SidebarChat;
