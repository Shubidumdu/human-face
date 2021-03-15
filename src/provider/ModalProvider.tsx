import React from 'react';
import styled from 'styled-components';
import { ModalProvider as Provider } from 'styled-react-modal';

const ModalBackground = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
`;

const ModalProvider: React.FC = ({ children }) => {
  return <Provider backgroundComponent={ModalBackground}>{children}</Provider>;
};

export default ModalProvider;
