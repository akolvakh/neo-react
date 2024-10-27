import { combineReducers } from "@reduxjs/toolkit";
import vehiclesReducer from "./vehiclesSlice";

const rootReducer = combineReducers({
  vehicles: vehiclesReducer,
});

export default rootReducer;
