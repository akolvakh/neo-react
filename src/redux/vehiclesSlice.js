// vehiclesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchVehicles = createAsyncThunk('vehicles/fetchVehicles', async () => {
    const response = await api.fetchCampers();
    return response.items; // Assume response contains the campers array in `items`
});

const vehiclesSlice = createSlice({
    name: 'vehicles',
    initialState: {
        vehicles: [],
        filteredVehicles: [],
        favorites: [],
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
            }
        },
        loading: false,
        error: null,
        visibleCount: 5,
    },
    reducers: {
        setFilter: (state, action) => {
            const { filter, value } = action.payload;
            state.filters.selectedFilters[filter] = value;
        },
        setLocation: (state, action) => {
            state.filters.location = action.payload;
        },
        applyFilters: (state) => {
            const { location, selectedFilters } = state.filters;
            state.filteredVehicles = state.vehicles.filter((vehicle) => {
                if (location && !vehicle.location.toLowerCase().includes(location.toLowerCase())) {
                    return false;
                }
                return Object.entries(selectedFilters).every(([key, isSelected]) => {
                    return !isSelected || vehicle[key] === true;
                });
            });
        },
        incrementVisibleCount: (state) => {
            state.visibleCount += 5;
        },
        toggleFavorite: (state, action) => {
            const vehicleId = action.payload;
            if (state.favorites.includes(vehicleId)) {
                state.favorites = state.favorites.filter(id => id !== vehicleId);
            } else {
                state.favorites.push(vehicleId);
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVehicles.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVehicles.fulfilled, (state, action) => {
                state.loading = false;
                state.vehicles = action.payload;
                state.filteredVehicles = action.payload;
            })
            .addCase(fetchVehicles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setFilter, setLocation, applyFilters, incrementVisibleCount, toggleFavorite } = vehiclesSlice.actions;

export default vehiclesSlice.reducer;
