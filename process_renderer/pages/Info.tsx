import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

import spellJson from "../assets/spell.json";
import testJson from "../../matchinfo.json";

import { useDispatch, useSelector } from "react-redux";
import { setDefaultInfo, setRankInfo, setStatus } from "../store/user";
import { RootState } from "../store";
import { store } from "../../process_renderer/store/store";

import { rank_type, rank_interface } from "../types/rank";
import {
  interface_userInfo,
  userInfo_type,
  userInfo_type_class,
} from "../types/user";
import { useRef } from "react";

import { RANK_EMBLEM } from "../../consts/consts";

import Icons from "../components/Icons";
import Piechart from "../components/Chart";
import Match from "../components/Match";
import MatchDetail from "../components/MatchDetail";

const Container = styled.div`
  width: inherit;
  box-sizing: border-box;
  display: flex;
  background-color: black;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Page = styled.div`
  width: 100%;
  height: inherit;
  box-sizing: border-box;
  display: flex;
  /* background-color: black; */
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Wrap = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: inherit;
`;
const UserSection = styled.section`
  display: flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  background-color: greenyellow;
  width: 100%;
  height: 250px;
`;
const MoreInfo = styled.section`
  display: flex;
  box-sizing: border-box;
  background-color: orange;
  margin-right: 33px;
  width: 245px;
  height: 371px;
`;
const MathList = styled.section`
  display: flex;
  box-sizing: border-box;
  /* background-color: orange; */
  flex-direction: column;
  /* width: 100%; */
  /* height: 100%; */
`;
const Text = styled.span`
  font-weight: 700;
  display: inline-block;
  color: white;
  font-size: 20px;
`;

const Info = () => {
  // let userInfo = useRef();
  // let rankSolo = useRef();
  // let rankFlex = useRef();

  const [userInfo, setUserInfo] = useState<userInfo_type>(interface_userInfo);
  const [rankSolo, setRankSolo] = useState<rank_type>(rank_interface);
  const [rankFlex, setRankFlex] = useState<rank_type>(rank_interface);
  const dispatch = useDispatch();
  const user: any = useSelector((state: RootState) => state.user);

  useEffect(() => {
    setUserInfo(user.userInfo);
    setRankSolo(user.rank.queueMap.RANKED_SOLO_5x5);
    setRankFlex(user.rank.queueMap.RANKED_FLEX_SR);
    console.log("Info_useEffect");
  }, []);
  const summoner = JSON.parse(JSON.stringify(spellJson));
  console.log(store.getState());

  const matchHistory = user.recentMatchList.games.games.map(
    (matchResult: any, num: number) => {
      return (
        <div key={matchResult.gameId}>
          <Match matchResult={matchResult} num={num} />
        </div>
      );
    }
  );

  return (
    <Container>
      <Page>
        <Wrap>
          <UserSection>
            <Icons
              src={`https://ddragon.leagueoflegends.com/cdn/${
                import.meta.env.VITE_APP_LOL_VERSION
              }/img/profileicon/${userInfo.profileIconId}.png`}
              size="small"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "15px",
              }}
            >
              <Text>{userInfo.displayName}</Text>
              <Text>LV : {userInfo.summonerLevel}</Text>
            </div>
            <Icons
              src={`process_renderer/assets/ranked-emblem/${rankSolo.tier}.png`}
              size="rank"
              onError={(event) => (event.currentTarget.style.display = "none")}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "15px",
                marginRight: "10px",
              }}
            >
              <Text
                style={{
                  paddingBottom: "12px",
                  fontSize: "18px",
                  textAlign: "center",
                }}
              >
                {rankSolo.wins + rankSolo.losses}전 {rankSolo.wins}승{" "}
                {rankSolo.losses}패
              </Text>
              <Piechart win={rankSolo.wins} lose={rankSolo.losses} />
              <Text
                style={{
                  paddingTop: "12px",
                  fontSize: "18px",
                  textAlign: "center",
                }}
              >
                승률 {(rankSolo.wins / (rankSolo.wins + rankSolo.losses)) * 100}
                %
              </Text>
            </div>

            <Icons
              src={`process_renderer/assets/ranked-emblem/${rankFlex.tier}.png`}
              size="rank"
              onError={(event) => (event.currentTarget.style.display = "none")}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "15px",
              }}
            >
              <Text
                style={{
                  paddingBottom: "12px",
                  fontSize: "18px",
                  textAlign: "center",
                }}
              >
                {rankFlex.wins + rankFlex.losses}전 {rankFlex.wins}승{" "}
                {rankFlex.losses}패
              </Text>
              <Piechart win={rankFlex.wins} lose={rankFlex.losses} />
              <Text
                style={{
                  paddingTop: "12px",
                  fontSize: "18px",
                  textAlign: "center",
                }}
              >
                승률{" "}
                {Math.floor(
                  (rankFlex.wins / (rankFlex.wins + rankFlex.losses)) * 100
                )}
                %
              </Text>
            </div>
          </UserSection>
          <div
            style={{
              display: "flex",
              marginTop: "38px",
              marginLeft: " 35px",
              marginRight: " 35px",
            }}
          >
            <MoreInfo></MoreInfo>
            <MathList>{matchHistory}</MathList>
          </div>
        </Wrap>
      </Page>
    </Container>
  );
};

export default Info;
