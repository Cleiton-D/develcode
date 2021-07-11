import { useListUsers } from 'requests/queries/users';

import * as S from './styles';

const Dashboard = () => {
  const { data: users } = useListUsers();

  return (
    <S.Wrapper>
      <S.PageTitle>Usuários</S.PageTitle>
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
                  <S.TableCell></S.TableCell>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <S.Message>Nenhum usuário encontrado</S.Message>
        )}
      </S.Content>
    </S.Wrapper>
  );
};

export default Dashboard;
