import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/api" });

export const getStockData = (ticker) => API.get(`/stocks/${ticker}`);
export const getSignals = (ticker) => API.get(`/signals/${ticker}`);
export const getBacktest = (ticker) => API.get(`/backtest/${ticker}`);
export const compareStocks = (t1, t2) => API.get(`/compare/${t1}/${t2}`);