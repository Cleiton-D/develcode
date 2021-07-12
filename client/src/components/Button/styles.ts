import styled, { css, DefaultTheme } from 'styled-components';
import { darken } from 'polished';

import { ButtonProps } from './';

export type WrapperProps = Pick<ButtonProps, 'styleType'>;

const wrapperModifiers = {
  normal: () => css``,
  outlined: (theme: DefaultTheme) => css`
    background: ${theme.colors.white};
    box-sizing: border-box;
    border: 0.2rem solid ${theme.colors.primary};
    color: ${theme.colors.primary};
    font-weight: ${theme.font.bold};

    &:hover {
      background: ${theme.colors.white};
    }
  `
};

export const Wrapper = styled.button<WrapperProps>`
  ${({ theme, styleType }) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    border: 0;
    outline: none;
    border-radius: 0.6rem;
    padding: ${theme.spacings.xxsmall};
    text-decoration: none;
    cursor: pointer;
    font-family: ${theme.font.poppins};
    font-size: ${theme.font.sizes.small};
    font-weight: ${theme.font.bold};
    transition: background 0.3s ease;
    width: 100%;
    border-radius: 10rem;

    &:hover {
      background: ${darken(0.05, theme.colors.primary)};
    }

    ${!!styleType && wrapperModifiers[styleType](theme)}
  `}
`;
