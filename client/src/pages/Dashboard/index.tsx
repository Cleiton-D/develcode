import { useRef } from 'react';
import { Edit3, X } from '@styled-icons/feather';

import UserModal, { UserModalRef } from 'components/UserModal';

import { FormattedUser } from 'models/User';

import { useListUsers } from 'requests/queries/users';
import { useDeleteUser } from 'requests/mutations/users';

import * as S from './styles';

const Dashboard = () => {
  const modalRef = useRef<UserModalRef>(null);

  const { data: users, key } = useListUsers();
  const deleteUser = useDeleteUser({ queries: [key] });

  const handleDelete = (user: FormattedUser) => {
    const confirm = window.confirm(`Deseja apagar o usuário ${user.name}?`);
    if (confirm) {
      deleteUser.mutate(user.id);
    }
  };

  return (
    <>
      <S.Wrapper>
        <S.PageTitle>Usuários</S.PageTitle>
        <button type="button" onClick={() => modalRef.current?.openModal()}>
          adicionar
        </button>
        <S.Content>
          {users && users.length > 0 ? (
            <table>
              <S.TableHeader>
                <tr>
                  <th>Imagem</th>
                  <th>Nome</th>
                  <th>Código</th>
                  <th>Data de Nascimento</th>
                  <th>Ações</th>
                </tr>
              </S.TableHeader>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <S.TableCell noPadding>
                      <S.UserImage imageSrc={user.imagePath} />
                    </S.TableCell>
                    <S.TableCell>{user.name}</S.TableCell>
                    <S.TableCell>{user.code}</S.TableCell>
                    <S.TableCell>{user.formattedBirthDate}</S.TableCell>
                    <S.TableCell>
                      <S.ActionButton
                        color="primary"
                        onClick={() => modalRef.current?.openModal(user)}
                      >
                        <Edit3 size={20} />
                      </S.ActionButton>
                      <S.ActionButton
                        color="red"
                        onClick={() => handleDelete(user)}
                      >
                        <X size={20} />
                      </S.ActionButton>
                    </S.TableCell>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <S.Message>Nenhum usuário encontrado</S.Message>
          )}
        </S.Content>
      </S.Wrapper>
      <UserModal ref={modalRef} queries={[key]} />
    </>
  );
};

export default Dashboard;
