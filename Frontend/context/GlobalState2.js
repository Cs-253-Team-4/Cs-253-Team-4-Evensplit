import React, { createContext, useReducer } from 'react';
import AppReducer2 from 'context/AppReducer2';

// Initial state
const initialState = {
  requests: []
}

// Create context
export const GlobalContext2 = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer2, initialState);

  // Actions
  function deleteRequest(id) {
    dispatch({
      type: 'DELETE_REQUEST',
      payload: id
    });
  }

  function addRequest(request) {
    dispatch({
      type: 'ADD_REQUEST',
      payload: request
    });
  }

  return (<GlobalContext2.Provider value={{
    requests: state.requests,
    deleteRequest,
    addRequest
  }}>
    {children}
  </GlobalContext2.Provider>);
}