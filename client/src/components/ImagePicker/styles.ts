import styled, { css } from 'styled-components';

type WrapperProps = {
  imageUrl: string;
};
export const Wrapper = styled.label<WrapperProps>`
  ${({ theme, imageUrl }) => css`
    display: block;
    position: relative;
    background: url(${imageUrl}) no-repeat center;
    background-size: cover;
    height: 13rem;
    width: 13rem;
    border-radius: 50%;
    border: 0.5rem solid #fff;
    box-shadow: 0rem 0rem 0.8rem rgba(0, 0, 0, 0.25);
    cursor: pointer;
    overflow: hidden;

    input {
      display: none;
    }

    &::after {
      content: 'Alterar imagem';
      font-size: ${theme.font.sizes.xsmall};
      padding-top: calc(${theme.spacings.xxsmall} / 2);
      color: ${theme.colors.white};
      position: absolute;
      height: 4rem;
      background: ${theme.colors.black};
      opacity: 0.7;
      text-align: center;
      width: 100%;
      bottom: 0;
      transform: translateY(100%);
      transition: transform 0.2s ease;
    }

    &:hover::after {
      transform: translateY(0);
    }
  `}
`;
