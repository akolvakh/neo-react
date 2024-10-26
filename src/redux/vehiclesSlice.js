// src/slices/vehiclesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchVehicles = createAsyncThunk(
    'vehicles/fetchVehicles',
    async (filters, { getState, dispatch }) => {
        const state = getState();
        // Reset the current vehicle list when a new fetch is initiated
        dispatch(resetVehicles());
        
        const response = await api.fetchCampers(filters); // Adjust based on your API structure
        return response.items; // assuming response contains an "items" array
    }
);

const vehiclesSlice = createSlice({
    name: 'vehicles',
    initialState: {
        vehicles: [],
        filters: {
            location: '',
            selectedFilters: {
                AC: false,
                automatic: false,
                kitchen: false,
                TV: false,
                bathroom: false,
                van: false,
                fullyIntegrated: false,
                alcove: false,
            },
        },
        favorites: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        setFilter(state, action) {
            const { filter, value } = action.payload;
            state.filters.selectedFilters[filter] = value;
        },
        setLocation(state, action) {
            state.filters.location = action.payload;
        },
        resetVehicles(state) {
            state.vehicles = []; // Clear the vehicle list on new search
        },
        toggleFavorite(state, action) {
            const vehicleId = action.payload;
            if (state.favorites.includes(vehicleId)) {
                state.favorites = state.favorites.filter(id => id !== vehicleId);
            } else {
                state.favorites.push(vehicleId);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVehicles.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchVehicles.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.vehicles = action.payload;
            })
            .addCase(fetchVehicles.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setFilter, setLocation, resetVehicles, toggleFavorite } = vehiclesSlice.actions;
export default vehiclesSlice.reducer;
