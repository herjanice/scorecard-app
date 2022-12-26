import axios from "axios";

const API_ROOT = "/api"
const api = axios.create({ baseURL: API_ROOT });

export default api