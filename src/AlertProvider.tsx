import React from 'react'
import { transitions, positions, Provider } from 'react-alert'
import styled from './components/theme';

const AlertTemplate = ({ options, message, close }:any) => {
    const StyledAlert = styled.div`
      background: ${props => props.theme.color.red};
      color: ${props => props.theme.color.ivory};
      width: 25rem;
      height: 6rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      border: 2px solid black;
      border-radius: 1rem;

          @media (max-width: 850px) {
            width: 18rem;
            height: 6rem;
            font-size: 1.5rem;
        }
      `;

    return <StyledAlert>
      {message}
    </StyledAlert>
  }

// optional cofiguration
const options = {
    position: positions.MIDDLE,
    timeout: 3000,
    offset: '30px',
    transition: transitions.SCALE
  }

type ProviderProps = {
    children: React.ReactNode
}

const AlertProvider = ({children}:ProviderProps) => {
    return(<Provider template={AlertTemplate} {...options}>
        {children}
    </Provider>);
}

export default AlertProvider;