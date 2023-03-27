import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const LoadingText = styled.span`
  width: inherit;
  height: inherit;
  font-weight: 700;
  display: inline-block;
  text-align: center;
  line-height: 9;
  color: white;
  font-size: 60px;
`;
const Loading = () => {
  return (
    <Container>
      <LoadingText>Loading....</LoadingText>
    </Container>
  );
};

export default Loading;
