import React, { useEffect, useReducer, createContext } from "react";
import AuthReducer from "./AuthReducer";

const fetchUserFromLocalStorage = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === null) return null;

    return user;
  } catch (error) {
    return null;
  }
};
const INITIAL_STATE = {
  user: fetchUserFromLocalStorage(),
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
