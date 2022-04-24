import { createContext, useReducer } from "react";

// reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload, isAuth: true };
    case "LOGOUT":
      return { ...state, user: null, isAuth: false };
    default:
      return state;
  }
};

// initial state
const initialState = {
  user: null,
  isAuth: false
};

// create context
const Context = createContext({});

// context provider
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
