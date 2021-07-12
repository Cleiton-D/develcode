import { forwardRef, ButtonHTMLAttributes } from 'react';

import * as S from './styles';

type CommonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = CommonProps & {
  styleType?: 'normal' | 'outlined';
};

const Button: React.ForwardRefRenderFunction<HTMLButtonElement, ButtonProps> = (
  { children, styleType = 'normal', ...props },
  ref
) => (
  <S.Wrapper ref={ref} styleType={styleType} {...props}>
    {!!children && <span>{children}</span>}
  </S.Wrapper>
);

export default forwardRef(Button);
