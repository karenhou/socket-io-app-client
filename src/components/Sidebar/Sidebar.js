import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext, SocketContext } from "../../context/AuthContext";

const SideNavContainer = styled.div`
  height: 100vh;
  background-color: #3aaa16;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1;
  box-sizing: border-box;
  justify-content: space-between;

  a {
    text-decoration: none;
  }
`;

const CircleButton = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: inline-block;
  background-color: #fff;
  color: #124b00;
  padding: 8px;
  display: flex;
  font-size: 1.5rem;
  justify-content: center;
  align-items: center;
`;

const LogoutButton = styled.button`
  padding: 8px;
  background-color: #fff;
  border-radius: 8px;
  color: #124b00;

  :hover {
    cursor: pointer;

    :disabled {
      cursor: not-allowed;
    }
  }
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const { chatSocket } = useContext(SocketContext);

  const handleLogoutBtnClicked = (e) => {
    dispatch({ type: "LOGOUT_START" });

    try {
      localStorage.removeItem("user");
      dispatch({ type: "LOGOUT_SUCCESS" });
      navigate("/", { replace: true });
    } catch (error) {
      dispatch({ type: "LOGOUT_FAILURE", payload: error });
    }

    chatSocket.emit("removeUser", {
      socketId: chatSocket.id,
    });
  };

  return (
    <SideNavContainer>
      <div style={{ display: "grid", gap: "12px" }}>
        <Link to="/profile">
          <CircleButton>H</CircleButton>
        </Link>
        <Link to="/chat-lobby">
          <CircleButton>C</CircleButton>
        </Link>
        <Link to="/game-lobby">
          <CircleButton>G</CircleButton>
        </Link>
      </div>

      <LogoutButton onClick={handleLogoutBtnClicked}>Logout</LogoutButton>
    </SideNavContainer>
  );
};

export default Sidebar;
