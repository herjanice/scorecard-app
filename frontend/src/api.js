import axios from "axios";

const API_ROOT = "https://heroku-scorecard-app.herokuapp.com/api"
const api = axios.create({ baseURL: API_ROOT });

export default api