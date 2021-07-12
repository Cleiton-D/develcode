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

type MutateUserOptions = {
  queries?: string[];
};
export const useMutateUser = (options: MutateUserOptions) => {
  return useMutation('mutate-user', mutateUser, {
    linkedQueries: options.queries,
    renderError: () => 'Não foi possível salvar as alterações',
    renderSuccess: () => 'Alterações realizadas com sucesso'
  });
};

export const deleteUser = (id: number) => {
  return api.delete(`/users/${id}`).then((response) => response.data);
};

export const useDeleteUser = (options: MutateUserOptions) => {
  return useMutation('delete-user', deleteUser, {
    linkedQueries: options.queries,
    renderError: () => 'Não foi possível apagar o usuário',
    renderSuccess: () => 'Usuário apagado com sucesso'
  });
};
