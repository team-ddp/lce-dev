import React from "react";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Button from "./Buttons";
import styled from "styled-components";

const Title = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  /* background-color: #1a1a1a; */
  border-bottom: 2px solid #ff7f00;
  -webkit-app-region: drag;
  min-width: 280px;
  box-sizing: border-box;
`;

const Logo = styled.div`
  flex: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Util = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  max-width: 100px;
`;

const Text = styled.span`
  display: inline-block;
  color: #ff7f00;
  margin-left: 16px;
  font-weight: 700;
`;

const minWindow = () => {
  window.api.send("Minimize-Window");
};
const closeWindow = () => {
  window.api.send("Close-Window");
  localStorage.clear();
};
const Titlebar = () => {
  return (
    <React.StrictMode>
      <Title>
        <Logo>
          <Text>CGSP - Powered by DDP</Text>
        </Logo>
        <Util>
          <Button color="#ff7f00">
            <InfoOutlinedIcon></InfoOutlinedIcon>
          </Button>
          <Button onClick={minWindow} color="#ff7f00">
            <RemoveOutlinedIcon></RemoveOutlinedIcon>
          </Button>
          <Button onClick={closeWindow} color="#ff7f00">
            <CloseOutlinedIcon></CloseOutlinedIcon>
          </Button>
        </Util>
      </Title>
    </React.StrictMode>
  );
};

export default Titlebar;
