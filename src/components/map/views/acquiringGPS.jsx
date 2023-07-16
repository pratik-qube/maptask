import React from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  width: 100%;
  background: lightgrey;
  position: absolute;
  top: 0;
`;
const Content = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  height: 70px;
  background: black;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AcquiringGPSView = () => {
  return createPortal(
    <Container>
      <Content>{"Acquiring GPS ..."}</Content>
    </Container>,
    document.body
  );
};

export default AcquiringGPSView;
