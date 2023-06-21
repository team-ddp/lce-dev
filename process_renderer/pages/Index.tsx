import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Route, HashRouter, Routes, useNavigate } from "react-router-dom";

import Titlebar from "../components/Titlebar";
import Sidenav from "../components/Sidenav";
import Loading from "./Loading";
import Info from "./Info";

const Grid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  box-sizing: border-box;
  overflow: hidden;
  grid-template-rows: 35px 1fr;
  grid-template-columns: 170px 1fr;
  grid-template-areas:
    "title title "
    "side page";
`;
const Title = styled.div`
  grid-area: title;
`;
const Side = styled.div`
  grid-area: side;
`;
const Page = styled.div`
  width: 100%;
  overflow: overlay;
  background-color: black;
  ::-webkit-scrollbar {
    width: 11px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #1a1a1a;
    border-radius: 10px;
  }
  /* ::-webkit-scrollbar-track ; */
`;

const index = () => {
  const [clientConnect, setClientConnect] = useState([false]);
  console.log(clientConnect);

  // const navigate = useNavigate();

  return (
    <React.StrictMode>
      <HashRouter>
        <Grid>
          <Title>
            <Titlebar />
          </Title>
          <Side>
            <Sidenav />
          </Side>
          <Page>
            <Routes>
              <Route path="/" element={<Loading />} />
              <Route path="/info" element={clientConnect && <Info />} />
            </Routes>
          </Page>
        </Grid>
      </HashRouter>
    </React.StrictMode>
  );
};

export default index;
