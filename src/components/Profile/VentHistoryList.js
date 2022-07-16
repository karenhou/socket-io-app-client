import React from "react";
import styled from "styled-components";
import VentHistoryItem from "./VentHistoryItem";

const VentHistoryContainer = styled.div`
  margin-top: 2rem;
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
