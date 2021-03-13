import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import styled, { DefaultTheme, useTheme } from 'styled-components';

const SpinnerWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: fixed;
  background: rgb(0, 0, 0, 0.5);
  z-index: 10;
  justify-content: center;
  align-items: center;
`;

type SpinnerProps = {
  isLoading: boolean;
};

const Spinner: React.FC<SpinnerProps> = ({ isLoading }) => {
  const theme = useTheme();

  if (isLoading)
    return (
      <SpinnerWrap>
        <Loader
          visible={isLoading}
          type="Oval"
          color={theme.color.yellow}
          height={300}
          width={300}
        />
      </SpinnerWrap>
    );
  return null;
};

export default Spinner;
