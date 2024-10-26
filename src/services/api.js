import axios from "axios";
import { BASE_URL, AUTH_TOKEN } from "./constants";

const options = {
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
};

// Fetch the collection of all campers
const fetchCampers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}campers`, options);
    console.log(response)
    return response.data; // Returns the array of campers
  } catch (error) {
    console.error('API Error:', error);
    throw error; // Propagate the error for handling
  }
};

// Fetch details of a specific camper by ID
const fetchCamperDetails = async (camperId) => {
  try {
    const response = await axios.get(`${BASE_URL}campers/${camperId}`, options);
    console.log(response);
    return response.data; // Returns the camper details
  } catch (error) {
    console.error('API Error:', error);
    throw error; // Propagate the error for handling
  }
};






export default {
  fetchCampers,
  fetchCamperDetails,
};


