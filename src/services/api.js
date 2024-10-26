import axios from "axios";
import { BASE_URL, AUTH_TOKEN } from "./constants";

const options = {
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
};

// Fetch the collection of all campers
export const fetchCampers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}campers`, options);
    return response.data; // Returns the array of campers
  } catch (error) {
    console.error("API Error:", error);
    throw error; // Propagate the error for handling
  }
};

// Fetch details of a specific camper by ID
const fetchCamperDetails = async (camperId) => {
  try {
    const response = await axios.get(`${BASE_URL}campers/${camperId}`, options);
    return response.data; // Returns the camper details
  } catch (error) {
    console.error('API Error:', error);
    throw error; // Propagate the error for handling
  }
};

export const fetchVehicles = async (filters) => {
  // Assume your API endpoint is something like `/api/vehicles`
  // You may need to adjust this based on how your API works
  const response = await fetch('/campers', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(filters),
  });
  if (!response.ok) {
      throw new Error('Failed to fetch vehicles');
  }
  return await response.json();
};


export default {
  fetchCampers,
  fetchCamperDetails,
  fetchVehicles,
};


