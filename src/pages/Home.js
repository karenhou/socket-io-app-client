import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

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
  height: 50%;
  margin: auto;
  border-radius: 15px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  padding: 12px;
  align-items: center;

  h2 {
    margin-top: 4.5rem;
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
  justify-content: center;

  a {
    width: 100%;
  }
`;

const StyldButton = styled.button`
  width: 100%;
  padding: 4px 8px;
  border-radius: 5px;
  color: white;
  background-color: ${(props) => props.btnColor || "#1b7000"};
  border: none;

  :hover {
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
    }
  }
`;

const Home = () => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const navigate = useNavigate();

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

    //call API - login
    try {
      const res = await axios.post(
        "http://localhost:8900/api/auth/login",
        user
      );
      console.log("login response", res);
      if (res.status === 200) {
        //store JWT
        localStorage.setItem("jwtToken", res.data.id_token);
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      }
    } catch (error) {
      console.log("call login api failed ", error.response);
    }
  };

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
            <ButtonContainer>
              <StyldButton
                type="button"
                disabled={!inputEmail || !inputPassword}
                onClick={handleLoginClicked}>
                Login
              </StyldButton>
              <Link to="/register">
                <StyldButton btnColor="#BEDBB5">Register</StyldButton>
              </Link>
            </ButtonContainer>
          </form>
        </LoginContainer>
      </RightGrid>
    </HomeContainer>
  );
};

export default Home;
