import baseStyled, { ThemedStyledInterface } from 'styled-components';

type Theme = {
  color: {
    [code: string]: string;
  }
}

export const theme:Theme = {
    color: {
        red: '#F24C27',
        yellow: '#F2B807',
        green: '#6BBFB0',
        beige: '#F2E3B3',
        ivory: '#FDFAE8',
        darkbrown: '#593E2E'
    }
  };

// export type Theme = typeof theme;

const styled = baseStyled as ThemedStyledInterface<Theme>;

export default styled;