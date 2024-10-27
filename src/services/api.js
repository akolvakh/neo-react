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
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Fetch details of a specific camper by ID
const fetchCamperDetails = async (camperId) => {
  try {
    const response = await axios.get(`${BASE_URL}campers/${camperId}`, options);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const fetchVehicles = async (filters) => {
  const response = await fetch("/campers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(filters),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch vehicles");
  }
  return await response.json();
};

export default {
  fetchCampers,
  fetchCamperDetails,
  fetchVehicles,
};
