import axios from "axios";

const baseURL = "https://dbms-lab-el.onrender.com/api";
console.log("API Base URL:", baseURL);

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
