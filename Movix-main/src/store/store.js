import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import userReducer from './userSlice';
import homeReducer from './homeSlice';

// Define the parts of the state to persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // Only persist the 'user' slice
};

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  home: homeReducer,
});

// Create the persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
export const store = configureStore({
  reducer: persistedReducer,
});

// Create the persisted store
export const persistor = persistStore(store);
