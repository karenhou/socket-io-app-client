import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CreateGameForm from "./CreateGameForm";
import JoinGameForm from "./JoinGameForm";

const GameBox = styled.div`
  width: 500px;
  height: 350px;
  margin: auto;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: #3aaa16;
  border-radius: 12px;
  color: white;
`;

const GameNavTab = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  height: 48px;
`;

const FirstNav = styled.div`
  padding: 12px;
  background-color: ${(props) => (props.current === 0 ? "#3aaa16" : "#fff")};
  color: ${(props) => (props.current === 0 ? "#fff" : "#3aaa16")};

  border-top-left-radius: 5px;
  :hover {
    cursor: pointer;
  }
`;

const SecondNav = styled.div`
  padding: 12px;
  background-color: ${(props) => (props.current === 1 ? "#3aaa16" : "#fff")};
  color: ${(props) => (props.current === 1 ? "#fff" : "#3aaa16")};
  border-top-right-radius: 5px;
  :hover {
    cursor: pointer;
  }
`;

const GameConfigBody = styled.div`
  width: 300px;
  margin: auto;
  display: flex;
  flex-flow: column;
  align-items: center;
  height: 100%;

  h2 {
    margin-top: 4rem;
    margin-bottom: 1rem;
  }
`;

const ConfigGame = ({ gameSocket, errMsg }) => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <GameBox>
      <GameNavTab>
        <FirstNav onClick={() => setCurrentTab(0)} current={currentTab}>
          Create
        </FirstNav>
        <SecondNav onClick={() => setCurrentTab(1)} current={currentTab}>
          Join
        </SecondNav>
      </GameNavTab>

      <GameConfigBody>
        {currentTab === 0 && (
          <CreateGameForm gameSocket={gameSocket} errMsg={errMsg} />
        )}
        {currentTab === 1 && (
          <JoinGameForm gameSocket={gameSocket} errMsg={errMsg} />
        )}
      </GameConfigBody>
    </GameBox>
  );
};

export default ConfigGame;
