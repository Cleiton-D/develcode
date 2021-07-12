import axios from 'axios';
import {
  QueryClient,
  useMutation as useReactQueryMutation,
  MutationFunction,
  useQueryClient
} from 'react-query';
import { toast, ToastContent } from 'react-toastify';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8080'
});

type UseMutationOptions = {
  linkedQueries?: string[];
  renderError?: (data: any) => ToastContent;
  renderSuccess?: (data: any) => ToastContent;
};

export function useMutation(
  key: string,
  mutationFn: MutationFunction<any, any>,
  options: UseMutationOptions = {}
) {
  const queryClient = useQueryClient();

  return useReactQueryMutation(key, mutationFn, {
    onError: (err, data) => {
      if (options.renderError) {
        toast({
          type: toast.TYPE.ERROR,
          render: options.renderError(data),
          autoClose: 3000
        });
      }
    },
    onSuccess: (_, data) => {
      if (options.renderSuccess) {
        toast({
          type: toast.TYPE.SUCCESS,
          render: options.renderSuccess(data),
          autoClose: 3000
        });
      }
    },
    onSettled: () => {
      if (options.linkedQueries) {
        options.linkedQueries.map((query) =>
          queryClient.invalidateQueries(query)
        );
      }
    }
  });
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000
    }
  }
});

export { api, queryClient };
