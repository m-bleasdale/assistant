import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

//Send message to backend
export const sendMessage = createAsyncThunk('chat/sendMessage', async (params) => {
    try {
        const response = await axios.post("/api/ai", 
            {
                message: params.message,
                previousMessages: params.previousMessages, 
            },
            {
                headers: {
                    Authorization: `Bearer ${params.user.sub}`
                }
            }
        );

        console.log(response.data.actions);
        
        return { 
            userMessage: params.message, 
            assistantResponse: response.data.text
        };

    } catch (error) {
        console.error(error);
        throw error;
        
    }
    
});

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        messages: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendMessage.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.messages.push({ role: 'user', parts: [{ text: action.payload.userMessage }] });
                state.messages.push({ role: 'model', parts: [{ text: action.payload.assistantResponse }] });
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
})

export default chatSlice.reducer;