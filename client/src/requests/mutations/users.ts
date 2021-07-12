import { api, useMutation } from 'services/api';

type MutateUserProps = {
  id?: number;
  data: FormData;
};

export const mutateUser = ({ id, data }: MutateUserProps) => {
  if (id) {
    return api.put(`/users/${id}`, data).then((response) => response.data);
  }

  return api.post(`/users`, data).then((response) => response.data);
};

type UseMutateUserOptions = {
  queries?: string[];
};
export const useMutateUser = (options: UseMutateUserOptions) => {
  return useMutation('mutate-user', mutateUser, {
    linkedQueries: options.queries,
    renderError: () => 'Não foi possível salvar as alterações',
    renderSuccess: () => 'Alterações realizadas com sucesso'
  });
};
