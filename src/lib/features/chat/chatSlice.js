import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

//Send message to backend
export const sendMessage = createAsyncThunk('chat/sendMessage', async (params) => {
    const response = await axios.post('http://localhost:3001/api/message/send', {input: params.message, previousMessages: params.previousMessages}); //https://assistant-backend-taupe.vercel.app/api/message/send
    return { userMessage: params.message, assistantResponse: response.data };
})

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
                state.messages.push({ role: 'user', content: action.payload.userMessage });
                state.messages.push({ role: 'assistant', content: action.payload.assistantResponse });
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
})

export default chatSlice.reducer;