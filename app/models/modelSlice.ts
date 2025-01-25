import { createSlice } from '@reduxjs/toolkit';

export interface ModelState {
	model: string;
}

const initialState: ModelState = {
	model: 'Select a model',
};

const modelSlice = createSlice({
	name: 'model',
	initialState,
	reducers: {
		switchModel: (state, action) => {
			state.model = action.payload;
		},
	},
});

export const { switchModel } = modelSlice.actions;
export default modelSlice.reducer;
