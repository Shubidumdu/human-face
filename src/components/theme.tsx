import baseStyled, { css, ThemedStyledInterface } from 'styled-components';
import { darken, lighten } from 'polished';

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

export const ButtonSmall = styled.button`
  width: 5rem;
  height: 5rem;
  border-radius: 1rem;
  border: 2px solid black;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-family: yangjin;

  ${props => {
    const color = props.color!
    const selected = props.theme.color[color];
    return css`
      background: ${selected};
      &:hover {
        background: ${lighten(0.1, selected)};
      }
      &:active {
        background: ${darken(0.1, selected)};
      }
      `;
    }};
`
export const ButtonBig = styled.button`
  width: 11rem;
  height: 5rem;
  border-radius: 1rem;
  border: 2px solid black;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-family: yangjin;

  ${props => {
    const color = props.color!
    const selected = props.theme.color[color];
    return css`
      background: ${selected};
      &:hover {
        background: ${lighten(0.1, selected)};
      }
      &:active {
        background: ${darken(0.1, selected)};
      }
      `;
    }};
`

export const ButtonTiny = styled.button`
  width: 6rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 2px solid #000;
  cursor: pointer;

  ${props => {
      const color = props.color!
      const selected = props.theme.color[color];
      return css`
        background: ${selected};
        &:hover {
          background: ${lighten(0.1, selected)};
        }
        &:active {
          background: ${darken(0.1, selected)};
        }
        `;
      }};
`

export const ButtonLabel = styled.label`
  width: 6rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  border: 2px solid #000;

  ${props => {
      const color = props.color!
      const selected = props.theme.color[color];
      return css`
        background: ${selected};
        &:hover {
          background: ${lighten(0.1, selected)};
        }
        &:active {
          background: ${darken(0.1, selected)};
        }
        `;
      }};
  `

export default styled;