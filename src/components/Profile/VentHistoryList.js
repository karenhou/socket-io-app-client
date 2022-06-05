import React from "react";
import styled from "styled-components";
import VentHistoryItem from "./VentHistoryItem";

const VentHistoryContainer = styled.div`
  margin-top: 2rem;
`;

const FAKE_DATA = {
  1: "printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popula",
  2: "printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also",
};
const VentHistoryList = () => {
  return (
    <VentHistoryContainer>
      <VentHistoryItem content={FAKE_DATA["1"]} />
      <VentHistoryItem content={FAKE_DATA["2"]} />
    </VentHistoryContainer>
  );
};

export default VentHistoryList;
