import React from 'react';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';
import Provider from './provider';
import Header from './components/Header';
import { AppState } from './modules/types';
import Content from './components/Content';

const App: React.FC = () => {
  const isLoading = useSelector((state: AppState) => state.loading);
  return (
    <Provider>
      <Header />
      <Spinner isLoading={isLoading} />
      <Content />
    </Provider>
  );
};

export default App;
