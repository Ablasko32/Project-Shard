import { createSlice } from '@reduxjs/toolkit';
import type { Message } from 'ai';

interface ChatSlice {
	currentChat: Message[];
}

const initialState: ChatSlice = {
	currentChat: [],
};

const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		addToCurrentChat: (state, action) => {
			console.log(action.payload);
		},
	},
});

export const { addToCurrentChat } = chatSlice.actions;

export default chatSlice.reducer;
