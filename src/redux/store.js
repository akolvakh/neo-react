// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import vehiclesReducer from './vehiclesSlice';

const store = configureStore({
    reducer: {
        vehicles: vehiclesReducer,
    },
});

export default store;
