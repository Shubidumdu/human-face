import React from 'react';
import Provider from './provider';
import Header from './components/Header';
import Content from './components/Content';
import Spinner from './components/Spinner';

const App: React.FC = () => {
  return (
    <Provider>
      <Header />
      <Spinner />
      <Content />
    </Provider>
  );
};

export default App;
