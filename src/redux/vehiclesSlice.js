// vehiclesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchVehicles = createAsyncThunk('vehicles/fetchVehicles', async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate a 1-second delay
    const response = await api.fetchCampers();
    return response.items;
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
        pendingFilters: {
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
        loadingMore: false,
        error: null,
        visibleCount: 5,
    },
    reducers: {
        setPendingFilter: (state, action) => {
            const { filter, value } = action.payload;
            state.pendingFilters.selectedFilters[filter] = value;
        },
        setPendingLocation: (state, action) => {
            state.pendingFilters.location = action.payload;
        },
        applyPendingFilters: (state) => {
            state.filters = { ...state.pendingFilters }; // Apply pending filters to main filters
            const { location, selectedFilters } = state.filters;
            const vehiclesArray = Array.isArray(state.vehicles) ? state.vehicles : [];
            state.filteredVehicles = vehiclesArray.filter((vehicle) => {
                if (location && !vehicle.location.toLowerCase().includes(location.toLowerCase())) {
                    return false;
                }
                return Object.entries(selectedFilters).every(([key, isSelected]) => {
                    return !isSelected || vehicle[key] === true;
                });
            });
            state.visibleCount = 5; // Reset to first 5 results
        },
        clearFilters: (state) => {
            state.filters.location = '';
            state.filters.selectedFilters = {
                AC: false,
                automatic: false,
                kitchen: false,
                TV: false,
                bathroom: false,
                van: false,
                fullyIntegrated: false,
                alcove: false,
            };
            state.pendingFilters = { ...state.filters };
            state.visibleCount = 5;
            state.filteredVehicles = state.vehicles;
        },
        incrementVisibleCount: (state) => {
            state.visibleCount = Math.min(state.visibleCount + 5, state.filteredVehicles.length);
        },
        resetVisibleCount: (state) => {
            state.visibleCount = 5;
        },
        setLoadingMore: (state, action) => {
            state.loadingMore = action.payload;
        },
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
                state.pendingFilters = { ...state.filters }; // Reset pending filters to current filters
            })
            .addCase(fetchVehicles.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setPendingFilter, setPendingLocation, applyPendingFilters, incrementVisibleCount, toggleFavorite, resetVisibleCount, setLoadingMore, clearFilters } = vehiclesSlice.actions;

export default vehiclesSlice.reducer;
