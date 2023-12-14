import axios from 'axios';

const instance = axios.create({
  baseURL: "http://localhost:3333/api/v1",
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
export default instance;