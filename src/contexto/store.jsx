import React, { createContext, useContext, useReducer } from 'react';
import { mainReducer } from './reducers/index.jsx';
import { initialState } from './initialState.jsx';

export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);
