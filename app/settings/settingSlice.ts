import { createSlice } from '@reduxjs/toolkit';

export interface SettingsData {
	username: string | undefined;
	defaultSystemMessage: string | undefined;
}

const initialState: SettingsData = {
	username: undefined,
	defaultSystemMessage: undefined,
};

const settingSlice = createSlice({
	name: 'settings',
	initialState,
	reducers: {
		updateSettings: (state, action) => {
			if (action.payload.username !== undefined) {
				state.username = action.payload.username;
			}
			if (action.payload.defaultSystemMessage !== undefined) {
				state.defaultSystemMessage = action.payload.defaultSystemMessage;
			}
		},
	},
});

export const { updateSettings } = settingSlice.actions;

export default settingSlice.reducer;
