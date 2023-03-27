import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { setDefaultInfo, setRankInfo, setStatus } from "../store/user";
import { RootState } from "../store";

import { rank_type, rank_interface } from "../types/rank";
import {
  interface_userInfo,
  userInfo_type,
  userInfo_type_class,
} from "../types/user";
import { useRef } from "react";

import { RANK_EMBLEM } from "../../consts/consts";

import Icons from "../components/Icons";

const Container = styled.div`
  width: inherit;
  height: inherit;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Page = styled.div`
  width: 95%;
  height: 95%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: yellow;
  margin: 10px;
`;
const Wrap = styled.div`
  box-sizing: border-box;
  background-color: green;
`;
const UserSection = styled.section`
  display: flex;
  /* justify-content: center; */
  box-sizing: border-box;
  background-color: green;
  margin: 40px;
  width: 900px;
`;
const RankSection = styled.section`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  background-color: black;
  margin: 40px;
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
  console.log(user.userInfo);

  return (
    <Container>
      <Page>
        <Wrap>
          <UserSection>
            <Icons
              src={`https://ddragon.leagueoflegends.com/cdn/13.4.1/img/profileicon/${userInfo.profileIconId}.png`}
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
          </UserSection>
          <RankSection>
            {/* <Icons src={RANK_EMBLEM(rankSolo.tier.toLowerCase())}></Icons> */}
            <Icons
              src={`process_renderer/assets/ranked-emblem/${rankSolo.tier}.webp`}
              size="medium"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "15px",
              }}
            >
              <Text>승 {rankSolo.wins}</Text>
              <Text>패 {rankSolo.losses}</Text>
              <Text>
                승률 {(rankSolo.wins / (rankSolo.wins + rankSolo.losses)) * 100}
                %
              </Text>
            </div>

            <Icons
              src={`process_renderer/assets/ranked-emblem/${rankFlex.tier}.webp`}
              size="medium"
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "15px",
              }}
            >
              <Text>승 {rankFlex.wins}</Text>
              <Text>패 {rankFlex.losses}</Text>
              <Text>
                승률{" "}
                {Math.floor(
                  (rankFlex.wins / (rankFlex.wins + rankFlex.losses)) * 100
                )}
                %
              </Text>
            </div>
          </RankSection>
          {/* <img src="" /> */}
          {/* <LoadingText>{user.userInfo.displayName}</LoadingText>
          <LoadingText>{user.userInfo.summonerLevel}</LoadingText> */}
          <RankSection></RankSection>
          <Text>
            솔랭: {rankSolo.tier} {rankSolo.division}
          </Text>
          <Text>
            솔랭승률:{" "}
            {Math.floor(
              (rankSolo.wins / (rankSolo.wins + rankSolo.losses)) * 100
            )}
            %
          </Text>
          <Text>
            자랭: {rankFlex.tier} {rankFlex.division}
          </Text>
          <Text>
            자랭승률:{" "}
            {Math.floor(
              (rankFlex.wins / (rankFlex.wins + rankFlex.losses)) * 100
            )}
            %
          </Text>
        </Wrap>
      </Page>
    </Container>
  );
};

export default Info;
