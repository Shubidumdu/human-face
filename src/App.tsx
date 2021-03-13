import React from 'react';
import FormContainer from './containers/FormContainer';
import ResultContainer from './containers/ResultContainer';
import logo from './components/imgs/title-medium2.png';
import styled from './components/theme';
import { useSelector } from 'react-redux';
import { RootState } from './modules';
import Spinner from './components/Spinner';
import Provider from './provider';

const App: React.FC = () => {
  const Header = styled.header`
    background-color: ${props => props.theme.color.darkbrown};
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px #000000;
    position: fixed;

    @media (max-width: 426px) {
      display: none;
    }
  `;

  const HeaderLogo = styled.img`
    height: 80%;
    width: auto;
  `;

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
      <Header>
        <HeaderLogo src={logo} />
      </Header>
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
