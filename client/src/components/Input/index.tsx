import { InputHTMLAttributes } from 'react';

import * as S from './styles';

type CommonProps = InputHTMLAttributes<HTMLInputElement>;
type InputProps = CommonProps & {
  label: string;
};

const Input = ({ label, ...rest }: InputProps) => {
  return (
    <S.Wrapper>
      <span>{label}</span>
      <S.InputContainer>
        <S.Input {...rest} />
      </S.InputContainer>
    </S.Wrapper>
  );
};

export default Input;
