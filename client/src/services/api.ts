import axios from 'axios';
import { QueryClient } from 'react-query';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8080'
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000
    }
  }
});

export { api, queryClient };
