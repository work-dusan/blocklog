import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const getChain = () => api.get("/chain");
export const addLog = (data) => api.post("/logs", data);
export const validate = () => api.get("/validate");
export const tamper = (data) => api.post("/tamper", data);
export const resetChain = () => api.delete("/chain");
