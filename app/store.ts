import { configureStore } from '@reduxjs/toolkit';
import modelSlice from '@/app/models/modelSlice';
import settingSlice from '@/app/settings/settingSlice';

const store = configureStore({
	reducer: {
		model: modelSlice,
		settings: settingSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
