import * as S from './styles';

const Dashboard = () => {
  return (
    <S.Wrapper>
      <S.PageTitle>Usuários</S.PageTitle>
      <S.Content>
        <table>
          <S.TableHeader>
            <tr>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Código</th>
              <th>Data de Nascimento</th>
            </tr>
          </S.TableHeader>
          <tbody>
            <tr>
              <S.TableCell noPadding>
                <S.UserImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREfizvjqR1olIw9jrmi_dBRNhEKoR2E-6o2A&usqp=CAU" />
              </S.TableCell>
              <S.TableCell>Cleitin</S.TableCell>
              <S.TableCell>Teste</S.TableCell>
              <S.TableCell>04/11/1999</S.TableCell>
            </tr>
          </tbody>
        </table>
      </S.Content>
    </S.Wrapper>
  );
};

export default Dashboard;
