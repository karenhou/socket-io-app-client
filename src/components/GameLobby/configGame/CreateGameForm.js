import React, { useState, useContext } from "react";
import styled from "styled-components";
import { AuthContext, SocketContext } from "../../../context/AuthContext";

//TODO refactor this so join game form can share
const FormBody = styled.form`
  display: grid;
  grid-template-rows: 1fr;
  grid-row-gap: 0.8rem;
`;

const InputRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 1.5rem;

  label {
    text-align: right;
    font-weight: bold;
  }

  input {
    padding: 4px;
    border-radius: 4px;
  }

  select {
    border-radius: 4px;
    border: none;
  }
`;

const Btn = styled.button`
  padding: 4px 8px;
  border-radius: 5px;
  background-color: #fff;
  width: 80px;
  margin: auto;
  text-align: center;
  color: #3aaa16;
  margin-top: 12px;

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

const CreateGameForm = ({ errMsg }) => {
  const [inputRoom, setInputRoom] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [maxPlayerCount, setMaxPlayerCount] = useState(2);
  const {
    user: { user },
  } = useContext(AuthContext);

  const { gameSocket } = useContext(SocketContext);

  const handleCreateGameClicked = (e) => {
    e.preventDefault();
    //TODO validation
    console.log("handleCreateGameClicked", inputRoom, inputPassword);

    gameSocket.emit("create_game", {
      roomNum: inputRoom.trim(),
      password: inputPassword.trim(),
      host: gameSocket.id,
      username: user.username,
      maxPlayerCount,
    });
  };

  const handleInputRoom = (e) => {
    setInputRoom(e.target.value.trim());
  };

  const handleInputPassword = (e) => {
    setInputPassword(e.target.value.trim());
  };

  const handlePlayerCountChanged = (e) => {
    setMaxPlayerCount(e.target.value);
  };

  return (
    <FormBody>
      <InputRow>
        <label htmlFor="">Room# </label>
        <input type="text" placeholder="Room Name" onChange={handleInputRoom} />
      </InputRow>

      <InputRow>
        <label htmlFor="">Password</label>
        <input
          type="password"
          placeholder="Password for the room ..."
          onChange={handleInputPassword}
        />
      </InputRow>

      <InputRow>
        <label htmlFor="">Maximum Player</label>
        <select name="maxPlayerCount" onChange={handlePlayerCountChanged}>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
        </select>
      </InputRow>

      <Btn
        type="button"
        onClick={handleCreateGameClicked}
        disabled={!inputRoom.trim() || !inputPassword.trim()}>
        Confirm
      </Btn>
      <ErrText>{errMsg}</ErrText>
    </FormBody>
  );
};

export default CreateGameForm;
