import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // TODO: Replace with your API base URL
});

console.log(process.env.REACT_APP_BASE_URL)
export default AxiosInstance;
