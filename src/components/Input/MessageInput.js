'use client';

import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Input.module.css';
import { sendMessage } from '@/lib/features/chat/chatSlice';

function MessageInput () {
    const dispatch = useDispatch();
    const { messages } = useSelector((state) => state.chat);
    
    const [UserInput, SetUserInput] = useState('');

    function handleSubmit () {
        dispatch(sendMessage({message: UserInput, previousMessages: messages}));
    }

    /* Components */
    function SubmitButton () {
        return (
            <div className={styles.MessageSubmit} onClick={handleSubmit}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                </svg>
            </div>
        )
    }

    return (
        <div className={styles.MessageInput}>
            <div className={styles.Container}>
                <label className={styles.MessageInputContainer}>
                    <textarea
                        className={styles.Input}
                        type='text'
                        name='message'
                        placeholder='Message your assistant'
                        value={UserInput}
                        onChange={(e) => SetUserInput(e.target.value)}
                    />
                </label>
                <div className={styles.Buttons}>
                    <SubmitButton />
                </div>
            </div>
        </div>
    )

}

export default MessageInput;

