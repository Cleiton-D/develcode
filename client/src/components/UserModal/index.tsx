import { useImperativeHandle, useState, forwardRef } from 'react';

import Input from 'components/Input';
import Button from 'components/Button';
import ImagePicker from 'components/ImagePicker';

import { FormattedUser } from 'models/User';

import { useMutateUser } from 'requests/mutations/users';

import * as S from './styles';

export type UserModalRef = {
  openModal: (user?: FormattedUser) => void;
};

export type UserModalProps = {
  queries?: string[];
};

const UserModal: React.ForwardRefRenderFunction<UserModalRef, UserModalProps> =
  ({ queries }, ref) => {
    const [show, setShow] = useState(false);
    const [user, setUser] = useState<FormattedUser>();

    const mutateUser = useMutateUser({ queries });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const target = event.target as HTMLFormElement;
      const formData = new FormData(target);

      const birthDate = formData.get('birthDate') as string;
      const [day, month, year] = birthDate.split('/');
      const newBirthDate = new Date(+year, +month - 1, +day);

      formData.set('birthDate', newBirthDate.toISOString());

      mutateUser.mutate({ id: user?.id, data: formData });
      closeModal();
    };

    const openModal = (user?: FormattedUser) => {
      setUser(user);
      setShow(true);
    };

    const closeModal = () => {
      setUser(undefined);
      setShow(false);
    };

    useImperativeHandle(ref, () => ({ openModal }));

    if (!show) return null;
    return (
      <>
        <S.Wrapper>
          <S.Title>{user ? 'Alterar usuário' : 'Adicionar usuário'}</S.Title>
          <S.Content>
            <S.Form onSubmit={handleSubmit}>
              <S.InputsGrid>
                <ImagePicker name="image" imageUrl={user?.imagePath} />

                <div>
                  <Input
                    name="name"
                    label="Nome"
                    placeholder="Informe o nome do usuário"
                    defaultValue={user?.name}
                    required
                  />
                  <Input
                    name="code"
                    label="Código"
                    placeholder="Informe o código do usuário"
                    defaultValue={user?.code}
                    required
                  />
                  <Input
                    name="birthDate"
                    label="Data de nascimento"
                    placeholder="Infome a data de nascimento do usuário"
                    defaultValue={user?.formattedBirthDate}
                    mask="date"
                    required
                  />
                </div>
              </S.InputsGrid>
              <S.ButtonsContainer>
                <Button styleType="outlined" type="button" onClick={closeModal}>
                  Voltar
                </Button>
                <Button>Salvar</Button>
              </S.ButtonsContainer>
            </S.Form>
          </S.Content>
        </S.Wrapper>
        <S.Overlay />
      </>
    );
  };

export default forwardRef(UserModal);
