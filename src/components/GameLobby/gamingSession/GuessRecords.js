import React from "react";
import styled from "styled-components";

const RecordContainer = styled.div`
  grid-area: guessRecord;
  padding: 0 1rem;
  border-radius: 8px;
  justify-self: center;
`;

const EachGuessBox = styled.div`
  margin-bottom: 0.5rem;
`;

const StickerNotesDiv = styled.div`
  background-color: hsl(59, 100%, 80%);
  padding: 4px 8px;
  min-width: 100px;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
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
    <RecordContainer>
      {hasWon === 1 && <StickerNotesDiv>You won!</StickerNotesDiv>}
      {hasWon === 2 && <StickerNotesDiv>You lost!</StickerNotesDiv>}
      {hasWon === 0 && guessRecord && (
        <RecordComponents guessRecord={guessRecord} />
      )}
    </RecordContainer>
  );
};

export default GuessRecords;
