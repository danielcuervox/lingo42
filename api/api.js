import axios from "axios";

const BASE_URL_SPRING = "http://localhost:8082";
const BASE_URL_FASTAPI = "http://localhost:8083";

export const api = axios.create({
  baseURL: BASE_URL_SPRING,
  headers: {
    "Content-Type": "application/json",
  },
});

// Cliente independiente para el servidor de contenidos (FastAPI)
export const contentApi = axios.create({
  baseURL: BASE_URL_FASTAPI,
  headers: {
    "Content-Type": "application/json",
  },
});
