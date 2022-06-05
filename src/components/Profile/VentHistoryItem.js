import React from "react";
import styled from "styled-components";

const CardDiv = styled.div`
  padding: 12px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: #fff;
  border-radius: 12px;
`;

const TimelineContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 10fr;
  gap: 0.5rem;

  :first-child {
    margin-top: 1rem;
  }
`;

const LineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DotDiv = styled.div`
  border-radius: 50%;
  width: 10px;
  height: 12px;
  background-color: pink;
`;

const LineDiv = styled.div`
  border-right: solid orange 2px;
  width: 10px;
  height: 100%;
  margin-right: 10px;
`;

const VentContainer = styled(CardDiv)`
  padding: 12px 1rem;
  margin-top: 0.5rem;
`;

const VentHistoryItem = ({ content }) => {
  return (
    <TimelineContainer>
      <LineContainer>
        <DotDiv />
        <LineDiv />
      </LineContainer>
      <VentContainer>{content}</VentContainer>
    </TimelineContainer>
  );
};

export default VentHistoryItem;
