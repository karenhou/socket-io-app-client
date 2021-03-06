import React, { useState } from "react";
import styled from "styled-components";
import CreateGameForm from "./CreateGameForm";
import JoinGameForm from "./JoinGameForm";
import ConfigGameNavTabs from "./ConfigGameNavTabs";

const ConfigGameContainer = styled.div`
  width: 460px;
  height: 320px;
  margin: auto;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: #bcecac;
  border-radius: 8px;
  color: #333;
`;

const ConfigGameForm = styled.div`
  min-width: 300px;
  margin: auto;
  display: flex;
  flex-flow: column;
  align-items: center;
`;

const ConfigGame = ({ errMsg }) => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <ConfigGameContainer>
      <ConfigGameNavTabs
        setCurrentTab={setCurrentTab}
        currentTab={currentTab}
      />

      <ConfigGameForm>
        {currentTab === 0 && <CreateGameForm errMsg={errMsg} />}
        {currentTab === 1 && <JoinGameForm errMsg={errMsg} />}
      </ConfigGameForm>
    </ConfigGameContainer>
  );
};

export default ConfigGame;
