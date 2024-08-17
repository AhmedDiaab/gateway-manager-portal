import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:3030/api/v1", // TODO: Replace with your API base URL
});

console.log(process.env.REACT_APP_BASE_URL)
export default AxiosInstance;
