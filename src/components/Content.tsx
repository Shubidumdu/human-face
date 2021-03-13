import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppState } from '../modules/types';
import FormContainer from './FormContainer';
import ResultContainer from './ResultContainer';

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 4rem;
  padding-bottom: 2rem;

  @media (max-width: 426px) {
    margin: 0.5rem;
    padding: 0;
  }
`;

const Content: React.FC = () => {
  const error = useSelector((state: AppState) => state.error);
  const result = useSelector((state: AppState) => state.result);

  if (result || error)
    return (
      <Main>
        <ResultContainer />
      </Main>
    );

  return (
    <Main>
      <FormContainer />
    </Main>
  );
};

export default Content;
