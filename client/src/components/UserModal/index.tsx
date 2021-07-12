import { useImperativeHandle, useState, forwardRef } from 'react';

import Input from 'components/Input';

import * as S from './styles';
import Button from 'components/Button';
import ImagePicker from 'components/ImagePicker';

export type UserModalRef = {
  openModal: () => void;
};

const UserModal: React.ForwardRefRenderFunction<UserModalRef> = (_, ref) => {
  const [show, setShow] = useState(false);

  const openModal = () => {
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

  useImperativeHandle(ref, () => ({ openModal }));

  if (!show) return null;
  return (
    <>
      <S.Wrapper>
        <S.Title>Adicionar usuário</S.Title>
        <S.Content>
          <S.Form>
            <S.InputsGrid>
              <ImagePicker name="image" />

              <div>
                <Input
                  name="name"
                  label="Nome"
                  placeholder="Informe o nome do usuário"
                />
                <Input
                  name="code"
                  label="Código"
                  placeholder="Informe o código do usuário"
                />
                <Input
                  name="birth_date"
                  label="Data de nascimento"
                  placeholder="Infome a data de nascimento do usuário"
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
