import 'styled-components';
import { theme } from './provider/ThemeProvider';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      white: string;
      grey: string;
      black: string;
      red: string;
      yellow: string;
      green: string;
      beige: string;
      ivory: string;
      darkbrown: string;
      [code: string]: string;
    };
  }
}
