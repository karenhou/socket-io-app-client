import React from "react";
import styled from "styled-components";

const RecordContainer = styled.div`
  grid-area: guessRecord;
  background-color: hsl(59, 100%, 80%);
  padding: 1rem;
  border-radius: 12px;
`;

const RecordComponents = ({ guessRecord }) => {
  return (
    <>
      <h3>Guess Records</h3>
      {guessRecord.map((guess, index) => {
        console.log("guess ", guess);
        return <div key={index}>{guess}</div>;
      })}
    </>
  );
};

const GuessRecords = ({ hasWon, guessRecord }) => {
  return (
    <RecordContainer>
      {hasWon === 1 && <h3>You won!</h3>}
      {hasWon === 2 && <h3>You lost!</h3>}
      {hasWon === 0 && guessRecord && (
        <RecordComponents guessRecord={guessRecord} />
      )}
    </RecordContainer>
  );
};

export default GuessRecords;
