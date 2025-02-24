'use client';

import { React, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useSession } from 'next-auth/react';

import styles from './Input.module.css';
import { sendMessage } from '@/lib/features/chat/chatSlice';

function MessageInput () {
    const dispatch = useDispatch();
    const { messages, status } = useSelector((state) => state.chat);

    const { data: session } = useSession();
    
    const [UserInput, SetUserInput] = useState('');

    function handleSubmit () {
        
        console.log(session);

        if(status !== 'loading' && UserInput !== '')
        {
            dispatch(sendMessage({message: UserInput, previousMessages: messages, userToken: session.accessToken}));
            SetUserInput('');
        }
        
    }

    return (
        <div className={styles.MessageInput}>
            <form className={styles.Container}>
                <label className={styles.MessageInputContainer}>
                    <textarea
                        className={styles.Input}
                        type='text'
                        name='message'
                        placeholder='Message your assistant'
                        value={UserInput}
                        onChange={(e) => SetUserInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit();
                            }
                        }}                    
                    />
                </label>
                <div className={styles.Buttons}>
                    <div className={styles.MessageSubmit} id={styles[status]} onClick={handleSubmit}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                        </svg>
                    </div>
                </div>
            </form>
        </div>
    )

}

export default MessageInput;

