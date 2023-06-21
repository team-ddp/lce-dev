import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import ContentPasteSearchOutlinedIcon from "@mui/icons-material/ContentPasteSearchOutlined";
import { interface_userInfo } from "../types/user";
import spellJson from "../assets/spell.json";
import testJson from "../../matchinfo.json";

import { useDispatch, useSelector } from "react-redux";
import {
  getRecentMatchList,
  setDefaultInfo,
  setRankInfo,
  setStatus,
  getMatchInfo,
} from "../store/user";

import champ from "../assets/champion.json";
import { RootState } from "../store";
import { fstat } from "original-fs";

// let if_userInfo = interface_userInfo;

const Nav = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #1a1a1a;
  opacity: 90%;
  height: 100%;
  box-sizing: border-box;
`;

const Items = styled.div`
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  height: 75px;
`;
const Item = styled.span`
  width: 100%;
  height: 100%;
  display: inline-block;
  cursor: pointer;
  font-weight: 700;
  color: #ff7f00;
  text-align: center;
  line-height: 70px;
`;
const Sidenav = () => {
  const [clientConnect, setclientConnect] = useState(false);
  const count: any = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const saved: any = localStorage.getItem("status");
  //   // const s = JSON.parse(localStorage.getItem("user") || "");
  //   // dispatch(setDefaultInfo(s));
  //   // console.log("ee");
  //   if (saved !== null) {
  //     setclientConnect(saved);
  //   }
  // }, [clientConnect]);

  window.api.receive("clientConnect", (e, ...data) => {
    console.log(`Received from main process`);
    localStorage.setItem("status", "true");
    localStorage.setItem("user", JSON.stringify(data[0]));
    localStorage.setItem("rank", JSON.stringify(data[1].queueMap));
    dispatch(setStatus(true));
    dispatch(setDefaultInfo(data[0]));
    dispatch(setRankInfo(data[1]));
    dispatch(getRecentMatchList(data[2]));

    setclientConnect(true);
    window.api.removeAllListeners("clientConnect");
    // console.log(data);
  });
  if (clientConnect) {
    let data = JSON.parse(localStorage.getItem("status") || "");
    console.log(data);
    console.log(Object.keys(data));
  }

  const onClick = async () => {
    console.log("test");
    window.api.invoke("fromTest", "eee");
    console.log("render to send");
  };

  // 챔프 id를 이름으로
  // const changeChampId = () => {
  //   let champions = new Array();
  //   let key = new Array();

  //   let aa = JSON.stringify(champ.data);
  //   let json = JSON.parse(aa);

  //   for (let k of Object.values(json)) {
  //     champions.push(k.id);
  //     key.push(k.key);
  //   }
  //   let ids: any = {};
  //   for (let i = 0; i < champions.length; i++) {
  //     ids[key[i]] = champions[i];
  //   }

  //   window.api.invoke("saveFile", ids);
  // };

  const test = () => {
    const data = count.recentMatchList.games.games;
    window.api.invoke("getMatchInfo", data);
  };

  window.api.receive("giveMatchInfo", (e, data) => {
    console.log(`Received MatchInfo from main process`);
    dispatch(getMatchInfo(data));
  });
  window.api.receive("test", (e, ...data) => {
    console.log(`Received from main process`);
    // window.api.removeAllListeners("test");
    // localStorage.setItem("data", JSON.stringify(data[0]));

    console.log(data);
    // console.log("eee");
  });
  console.log(clientConnect);

  return (
    <Nav>
      <Items>
        <Link to={clientConnect ? "/info" : "/"}>
          <Item>
            <PermIdentityOutlinedIcon />
            My Info
          </Item>
        </Link>
      </Items>
      <Items>
        <Link to="/">
          <Item>
            <PersonSearchOutlinedIcon />
            전적 검색
          </Item>
        </Link>
      </Items>
      <Items>
        <Link to={clientConnect ? "/info" : "/"}>
          <Item>
            <PersonSearchOutlinedIcon />
            사설 검색
          </Item>
        </Link>
      </Items>
      <Items onClick={count.toggle ? onClick : undefined}>
        <Item>
          <PersonSearchOutlinedIcon />
          20게임 매치리스트
        </Item>
      </Items>
      <Items onClick={count.toggle ? test : undefined}>
        <Item>
          <PersonSearchOutlinedIcon />
          개별 게임데이터불러오기
        </Item>
      </Items>
    </Nav>
  );
};

export default Sidenav;
