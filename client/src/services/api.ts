import axios from 'axios';

const api = axios.create({
  baseURL: 'http://locahost:8080'
});

export { api };
