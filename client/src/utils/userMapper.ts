import { FormattedUser, User } from 'models/User';

import { formatDate } from './formatDate';

export const userMapper = (user: User): FormattedUser => ({
  ...user,
  formattedBirthDate: formatDate(user.birthDate)
});
