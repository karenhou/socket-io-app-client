import React from "react";
import styled from "styled-components";
import ContainerWrapper from "./ContainerWrapper";

const ActiveUserContainer = styled(ContainerWrapper)`
  background-color: #98dc83;
  padding: 12px;
  color: #124b00;
`;

const ActiveUserList = () => {
  return (
    <ActiveUserContainer>
      <h3>Active Users</h3>
    </ActiveUserContainer>
  );
};

export default ActiveUserList;
