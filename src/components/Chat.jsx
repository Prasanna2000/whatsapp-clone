import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import { Avatar, IconButton } from '@mui/material';
import { AttachFile, Mic, MoreVert, SearchOutlined } from '@mui/icons-material';

import firebase from 'firebase/compat/app';

import InputEmoji from 'react-input-emoji'

import "../css/chat.css";
import db from "../firebase/firebase";
import { useStateValue } from "../state/StateProvider";

function Chat() {

    const [iconSeed, setIconSeed] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [roomName, setRoomName] = useState("");
    const { roomId } = useParams();
    const { user } = useStateValue()[0];

    useEffect(() => {
        setIconSeed((Math.random()));
    }, [roomId]);

    useEffect(() => {
        if (roomId) {
            db.collection("rooms")
                .doc(roomId)
                .onSnapshot((snapshot) => {
                    setRoomName(snapshot.data().name)
                });

            db.collection("rooms")
                .doc(roomId)
                .collection("messages")
                .orderBy("timestamp", "asc")
                .onSnapshot((snapshot) => {
                    setMessages(snapshot.docs.map(doc => doc.data()));
                });
        }
    }, [roomId])


    const sendMessage = () => {

        if (message.trim() !== "") {
            db.collection("rooms")
                .doc(roomId)
                .collection("messages")
                .add({
                    message: message,
                    name: user.displayName,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                })
        }
    };

    return (
        <div className="chat">

            {/* Chat Header */}
            <div className="chat__header">

                <Avatar src={`https://avatars.dicebear.com/api/male/${iconSeed}.svg`} />

                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>{messages.length > 0 ? "Last chat at " + new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString() : ""}</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            {/* Chat Body */}
            <div className="chat__body">
                {messages.map((message) => {
                    return (
                        <p className={`chat__message ${(message.name === user.displayName) && 'chat__sender'}`}>
                            <span className="chat__name">{message.name}</span>
                            <span className="chat__content">{message.message}
                                <span className="chat__timestamp">{
                                    new Date(message.timestamp?.toDate()).toUTCString()
                                }</span>
                            </span>
                        </p>
                    )
                })}
            </div>

            {/* Chat Footer */}
            <div className="chat__footer">

                <form>
                    <InputEmoji
                        onChange={setMessage}
                        value={message}
                        onEnter={sendMessage}
                        cleanOnEnter
                        placeholder="Type a message" />
                    <button type="submit">Send Message</button>
                </form>

                <IconButton>
                    <Mic />
                </IconButton>
            </div>
        </div>
    );
}

export default Chat;
