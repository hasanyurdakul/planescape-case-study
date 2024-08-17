import axios from "axios";
import { getData } from "./fetchWrapper";

export const getLocationName = async (flight) => {
  let locationName;
  try {
    const data = await getData(`/destinations/${flight.route.destinations[0]}`);
    locationName = data.city;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      locationName = "Unknown";
    } else {
      console.error("Bir hata oluştu:", error);
      locationName = "Unknown";
    }
  }
  return locationName;
};
