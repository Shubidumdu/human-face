import 'styled-components';
import { theme } from './provider/ThemeProvider';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      black: string;
      red: string;
      yellow: string;
      green: string;
      beige: string;
      ivory: string;
      darkbrown: string;
    };
  }
}
