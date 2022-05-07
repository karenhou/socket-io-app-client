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

const Btn = styled.div`
  padding: 4px 8px;
  border-radius: 5px;
  background-color: #fff;
  width: 80px;
  margin: auto;
  text-align: center;
  color: #3aaa16;

  :hover {
    cursor: pointer;
  }
`;

const ErrText = styled.div`
  color: red;
  height: 18px;
  text-align: center;
`;

const CreateGameForm = ({ gameSocket, errMsg }) => {
  const [inputRoom, setInputRoom] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const {
    user: { user },
  } = useContext(AuthContext);

  const handleCreateGameClicked = (e) => {
    e.preventDefault();
    //TODO validation
    console.log("handleCreateGameClicked", inputRoom, inputPassword);
    gameSocket.emit("create_game", {
      roomNum: inputRoom,
      password: inputPassword,
      host: gameSocket.id,
      username: user.username,
    });
  };

  return (
    <>
      <h2>Create</h2>
      <FormBody>
        <InputRow>
          <label htmlFor="">Room# </label>
          <input
            type="text"
            placeholder="Room Name"
            onChange={(e) => setInputRoom(e.target.value)}
          />
        </InputRow>

        <InputRow>
          <label htmlFor="" value={inputPassword}>
            Password
          </label>
          <input
            type="password"
            placeholder="Password for the room ..."
            onChange={(e) => setInputPassword(e.target.value)}
          />
        </InputRow>

        <Btn type="button" onClick={handleCreateGameClicked}>
          Create
        </Btn>
        <ErrText>{errMsg}</ErrText>
      </FormBody>
    </>
  );
};

export default CreateGameForm;
