import styled, { css } from 'styled-components';

export const Wrapper = styled.label`
  ${({ theme }) => css`
    display: block;
    color: ${theme.colors.silver};
    font-size: ${theme.font.sizes.small};
  `}
`;

export const InputContainer = styled.div`
  ${({ theme }) => css`
    display: block;
    height: 4rem;
    box-shadow: inset 0rem 0rem 0rem 0.1rem ${theme.colors.lightSilver};
    padding: ${theme.spacings.xxsmall};
  `}
`;

export const Input = styled.input`
  border: none;
  outline: 0;
  height: 100%;
  width: 100%;
`;
