// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { api } from '../api/apiSlice'; // Assuming this is your API service slice

const store = configureStore({
    reducer: {
        // Include your API reducer from apiSlice
        [api.reducerPath]: api.reducer,
    },
    // Add middleware to the store
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

// Setup RTK Query listeners
setupListeners(store.dispatch);

export default store; // Export the configured store as default
