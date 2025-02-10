import { createSlice } from '@reduxjs/toolkit';

interface PromptsState {
	id: string;
	title: string;
	content: string;
	date: string;
}

const initialState: PromptsState[] = [];

const promptsSlice = createSlice({
	name: 'prompts',
	initialState,
	reducers: {
		addNewPrompt: (state, action) => {
			const newPrompt = {
				id: `${new Date().toLocaleString()}-${Math.random()}`,
				title: action.payload.title,
				content: action.payload.content,
				date: new Date().toLocaleString(),
			};
			state.push(newPrompt);
		},
		deletePrompt: (state, action) => {
			console.log('im here', action);
			const index: number = state.findIndex(
				prompt => prompt.id === action.payload.id
			);
			if (index !== -1) {
				state.splice(index, 1);
			}
		},
	},
});

export const { addNewPrompt, deletePrompt } = promptsSlice.actions;

export default promptsSlice.reducer;
