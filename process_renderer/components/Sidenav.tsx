import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, Navigate, useNavigate } from "react-router-dom";

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
  const user: any = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setStatus(false));
  }, []);

  window.api.receive("clientConnect", (e, data) => {
    dispatch(setStatus(data));
    setclientConnect(data);
  });

  const onClick = async () => {
    console.log("test");
    window.api.invoke("fromTest", "eee");
    console.log("render to send");
  };

  // // 챔프 id를 이름으로
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
  // changeChampId();

  const test = () => {
    // const data = count.recentMatchList.games.games;
    const data = "6529986300";
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

  const goToInfo = async () => {
    try {
      if (user.toggle) {
        const data = await window.api.invoke("getInfo");
        dispatch(setDefaultInfo(data[0]));
        dispatch(setRankInfo(data[1]));
        dispatch(getRecentMatchList(data[2]));
        dispatch(setStatus(data[3]));
        if (data[3]) {
          navigate("/info?first");
        }
      } else {
        navigate("/");
      }
    } catch {
      navigate("/");
    }
  };
  console.log("Sidenav 렌더링");
  return (
    <Nav>
      <Items onClick={goToInfo}>
        {/* <Link to={user.toggle ? goToInfo : "/"}> */}
        <Item>
          <PermIdentityOutlinedIcon />
          My Info
        </Item>
        {/* </Link> */}
      </Items>
      <Items>
        <Link to={user.toggle ? "/search" : "/"}>
          <Item>
            <PersonSearchOutlinedIcon />
            전적 검색
          </Item>
        </Link>
      </Items>
      <>
        <Link to={user.toggle ? "/info" : "/"}>
          <Item>
            <PersonSearchOutlinedIcon />
            사설 검색
          </Item>
        </Link>
      </>
      <Items onClick={user.toggle ? onClick : undefined}>
        <Item>
          <PersonSearchOutlinedIcon />
          20게임 매치리스트
        </Item>
      </Items>
      <Items onClick={user.toggle ? test : undefined}>
        <Item>
          <PersonSearchOutlinedIcon />
          개별 게임데이터불러오기
        </Item>
      </Items>
    </Nav>
  );
};

export default Sidenav;
