import { combineReducers } from '@reduxjs/toolkit';
import vehiclesReducer from './vehiclesSlice'; // Adjust this path if necessary

const rootReducer = combineReducers({
    vehicles: vehiclesReducer,
    // Add other reducers here
});

export default rootReducer;