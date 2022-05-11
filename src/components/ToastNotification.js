import React from "react";
import styled, { keyframes } from "styled-components";

const NotificationAnimation = keyframes`
  0%   {
    bottom: -80px;
  }
  50%  {
    bottom: 0;
  }
  75%  {
    bottom: 0.4rem;
  }
  100% {
    bottom: 0.5rem;
  }
`;

const NotificationBox = styled.div`
  width: 300px;
  border-radius: 12px;
  background-color: #fff;
  position: fixed;
  padding: 1rem;
  right: 0.5rem;
  opacity: 0.7;
  border: 1px gray solid;
  animation: ${NotificationAnimation} 2.5s ease-in-out infinite;
`;

const ToastNotification = ({ msg }) => {
  if (!msg) return null;
  return <NotificationBox>{msg}</NotificationBox>;
};

export default ToastNotification;
