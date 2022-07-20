import React from "react";
import styled from "styled-components";
import moment from "moment";

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
// TODO change this color
const DotDiv = styled.div`
  border-radius: 50%;
  width: 10px;
  height: 12px;
  background-color: pink;
`;
// TODO change this color
const LineDiv = styled.div`
  border-right: solid orange 2px;
  width: 10px;
  height: 100%;
  margin-right: 10px;
`;

const VentContainer = styled(CardDiv)`
  padding: 8px 0.8rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
`;

const VentContentDiv = styled.div`
  font-size: 14px;
`;

const TimeDiv = styled.div`
  font-size: 10px;
  display: flex;
  justify-content: flex-end;
  color: #808080;
`;

const MoodSpan = styled.span`
  color: ${(props) =>
    props.mood === "happy"
      ? "#3aaa16"
      : props.mood === "sad"
      ? "#244C7A"
      : props.mood === "angry"
      ? "#E94825"
      : "#634654"};
`;

const VentHistoryItem = ({ thought }) => {
  console.log("thouhtss ", thought);
  return (
    <TimelineContainer>
      <LineContainer>
        <DotDiv />
        <LineDiv />
      </LineContainer>
      <VentContainer>
        <VentContentDiv>{thought.content}</VentContentDiv>
        <TimeDiv>
          <MoodSpan mood={thought.mood}>{thought.mood}</MoodSpan>,{" "}
          {moment(thought.createdAt).format("lll")}
        </TimeDiv>
      </VentContainer>
    </TimelineContainer>
  );
};

export default VentHistoryItem;
