import React from "react";
import styled from "styled-components";

const CardDiv = styled.div`
  padding: 12px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  background-color: #fff;
  border-radius: 12px;
`;

const TextAreaContainer = styled(CardDiv)`
  margin-top: 56px;
`;

const WordOfTheDay = styled.textarea`
  padding: 8px;
  resize: none;
  width: inherit;
  display: block;
  box-sizing: border-box;
  border: none;
  color: #124b00;
`;

const BtnRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;

  select {
    border-radius: 8px;
    border-color: lightgray;
    color: gray;
    padding: 4px 8px;
  }
`;

const Btn = styled.button`
  padding: 8px;
  background-color: #3aaa16;
  border: none;
  border-radius: 8px;
  color: #fff;
  width: 100px;

  :hover {
    cursor: pointer;

    :disabled {
      cursor: not-allowed;
    }
  }
`;

const VentInput = () => {
  return (
    <TextAreaContainer>
      <WordOfTheDay defaultValue="Let it all out..."></WordOfTheDay>

      <BtnRow>
        <select name="mood">
          <option value="">Select a mood</option>
          <option value="happy">Happy</option>
          <option value="sad">Sad</option>
          <option value="angry">Angry</option>
          <option value="overwhelmed">Overwhelmed</option>
        </select>
        <Btn>Vent</Btn>
      </BtnRow>
    </TextAreaContainer>
  );
};

export default VentInput;
