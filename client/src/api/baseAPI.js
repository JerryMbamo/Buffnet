import axios from "axios";

const API = axios.create({
  baseURL: `http://${window.location.hostname}:8080/`,
  responseType: "json",
});

export default API;
