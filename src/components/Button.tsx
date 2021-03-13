import React from 'react';
import { css } from 'styled-components';
import { darken, lighten } from 'polished';
import styled from 'styled-components';

interface ButtonStyleProps {
  size: 'tiny' | 'small' | 'big';
  color: string;
}

const commonStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  border: 2px solid ${({ theme }) => theme.color.black};
`;

const tinySizeStyle = css`
  width: 6rem;
  height: 3rem;

  @media (max-width: 850px) {
    width: 2rem;
    height: 2rem;
  }
`;

const smallSizeStyle = css`
  width: 5rem;
  height: 5rem;
`;

const bigSizeStyle = css`
  width: 11rem;
  height: 5rem;

  @media (max-width: 426px) {
    width: 8rem;
    height: 4rem;
    margin: 1rem;
  }
`;

const variableStyle = css<ButtonStyleProps>`
  ${({ color, theme }) => {
    const selected = theme.color?.[color] || color;
    return css`
      background: ${selected};
      &:hover {
        background: ${lighten(0.1, selected)};
      }
      &:active {
        background: ${darken(0.1, selected)};
      }
    `;
  }};
  ${({ size }) => {
    switch (size) {
      case 'tiny':
        return tinySizeStyle;
      case 'small':
        return smallSizeStyle;
      case 'big':
        return bigSizeStyle;
    }
  }}
`;

const StyledButton = styled.button<ButtonStyleProps>`
  ${commonStyle}
  ${variableStyle};
`;

const StyledLabel = styled.label<ButtonStyleProps>`
  ${commonStyle}
  ${variableStyle};
`;

interface ButtonProps extends ButtonStyleProps {
  type: 'label' | 'button';
  htmlFor?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  type,
  size,
  color,
  htmlFor,
  onClick,
}) => {
  if (type === 'label')
    return (
      <StyledLabel htmlFor={htmlFor} size={size} color={color}>
        {children}
      </StyledLabel>
    );
  return (
    <StyledButton onClick={onClick} size={size} color={color}>
      {children}
    </StyledButton>
  );
};

export default Button;
