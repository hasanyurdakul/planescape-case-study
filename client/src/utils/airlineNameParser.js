import axios from "axios";
import { getData } from "./fetchWrapper";

// ######################################################################
// API'dan gelen prefixICAO kodunu kullanarak havayolu adını getirir.
// API'da bulunan /airlines/:prefixICAO endpoint'ini kullanarak havayolu adını alırız.
// ######################################################################

export const airlineNameParser = async (prefixICAO) => {
  let airline;
  try {
    const data = await getData(`/airlines/${prefixICAO}`);
    airline = data.publicName;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      airline = "Unknown";
    } else {
      console.error("Bir hata oluştu:", error);
      airline = "Unknown";
    }
  }
  return airline;
};
