import styled, { css, DefaultTheme } from 'styled-components';
import { darken } from 'polished';

import { generateMedia } from 'styled-media-query';

const customMedia = generateMedia({
  small: '576px',
  medium: '768px',
  large: '992px',
  huge: '1200px'
});

export const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;

  ${customMedia.greaterThan('small')`
    max-width: 54rem;
  `}
  ${customMedia.greaterThan('medium')`
    max-width: 72rem;
  `}
  ${customMedia.greaterThan('large')`
    max-width: 110rem;
  `}
  ${customMedia.greaterThan('huge')`
    max-width: 110rem;
  `}
`;

export const PageTitle = styled.h1`
  margin-top: 5rem;
`;

export const Content = styled.section`
  background: white;
  max-width: 100%;
  width: 100%;
  border-radius: 1rem;

  > table {
    border-collapse: collapse;
    width: inherit;
    border-spacing: 0;
  }
`;

export const TableHeader = styled.thead`
  ${({ theme }) => css`
    border-bottom: 0.2rem solid ${theme.colors.lightSilver};
    box-shadow: 0 0.23rem 0.1rem -0.1rem ${darken(0.2, theme.colors.lightSilver)};

    text-align: left;
    color: ${theme.colors.gray};
    font-weight: ${theme.font.normal};
    font-size: ${theme.font.sizes.medium};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xsmall};
    white-space: nowrap;
    background: ${theme.colors.white};

    th {
      padding: ${theme.spacings.xxsmall};
    }
  `}
`;

type TableCellProps = {
  noPadding?: boolean;
};
export const TableCell = styled.td<TableCellProps>`
  ${({ theme, noPadding }) => css`
    font-size: ${theme.font.sizes.medium};
    color: ${theme.colors.silver};
    border-bottom: 0.1rem solid ${theme.colors.lightSilver};
    background: ${theme.colors.white};
    text-align: left
    transition: box-shadow 0.3s ease-out;

    ${
      noPadding
        ? css`
            padding: 0 ${theme.spacings.xsmall};
          `
        : css`
            padding: ${theme.spacings.xsmall};
          `
    }
  `}
`;

type UserImageProps = {
  imageSrc: string;
};
export const UserImage = styled.div.attrs({
  role: 'image'
})<UserImageProps>`
  ${({ imageSrc }) => css`
    background: url(${imageSrc}) no-repeat center;
    background-size: cover;
    height: 4rem;
    width: 4rem;
    border-radius: 50%;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.25);
  `}
`;

export const Message = styled.p`
  ${({ theme }) => css`
    display: block;
    margin: 2rem auto;
    width: fit-content;
    text-align: center;
    padding: 0 1.5rem;

    font-size: ${theme.font.sizes.large};
    color: ${theme.colors.lightSilver};
    font-weight: ${theme.font.medium};
  `}
`;

type ActionButtonProps = {
  color: keyof DefaultTheme['colors'];
};

export const ActionButton = styled.button<ActionButtonProps>`
  ${({ theme, color }) => css`
    background: ${theme.colors.white};
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 3rem;
    border: 0;
    outline: 0;
    stroke-width: 2;
    color: ${theme.colors[color]};
    padding: 0.4rem;
    transition: background 0.3s ease;

    &:hover {
      background: ${darken(0.05, theme.colors.white)};
    }
  `}
`;
