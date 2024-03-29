import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
import reducer from '../modules/reducer';

const store = createStore(reducer, applyMiddleware(Thunk));

const ReduxProvider: React.FC = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
