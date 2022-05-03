import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const RegisterContainer = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  background-color: #268d06;
`;

const RegisterBox = styled.div`
  width: 50%;
  min-height: 40%;
  margin: auto;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  padding: 12px;
  align-items: center;
  background-color: #fff;
  justify-content: center;

  h2 {
    margin-bottom: 1rem;
  }
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin-bottom: 8px;
  gap: 12px;

  input {
    padding: 0px 4px;
  }
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 12px;
  gap: 8px;
  justify-items: center;

  a {
    width: 100%;
  }
`;

const StyldButton = styled.button`
  width: 100%;
  padding: 4px 8px;
  border-radius: 5px;
  color: ${(props) => props.textColor || "white"};
  background-color: ${(props) => props.btnColor || "#1b7000"};
  border: none;

  :hover {
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
    }
  }
`;

const Register = () => {
  const [inputUserName, setInputUserName] = useState("username1");
  const [inputEmail, setInputEmail] = useState("username1@gmail.com");
  const [inputPassword, setInputPassword] = useState("111111");
  const [inputPasswordConfirm, setInputPasswordConfirm] = useState("111111");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleEmailChange = (e) => {
    setInputEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setInputPassword(e.target.value);
  };

  const handleInputPasswordConfirmChange = (e) => {
    setInputPasswordConfirm(e.target.value);
  };

  const handleUserNameChange = (e) => {
    setInputUserName(e.target.value);
  };

  const handleRegisterClicked = async (e) => {
    e.preventDefault();
    console.log("register clicked");

    //TODO validation

    //TODO register
    const user = {
      email: inputEmail,
      password: inputPassword,
      username: inputUserName,
    };

    dispatch({ type: "REGISTER_START" });
    //call API - register
    try {
      const res = await axios.post(
        "http://localhost:8900/api/auth/register",
        user
      );
      console.log("register response", res);
      if (res.status === 200) {
        dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
        navigate("/profile", { replace: true });
      }
    } catch (err) {
      console.log("call reigster api failed ", err.response.data);
      dispatch({ type: "REGISTER_FAILURE" });
      setErrMsg(err.response.data.msg);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setErrMsg("");
    }, 2000);
  }, [errMsg]);

  return (
    <RegisterContainer>
      <RegisterBox>
        <h2>Register</h2>
        <form>
          <InputContainer>
            <label htmlFor="">User Name: </label>
            <input
              type="text"
              placeholder="User Name here..."
              value={inputUserName}
              onChange={handleUserNameChange}
            />
          </InputContainer>
          <InputContainer>
            <label htmlFor="">Email: </label>
            <input
              type="text"
              placeholder="Email here..."
              value={inputEmail}
              onChange={handleEmailChange}
            />
          </InputContainer>

          <InputContainer>
            <label htmlFor="">Password: </label>
            <input
              type="password"
              placeholder="Password here..."
              value={inputPassword}
              onChange={handlePasswordChange}
            />
          </InputContainer>

          <InputContainer>
            <label htmlFor="">Password: </label>
            <input
              type="password"
              placeholder="Type Password again..."
              value={inputPasswordConfirm}
              onChange={handleInputPasswordConfirmChange}
            />
          </InputContainer>
          <ButtonContainer>
            <StyldButton
              type="button"
              disabled={
                !inputEmail ||
                !inputPassword ||
                !inputPasswordConfirm ||
                !inputUserName
              }
              onClick={handleRegisterClicked}>
              Register
            </StyldButton>
            <Link to="/">
              <StyldButton btnColor="#d89696">Cancel</StyldButton>
            </Link>
          </ButtonContainer>
          <p
            style={{
              color: "red",
              textAlign: "center",
              marginTop: "8px",
              minHeight: "22.5px",
            }}>
            {errMsg}
          </p>
        </form>
      </RegisterBox>
    </RegisterContainer>
  );
};

export default Register;
