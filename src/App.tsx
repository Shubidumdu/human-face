import React from 'react';
import FormContainer from './containers/FormContainer';
import ResultContainer from './containers/ResultContainer';
import reset from "styled-reset";
import logo from './components/imgs/title-medium2.png';
import { ThemeProvider, createGlobalStyle } from "styled-components";
import styled, { theme } from './components/theme';
import { useSelector } from 'react-redux';
import { RootState } from './modules';

const App: React.FC = () => {

  const GlobalStyle = createGlobalStyle`
    ${reset};
    @font-face{
      font-family: "YangJin";
      src: url(${require('./components/fonts/yangjin.ttf')} format("truetype");
    }

    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        box-sizing:border-box;
    }
    body{
        font-family: YangJin, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 16px;

        background-color: #F2E3B3;
    }
  `;

  const Header = styled.header`
    background-color: ${props => props.theme.color.darkbrown};
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px #000000;
    position: fixed;
  `

  const HeaderLogo = styled.img`
    height: 80%;
    width: auto;
  `

  const App = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 4rem;
    padding-bottom: 2rem;
  `
  const clovaData = useSelector((state: RootState) => state.clova.data);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header>
        <HeaderLogo src={logo} />
      </Header>
      <App className="App">
        {clovaData.imageInfo.faceCount === -1 ? 
        <FormContainer /> :
        <ResultContainer clovaData={clovaData}/> }
      </App>
    </ThemeProvider>
  );
}

export default App;