'use client';

import { React } from 'react';
import { useSelector } from 'react-redux';

import styles from './Chat.module.css';

function Chat () {
    const { messages, status, error } = useSelector((state) => state.chat);

    console.log(messages);

    return (
        <div className={styles.ChatContainer}>
            {messages}
        </div>
    )
}

export default Chat;