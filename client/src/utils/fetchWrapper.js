import axios from "axios";

var appId = import.meta.env.VITE_AIR_APP_ID;
var appKey = import.meta.env.VITE_AIR_APP_KEY;
var baseUrl = import.meta.env.VITE_AIR_BASE_URL;

// ######################################################################
// API'dan veri çekmek için kullanılan wrapper fonksiyon
// ######################################################################

const fetchWrapper = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: "application/json",
    app_id: appId,
    app_key: appKey,
    ResourceVersion: "v4",
  },
});

// API'dan veri çekme işlemi
export const getData = async (endpoint) => {
  try {
    const response = await fetchWrapper.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
