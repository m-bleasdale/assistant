'use client';

import { React } from 'react';
import { useSelector } from 'react-redux';

import styles from './Chat.module.css';

function Chat () {
    const { messages, status, error } = useSelector((state) => state.chat);

    return (
        <div className={styles.ChatContainer}>
            {messages.map((message) =>                 
                <p>{message.content}</p>
            )
            }
        </div>
    )
}

export default Chat;