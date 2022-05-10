import React, { useState, useContext } from "react";
import styled from "styled-components";
import { AuthContext } from "../../context/AuthContext";

const FormBody = styled.form`
  display: grid;
  grid-template-rows: 1fr;
  grid-row-gap: 0.8rem;
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
`;

const Btn = styled.button`
  padding: 4px 8px;
  border-radius: 5px;
  background-color: #fff;
  width: 80px;
  margin: auto;
  text-align: center;
  color: #3aaa16;

  :hover {
    cursor: pointer;

    :disabled {
      cursor: not-allowed;
    }
  }
`;

const ErrText = styled.div`
  color: red;
  height: 18px;
  text-align: center;
`;

const JoinGameForm = ({ gameSocket, errMsg }) => {
  const [inputRoom, setInputRoom] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const {
    user: { user },
  } = useContext(AuthContext);

  const handleInputRoom = (e) => {
    setInputRoom(e.target.value.trim());
  };

  const handleInputPassword = (e) => {
    setInputPassword(e.target.value.trim());
  };

  const handleJoinGameClicked = (e) => {
    e.preventDefault();
    //TODO validation
    console.log("handleJoinGameClicked", inputRoom);

    gameSocket.emit("join_game", {
      roomNum: inputRoom.trim(),
      password: inputPassword.trim(),
      username: user.username,
    });
  };

  return (
    <>
      <h2>Join</h2>
      <FormBody>
        <InputRow>
          <label htmlFor="" value={inputRoom}>
            Room#
          </label>
          <input
            type="text"
            placeholder="Room Name"
            onChange={handleInputRoom}
          />
        </InputRow>

        <InputRow>
          <label htmlFor="">Password </label>
          <input
            type="password"
            placeholder="Password for the room ..."
            onChange={handleInputPassword}
          />
        </InputRow>

        <Btn
          type="button"
          onClick={handleJoinGameClicked}
          disabled={!inputRoom.trim() || !inputPassword.trim()}>
          Join
        </Btn>
        <ErrText>{errMsg}</ErrText>
      </FormBody>
    </>
  );
};

export default JoinGameForm;
