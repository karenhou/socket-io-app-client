const SocketReducer = (state, action) => {
  switch (action.type) {
    case "CHAT_SOCKET_START":
      return {
        chatSocket: state.chatSocket,
        gameSocket: state.gameSocket,
      };
    default:
      return state;
  }
};

export default SocketReducer;
