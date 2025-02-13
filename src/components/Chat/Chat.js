'use client';

import { React, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useUser } from '@auth0/nextjs-auth0/client';

import 'ldrs/dotPulse';

import styles from './Chat.module.css';

import Message from './Message';

function Chat () {
    const { messages, status, error } = useSelector((state) => state.chat);
    const { user, usererror, isLoading } = useUser();
    const chatRef = useRef(null);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [status]);
    

    function RemoveActionTags(text) {
        const ActionsRegex = /<Actions>(.*?)<\/Actions>/s;
        return text.replace(ActionsRegex, '').trim();
    }

    function NoMessages() {
        
        if (messages.length === 0 && status === "idle"){

            let name = "";
            if(!isLoading) name = user.name;

            return (
                <div className={styles.NoMessagesContainer}>
                    <h1>Welcome {name}</h1>
    
                    <p>Send a message to get started</p>
    
                </div>
            )
        }
    }

    function Loading(){
        if(status === "loading")
        {
            return (
                <div className={styles.LoadingContainer}>
                    <l-dot-pulse
                    size="55"
                    speed="" 
                    color="#597ef7" 
                    ></l-dot-pulse>
                </div>
            )
        }
    }

    function Error(){
        if(status === "failed")
        {
            return (
                <div className={styles.ErrorContainer}>
                    <p>Looks like something went wrong. Please try again.</p>
                </div>
            )
        }
    }

    return (
        <div ref={chatRef} className={styles.ChatContainer}>
            <NoMessages />

            {messages.map((message, index) =>                 
                <Message key={index} role={message.role}>{RemoveActionTags(message.parts[0].text)}</Message>
            )
            }

            <Loading />
            <Error />
            <div className={styles.ChatAnchor} />
            
        </div>
    )
}

export default Chat;