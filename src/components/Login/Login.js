import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import InputComponent from "../InputComponent";
import ActionButton from "../ActionButton";
import Title from "../Title";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`;

const RowContainer = styled.div`
  display: grid;
  gap: 2px;
  grid-template-columns: 1fr;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const ErrorText = styled.div`
  color: red;
`;

const Login = ({ socket }) => {
  const [inputName, setInputName] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [systemMsg, setSystemMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("socket ", socket.id);
    socket.emit("login", {
      name: inputName,
      password: inputPassword,
      socketId: socket.id,
    });
  };

  useEffect(() => {
    socket.on("login_result", (data) => {
      console.log("login_result", data); //msg
      if (data.msg === "Wrong password") {
        setSystemMsg(data.msg);
      } else {
        navigate("/chat", { state: { name: inputName } });
      }
    });
    return () => {
      socket.off("login_result");
    };
  }, [socket]);

  return (
    <LoginContainer>
      <Title title="Login System" />
      <RowContainer>
        <InputComponent
          placeholder="Your name.."
          value={inputName}
          setValue={setInputName}
        />
        <InputComponent
          placeholder="Password.."
          value={inputPassword}
          setValue={setInputPassword}
        />
      </RowContainer>
      <ActionButton buttonColor="green" text="Login" actionFn={handleLogin} />
      {systemMsg && <ErrorText>{systemMsg}</ErrorText>}
    </LoginContainer>
  );
};

export default Login;
