import axios from 'axios';

const Axios = axios.create({
  baseURL: 'https://localhost/', // TODO: Replace with your API base URL
});

export default Axios;
