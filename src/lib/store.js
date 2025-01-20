import { configureStore } from "@reduxjs/toolkit";
import chatReducer from './features/chat/chatSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            chat: chatReducer
        }
    });
}