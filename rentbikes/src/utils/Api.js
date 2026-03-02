import axios from "axios";

const API = axios.create({
  baseURL: "https://bike-rental-booking-system-3.onrender.com/api",
});

export default API;
