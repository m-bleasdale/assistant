'use client';

import { React } from 'react';
import { useSelector } from 'react-redux';

import styles from './Chat.module.css';

import Message from './Message';

function Chat () {
    const { messages, status, error } = useSelector((state) => state.chat);

    return (
        <div className={styles.ChatContainer}>
            {messages.map((message, index) =>                 
                <Message key={index} role={message.role}>{message.content}</Message>
            )
            }
        </div>
    )
}

export default Chat;