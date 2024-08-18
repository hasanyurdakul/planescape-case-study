import { getData } from "./fetchWrapper";

// ######################################################################
// Uçuş içindeki destinasyonun adını almak için kullanılan fonksiyon
// API'da bulunan /destinations/:id endpoint'ini kullanarak destinasyonun adını alırız.
// ######################################################################

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
