import React from 'react';
import FormContainer from './containers/FormContainer';
import './App.css';
import ResultContainer from './containers/ResultContainer';

const App: React.FC = () => {
  return (
    <div className="App">
      <FormContainer />
      <ResultContainer />
    </div>
  );
}

export default App;