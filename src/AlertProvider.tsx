import React from 'react'
import { transitions, positions, Provider } from 'react-alert'
import styled from './components/theme';

const AlertTemplate = ({ style, options, message, close }:any) => {
    const alertStyle = {
        background: 'black'
    }

    return <div style={alertStyle}>
      {options.type === 'info' && '!'}
      {options.type === 'success' && ':)'}
      {options.type === 'error' && ':('}
      {message}
      <button onClick={close}>X</button>
    </div>
  }

// optional cofiguration
const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 1000000000,
    offset: '30px',
    // you can also just use 'scale'
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