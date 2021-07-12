import React, { InputHTMLAttributes, useState } from 'react';

import { masks } from 'utils/maks';

import * as S from './styles';

type CommonProps = InputHTMLAttributes<HTMLInputElement>;
type InputProps = CommonProps & {
  label: string;
  mask?: keyof typeof masks;
};

const Input = ({ label, mask, ...rest }: InputProps) => {
  const [value, setValue] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = event.target.value;
    const maskedValue = mask ? masks[mask](targetValue) : targetValue;
    setValue(maskedValue);
  };

  return (
    <S.Wrapper>
      <span>{label}</span>
      <S.InputContainer>
        <S.Input {...rest} value={value} onChange={handleChange} />
      </S.InputContainer>
    </S.Wrapper>
  );
};

export default Input;
