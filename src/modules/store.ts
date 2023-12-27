"use client"
import { createStore } from "redux"
import { persistStore, persistReducer } from "redux-persist"
import { combineReducers } from "@reduxjs/toolkit"
import counterReducer from "./slice"
import storage from "./storage"

const rootReducer = combineReducers({
	counter: counterReducer,
})

const persistConfig = {
	key: "root",
	storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer)

// persistStore is for persisting the redux store
// even when page is refreshed
export const persistor = persistStore(store)
