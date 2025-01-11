import { React, useState } from 'react';
import axios from 'axios';

import env from '@/env';

function MessageInput () {
    const [UserInput, SetUserInput] = useState('');

    function handleSubmit () {
        axios.post('https://api.sambanova.ai/v1/chat/completions', {
            headers: {
                "Authorization": `Bearer ${env.ARLI_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: {
                "stream": true,
                "model": "Meta-Llama-3.1-8B-Instruct",
                "messages": [
                    {"role": "system", "content": `${env.SYSTEM_PROMPT} \n <events>{[]}</events>`},
                    {"role": "user", "content": `${UserInput} \n <events>{[]}</events>`}
                ]
            }
        }).then((response) => {
            console.log(response);
        }).catch((e) => console.error(e));
    }
    
    function handleChange (e) {
        const value = e.target.value;
        SetUserInput(value);
    }
    
    return (
        <div className='MessageInput'>
            <label className='MessageInputContainer'>
                <input
                    className='Input'
                    type='text'
                    name='message'
                    placeholder='message'
                    value={UserInput}
                    onChange={handleChange}
                />
            </label>
            <button className="MessageSubmit" onClick={handleSubmit}>Send</button>
        </div>
    )

}

export default MessageInput;

