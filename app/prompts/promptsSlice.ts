import { createSlice } from '@reduxjs/toolkit';

interface PromptsState {
	id: string;
	title: string;
	content: string;
	date: string;
}

const initialState: PromptsState[] = [
	{
		id: 'vvefwgewgwegw',
		title: 'My test prompt1',
		content: 'This is my test prompt lorem lorem lorem lorem20',
		date: '222222',
	},
	{
		id: 'vvef2wgewgwegw',
		title: 'My test prompt2',
		content:
			'This is my test prompt lorem lorem lorem lorem20 This is my test prompt lorem lorem lorem lorem20 This is my test prompt lorem lorem lorem lorem20 This is my test prompt lorem lorem lorem lorem20 This is my test prompt lorem lorem lorem lorem20 This is my test prompt lorem lorem lorem lorem20',
		date: '222222',
	},
	{
		id: 'vvefwge21wgwegw',
		title: 'Oy test prompt2',
		content: 'This is my test prompt lorem lorem lorem lorem20',
		date: '222222',
	},
	{
		id: 'vvefwgveewgwegw',
		title: 'Zy test prompt2',
		content: 'This is my test prompt lorem lorem lorem lorem20',
		date: '222222',
	},
];

const promptsSlice = createSlice({
	name: 'prompts',
	initialState,
	reducers: {
		addNewPrompt: (state, action) => {
			const newPrompt = {
				id: crypto.randomUUID(),
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
