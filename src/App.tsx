import React from 'react';
import FormContainer from './containers/FormContainer';
import ResultContainer from './containers/ResultContainer';
import styled from './components/theme';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';
import Provider from './provider';
import Header from './components/Header';

const App: React.FC = () => {
  const App = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 4rem;
    padding-bottom: 2rem;

    @media (max-width: 426px) {
      margin: 0.5rem;
      padding: 0;
    }
  `;
  const clovaData = useSelector((state: RootState) => state.clova.data);
  const Error = useSelector((state: RootState) => state.clova.error);
  const isLoading = useSelector((state: RootState) => state.clova.loading);

  return (
    <Provider>
      <Header />
      <Spinner isLoading={isLoading} />
      <App className="App">
        {clovaData.imageInfo.faceCount === -1 && !Error ? (
          <FormContainer />
        ) : (
          <ResultContainer clovaData={clovaData} />
        )}
      </App>
    </Provider>
  );
};

export default App;
