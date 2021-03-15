import {
  ThemeProvider,
  createGlobalStyle,
  DefaultTheme,
} from 'styled-components';
import React from 'react';
import { Reset } from 'styled-reset';

export const theme: DefaultTheme = {
  color: {
    white: '#FFFFFF',
    grey: '#808080',
    black: '#000000',
    red: '#F24C27',
    yellow: '#F2B807',
    green: '#6BBFB0',
    beige: '#F2E3B3',
    ivory: '#FDFAE8',
    darkbrown: '#593E2E',
  },
};

const GlobalStyle = createGlobalStyle`
  a {
    text-decoration:none;
    color:inherit;
  }

  * {
    box-sizing:border-box;
  }

  body{
    font-family: YangJin, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px;
    background-color: ${({ theme }) => theme.color.beige};
  }
`;

const StyleProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Reset />
      <GlobalStyle />
      {children}
    </ThemeProvider>
  );
};

export default StyleProvider;
