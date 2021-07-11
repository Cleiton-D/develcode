export type User = {
  id: number;
  name: string;
  code: string;
  birthDate: string;
  image: string;
  imagePath: string;
};

export type FormattedUser = User & {
  formattedBirthDate: string;
};
