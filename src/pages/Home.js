import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const HomeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;
`;

const LeftGrid = styled.div`
  background-color: #268d06; /* primary color*/
  padding: 12px;
`;

const HeroTextContainer = styled.div`
  width: 60%;
  margin: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;

  h3 {
    margin-top: 12px;
    color: #a4d196; /* secondary color*/
  }
`;

const RightGrid = styled.div`
  padding: 12px;
  background-color: #fff;
  display: flex;
  align-content: center;
`;

const LoginContainer = styled.div`
  width: 76%;
  min-height: 35%;
  margin: auto;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  padding: 12px;
  align-items: center;
  justify-content: center;

  h2 {
    margin-bottom: 1rem;
  }
  form {
    display: flex;
    flex-direction: column;
  }
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin-bottom: 16px;
  gap: 12px;

  label {
    text-align: right;
  }

  input {
    padding: 0px 4px;
    border: solid 1px gray;
    border-radius: 4px;
  }
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  justify-content: center;
  justify-items: center;
`;

const StyldButton = styled.button`
  width: 100px;
  padding: 4px 8px;
  border-radius: 5px;
  color: white;
  background-color: #1b7000;
  border: none;

  :hover {
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
    }
  }
`;

const ReigsterBtn = styled(StyldButton)`
  background-color: #fff;
  border: solid 1px #3aaa16;
  color: #3aaa16;
`;

const ErrText = styled.p`
  color: red;
  text-align: center;
  margin-top: 8px;
  min-height: 22.5px;
`;

const Home = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleEmailChange = (e) => {
    setInputEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setInputPassword(e.target.value);
  };

  const handleLoginClicked = async (e) => {
    e.preventDefault();
    console.log("handleLoginClicked");

    const user = {
      email: inputEmail,
      password: inputPassword,
    };

    dispatch({ type: "LOGIN_START" });
    //call API - login
    try {
      const res = await axios.post(
        "http://localhost:8900/api/auth/login",
        user
      );
      if (res.status === 200) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        setTimeout(() => {
          navigate("/profile", { replace: true });
        }, 1000);
      }
    } catch (err) {
      console.log("call login api failed ", err.response.data);
      dispatch({ type: "LOGIN_FAILURE" });
      setErrMsg(err.response.data.msg);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setErrMsg("");
    }, 2500);
  }, [errMsg]);

  return (
    <HomeContainer>
      <LeftGrid>
        <HeroTextContainer>
          <h1>Welcome to Chat Chat !!</h1>
          <h3>Where Chatting and else happenes</h3>
        </HeroTextContainer>
      </LeftGrid>
      <RightGrid>
        <LoginContainer>
          <h2>Login</h2>
          <form>
            <InputContainer>
              <label htmlFor="">Email </label>
              <input
                type="text"
                placeholder="Email here..."
                value={inputEmail}
                onChange={handleEmailChange}
              />
            </InputContainer>

            <InputContainer>
              <label htmlFor="">Password </label>
              <input
                type="password"
                placeholder="Password here..."
                value={inputPassword}
                onChange={handlePasswordChange}
              />
            </InputContainer>
            <ButtonContainer>
              <StyldButton
                type="submit"
                disabled={!inputEmail || !inputPassword}
                onClick={handleLoginClicked}>
                Login
              </StyldButton>
              <Link to="/register">
                <ReigsterBtn type="button">Register</ReigsterBtn>
              </Link>
            </ButtonContainer>
            <ErrText>{errMsg}</ErrText>
          </form>
        </LoginContainer>
      </RightGrid>
    </HomeContainer>
  );
};

export default Home;
