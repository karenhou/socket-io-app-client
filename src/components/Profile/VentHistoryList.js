import React from "react";
import styled from "styled-components";
import VentHistoryItem from "./VentHistoryItem";

// TODO style up the scroll up abit
const VentHistoryContainer = styled.div`
  margin-top: 2rem;
  max-height: 380px;
  overflow-x: hidden;
`;

const VentHistoryList = ({ thoughts }) => {
  return (
    <VentHistoryContainer>
      {thoughts &&
        thoughts.map((thought, i) => {
          return <VentHistoryItem key={i} thought={thought} />;
        })}
    </VentHistoryContainer>
  );
};

export default VentHistoryList;
