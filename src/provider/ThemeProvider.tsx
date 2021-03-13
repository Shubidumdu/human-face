import {
  ThemeProvider as Provider,
  createGlobalStyle,
} from 'styled-components';

export const theme: Theme = {
  color: {
    red: '#F24C27',
    yellow: '#F2B807',
    green: '#6BBFB0',
    beige: '#F2E3B3',
    ivory: '#FDFAE8',
    darkbrown: '#593E2E',
  },
};

const GlobalStyle = createGlobalStyle`
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

const ThemeProvider: React.FC = () => {
  return;
};

export default ThemeProvider;
