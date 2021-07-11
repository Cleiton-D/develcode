import { useQuery } from 'react-query';

import { User } from 'models/User';
import { userMapper } from 'utils/userMapper';

import { api } from 'services/api';

export const listUsers = async () => {
  return api
    .get<User[]>('/users')
    .then((response) => response.data.map(userMapper));
};

export const useListUsers = () => {
  const key = `use-list-users`;
  const result = useQuery(key, () => listUsers());

  return { ...result, key };
};
