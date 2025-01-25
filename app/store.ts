import { configureStore } from '@reduxjs/toolkit';
import modelSlice from '@/app/models/modelSlice';

const store = configureStore({
	reducer: {
		model: modelSlice,
	},
});

export default store;
