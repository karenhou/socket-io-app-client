import React from "react";
import styled from "styled-components";

const GuessRecordContainer = styled.div`
  background-color: #1e590c;
  padding: 16px;
  border-radius: 8px;
  min-height: 100px;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const RecordContainer = styled.div`
  border-radius: 8px;
  justify-self: center;
`;

const EachGuessBox = styled.div`
  margin-bottom: 0.5rem;
`;

const StickerNotesDiv = styled.div`
  background-color: #ffff65;
  padding: 4px 8px;
  min-width: 100px;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  color: #333;
`;

const RecordComponents = ({ guessRecord }) => {
  return (
    <>
      {guessRecord.map((guess, index) => {
        return (
          <EachGuessBox key={index}>
            <StickerNotesDiv>{guess}</StickerNotesDiv>
          </EachGuessBox>
        );
      })}
    </>
  );
};

const GuessRecords = ({ hasWon, guessRecord }) => {
  return (
    <GuessRecordContainer>
      <h4>Guess Records</h4>
      <RecordContainer>
        {hasWon === 1 && <StickerNotesDiv>You won!</StickerNotesDiv>}
        {hasWon === 2 && <StickerNotesDiv>You lost!</StickerNotesDiv>}
        {hasWon === 0 && guessRecord && (
          <RecordComponents guessRecord={guessRecord} />
        )}
      </RecordContainer>
    </GuessRecordContainer>
  );
};

export default GuessRecords;
