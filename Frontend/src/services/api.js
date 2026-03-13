import axios from "axios";

const API_BASE = "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

/** POST /initialize – reset the event to 100 available seats */
export const initializeEvent = () => api.post("/initialize");

/** GET /seats – fetch current seat statuses */
export const getSeats = () => api.get("/seats");

/**
 * POST /book – book selected seats
 * @param {number[]} seatIds  e.g. [45, 46, 47]
 * @param {string}   userName e.g. "Alice"
 */
export const bookSeats = (seatIds, userName) =>
  api.post("/book", { seatIds, userName });

export default api;
