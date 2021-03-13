import React from 'react';
import AlertProvider from './AlertProvider';
import ModalProvider from './ModalProvider';
import ReduxProvider from './ReduxProvider';
import StyleProvider from './StyleProvider';

const Provider: React.FC = ({ children }) => {
  return (
    <ReduxProvider>
      <StyleProvider>
        <AlertProvider>
          <ModalProvider>{children}</ModalProvider>
        </AlertProvider>
      </StyleProvider>
    </ReduxProvider>
  );
};

export default Provider;
