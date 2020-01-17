import React from 'react';
import FormContainer from './containers/FormContainer';
import ResultContainer from './containers/ResultContainer';
import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    ${reset};
    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        box-sizing:border-box;
    }
    body{
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: 14px;
        background-color: #F2E3B3;
    }
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <div className="App">
        <FormContainer />
        <ResultContainer />
      </div>
    </>
  );
}

export default App;