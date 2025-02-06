import { configureStore, combineReducers } from '@reduxjs/toolkit';
import modelSlice from '@/app/models/modelSlice';
import settingSlice from '@/app/settings/settingSlice';

// PERSIST STATE IN LOCASTORAGE
function saveState(state: RootState) {
	try {
		localStorage.setItem('reduxStore', JSON.stringify(state));
	} catch (err) {
		console.log('Could not save state to local storage', err);
	}
}

function loadState() {
	try {
		const state = localStorage.getItem('reduxStore');
		if (state === null) {
			return undefined;
		}
		return JSON.parse(state);
	} catch (err) {
		console.log('Could not load state from local storage', err);
	}
}

// deletes the key from localstorage
export function deleteLocalState() {
	try {
		localStorage.removeItem('reduxStore');
	} catch (err) {
		console.error('Error deleting local state', err);
	}
}

// MIDDLEWARE TO PERSIST STATE
const saveStateMiddleware = store => next => action => {
	const result = next(action);
	saveState(store.getState());
	return result;
};

//STORE CREATION
const stateFromLocal = loadState();

const rootReducer = combineReducers({
	model: modelSlice,
	settings: settingSlice,
});

const store = configureStore({
	reducer: rootReducer,
	preloadedState: stateFromLocal,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(saveStateMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
