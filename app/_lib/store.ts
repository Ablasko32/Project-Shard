import { configureStore, combineReducers } from '@reduxjs/toolkit';
import modelSlice from '@/app/models/modelSlice';
import settingSlice from '@/app/settings/settingSlice';
import promptsSlice from '@/app/prompts/promptsSlice';
import chatSlice from '@/app/chat/chatSlice';

// PERSIST STATE IN LOCASTORAGE
function saveState(state: RootState) {
	if (typeof window === 'undefined') return;
	try {
		localStorage.setItem('reduxStore', JSON.stringify(state));
	} catch (err) {
		console.log('Could not save state to local storage', err);
	}
}

function loadState() {
	if (typeof window === 'undefined') {
		return undefined;
	}
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

// saves the store data to localhost on interaction
const saveStateMiddleware = (store: any) => (next: any) => (action: any) => {
	if (typeof window === 'undefined') return;
	const result = next(action);
	saveState(store.getState());
	return result;
};

//STORE CREATION
const stateFromLocal = loadState();

const rootReducer = combineReducers({
	model: modelSlice,
	settings: settingSlice,
	prompts: promptsSlice,
	chat: chatSlice,
});

const store = configureStore({
	reducer: rootReducer,
	preloadedState: stateFromLocal,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(saveStateMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
