import React from "react";
import styled from "styled-components";

const TitleStyle = styled.h1`
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 12px;
  margin-bottom: 12px;
  text-align: center;
`;

const Title = ({ title }) => {
  return <TitleStyle>{title}</TitleStyle>;
};

export default Title;
