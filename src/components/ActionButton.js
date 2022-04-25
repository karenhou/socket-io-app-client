import React from "react";
import styled from "styled-components";

export const Button = styled.button`
  padding: 4px;
  background-color: ${(props) => props.buttonColor || "black"};
  border-radius: 5px;
  color: white;
  border: none;
  width: 80px;
`;

const ActionButton = ({ text, actionFn, buttonColor }) => {
  return (
    <Button buttonColor={buttonColor} onClick={() => actionFn()}>
      {text}
    </Button>
  );
};

export default ActionButton;
