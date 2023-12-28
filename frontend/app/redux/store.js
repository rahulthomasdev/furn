'use client'
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import AccountReducer from './feature/account/accountSlice';


const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, AccountReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: thunk
})

export const persistor = persistStore(store);