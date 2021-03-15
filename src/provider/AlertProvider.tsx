import React, { ComponentType } from 'react';
import {
  transitions,
  positions,
  Provider,
  AlertComponentPropsWithStyle,
} from 'react-alert';
import styled from 'styled-components';

const StyledAlert = styled.div`
  background: ${props => props.theme.color.red};
  color: ${props => props.theme.color.ivory};
  width: 25rem;
  height: 6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  border: 2px solid ${({ theme }) => theme.color.black};
  border-radius: 1rem;

  @media (max-width: 850px) {
    width: 18rem;
    height: 6rem;
    font-size: 1.5rem;
  }
`;

const options = {
  position: positions.MIDDLE,
  timeout: 3000,
  offset: '30px',
  transition: transitions.SCALE,
};

const AlertTemplate: ComponentType<AlertComponentPropsWithStyle> = ({
  message,
}) => {
  return <StyledAlert>{message}</StyledAlert>;
};

const AlertProvider: React.FC = ({ children }) => {
  return (
    <Provider template={AlertTemplate} {...options}>
      {children}
    </Provider>
  );
};

export default AlertProvider;
