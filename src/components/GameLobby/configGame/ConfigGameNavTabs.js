import React from "react";
import styled from "styled-components";

const GameNavTab = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  height: 48px;
`;

const NavDiv = styled.div`
  padding: 12px;
  background-color: ${(props) =>
    props.idx === props.current ? "#3BCECAC" : "#fff"};
  color: ${(props) => (props.idx === props.current ? "#333" : "#3BCECAC")};

  border-top-left-radius: ${(props) =>
    props.idx === props.current ? "5px" : "0px"};
  border-top-right-radius: ${(props) =>
    props.idx === props.current ? "5px" : "0px"};
  :hover {
    cursor: pointer;
  }
`;

const NavItem = ({ setCurrentTab, currentTab, title, idx }) => {
  return (
    <NavDiv idx={idx} onClick={() => setCurrentTab(idx)} current={currentTab}>
      {title}
    </NavDiv>
  );
};

const ConfigGameNavTabs = ({ setCurrentTab, currentTab }) => {
  return (
    <GameNavTab>
      <NavItem
        setCurrentTab={setCurrentTab}
        currentTab={currentTab}
        title="Create Room"
        idx={0}
      />
      <NavItem
        setCurrentTab={setCurrentTab}
        currentTab={currentTab}
        title="Join Room"
        idx={1}
      />
    </GameNavTab>
  );
};

export default ConfigGameNavTabs;
