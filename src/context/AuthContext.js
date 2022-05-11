import React, { useEffect, useReducer, createContext } from "react";
import { io } from "socket.io-client";
import AuthReducer from "./AuthReducer";
import SocketReducer from "./SocketReducer";

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

const setUpChatSocket = () => {
  const chatSocket = io("http://localhost:3001");
  return chatSocket;
};

const setUpGameSocket = () => {
  const gameSocket = io("http://localhost:3001/game");
  return gameSocket;
};
const SOCKET_INIT_STATE = {
  chatSocket: setUpChatSocket(),
  gameSocket: setUpGameSocket(),
};

export const SocketContext = createContext(SOCKET_INIT_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const [socketState, socketDispatch] = useReducer(
    SocketReducer,
    SOCKET_INIT_STATE
  );

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        chatSocket: state.chatSocket,
        gameSocket: state.gameSocket,
        dispatch,
      }}>
      <SocketContext.Provider
        value={{
          chatSocket: socketState.chatSocket,
          gameSocket: socketState.gameSocket,
          socketDispatch,
        }}>
        {children}
      </SocketContext.Provider>
    </AuthContext.Provider>
  );
};
