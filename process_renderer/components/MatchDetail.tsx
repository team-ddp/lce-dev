import React from "react";
import styled, { css } from "styled-components";
import idtoChamp from "../assets/idToChamp.json";
import spellJson from "../assets/spell.json";
import { getMatchDetail } from "../store/user";
import ToolTip from "./ToolTip";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useAsyncValue } from "react-router-dom";

interface BoxProps extends React.ComponentProps<"div"> {
  color?: string;
  size?: string;
}
interface BoxSizeProps {
  [index: string]: {
    height: string;
    width: string;
  };
}
const boxSizes: BoxSizeProps = {
  small: {
    height: "17px",
    width: "17px",
  },
  medium: {
    height: "30px",
    width: "30px",
  },
  large: {
    height: "30px",
    width: "30px",
  },
};

const BoxSizeStyles = css`
  ${(props: BoxProps) => css`
    height: ${props.size && boxSizes[props.size].height};
    width: ${props.size && boxSizes[props.size].width};
  `}
`;
const Wrap = styled.div`
  width: 920px;
  height: 800px;
  margin-top: 20px;
  background-color: #2a2a2d;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OverallBox = styled.div`
  width: 900px;
  height: 40px;
  background-color: #fff;
`;
const TeamOverallBox = styled.div`
  width: 900px;
  height: 225px;
  border-radius: 10px;
  margin-bottom: 20px;
  background-color: black;
  margin-top: 10px;
`;

const OverallInfoWrap = styled.div`
  width: 900px;
  display: flex;
  height: 25px;
  /* grid-template-rows: 25px 40px 40px 40px 40px 40px;
  grid-template-columns: 97px 113px 100px 120px 120px 110px 60px 170px; */
  align-items: center;
  justify-content: center;
`;

const TeamMateBox = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  background-color: rgba(12, 28, 61, 0.6);
`;
const GridContainerWrap = styled.div`
  display: grid;
  grid-template-columns: 97px 123px 100px 120px 120px 110px 60px 170px;
`;

const Champimg = styled.div`
  border-radius: 100%;
  width: 35px;
  height: 35px;
  overflow: hidden;
`;
const ComponentWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Img = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;
const Box = styled.div`
  ${BoxSizeStyles};
  background-color: gray;
  /* border: 1px solid gray; */
  margin-right: 3px;
  border-radius: 5px;
  box-sizing: border-box;
  overflow: hidden;
`;

const Text = styled.span`
  font-weight: 500;
  display: inline-block;
  color: white;
  font-size: 15px;
  text-align: center;
`;

const champId = JSON.parse(JSON.stringify(idtoChamp));
const summoner = JSON.parse(JSON.stringify(spellJson));

const itemBox = (data: any, num: any) => {
  const matchData = [];
  for (let i = 0; i < 7; i++) {
    let isHover = true;
    if (data.participants[num].stats[`item${i}`] == 0) {
      isHover = false;
    }
    matchData.push(
      <div
        style={{
          position: "relative",
        }}
      >
        <ToolTip
          itemCode={data.participants[num].stats[`item${i}`]}
          isHover={isHover}
          key={data.participants[num].stats[`item${i}`]}
        >
          <Box size="small">
            <Img
              src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/item/${
                data.participants[num].stats[`item${i}`]
              }.png`}
              onError={(event) => (event.currentTarget.style.display = "none")}
              key={data.participants[num].stats[`item${i}`]}
            />
          </Box>
        </ToolTip>
      </div>
    );
  }
  return matchData;
};

const playerInfo = (matchResult: any, num: number) => {
  const matchData = [];
  for (let i = num; i < 5 + num; i++) {
    matchData.push(
      <TeamMateBox>
        <GridContainerWrap>
          <ComponentWrap>
            <Champimg>
              <Img
                src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/${
                  champId[matchResult.participants[i].championId]
                }.png`}
              />
              <Text>18</Text>
            </Champimg>
            {/* 룬 정보 */}
            <ComponentWrap
              style={{
                flexDirection: "column",
                justifyContent: "center",
                paddingLeft: "5px",
              }}
            >
              <Box size="small">
                <Img
                  src={`https://ddragon.leagueoflegends.com/cdn/13.8.1/img/spell/${
                    summoner.spell[matchResult.participants[i].spell1Id]
                  }.png`}
                />
              </Box>
              <Box size="small">
                <Img
                  src={`https://ddragon.leagueoflegends.com/cdn/13.8.1/img/spell/${
                    summoner.spell[matchResult.participants[i].spell2Id]
                  }.png`}
                />
              </Box>
            </ComponentWrap>
          </ComponentWrap>
          <ComponentWrap>
            <Text>
              {matchResult.participantIdentities[i].player.summonerName}
            </Text>
          </ComponentWrap>
          {/* KDA */}
          <ComponentWrap>
            <Text>
              {matchResult.participants[i].stats.kills} /{" "}
              {matchResult.participants[i].stats.deaths} /{" "}
              {matchResult.participants[i].stats.assists}
            </Text>
          </ComponentWrap>
          {/* 가한 피해량 */}
          <ComponentWrap>
            <Text>
              {matchResult.participants[i].stats.totalDamageDealtToChampions}
            </Text>
          </ComponentWrap>
          {/* 입은 피해량 */}
          <ComponentWrap>
            <Text>{matchResult.participants[i].stats.totalDamageTaken}</Text>
          </ComponentWrap>
          {/* 와드 */}
          <ComponentWrap>
            <Text>
              {matchResult.participants[i].stats.visionWardsBoughtInGame} /{" "}
              {matchResult.participants[i].stats.wardsKilled} /{" "}
              {matchResult.participants[i].stats.wardsPlaced}
            </Text>
          </ComponentWrap>
          {/*  CS */}
          <ComponentWrap>
            <Text>{matchResult.participants[i].stats.totalMinionsKilled}</Text>
          </ComponentWrap>
          {/*  아이템 정보 */}
          <ComponentWrap>{itemBox(matchResult, i)}</ComponentWrap>
        </GridContainerWrap>
      </TeamMateBox>
    );
  }
  return matchData;
};

const MatchDetail = ({ gameId }: any) => {
  const [matchResultState, setMatchResultState] = React.useState("");
  const [showMatchResultState, setShowMatchResultState] = React.useState(false);
  const detail = (gameId: any) => {
    window.api.invoke("getMatchDetail", gameId).then((data: any) => {
      console.log("asdfasdfasdf");
      setMatchResultState(data);
      setShowMatchResultState(true);
    });
    return showMatchResultState;
  };
  return (
    <Wrap>
      <OverallBox></OverallBox>
      <TeamOverallBox>
        <OverallInfoWrap>
          <GridContainerWrap>
            <Text>승리여부</Text>
            <Text style={{ justifyContent: "start" }}>블루팀</Text>
            <Text>KDA</Text>
            <Text>가한 피해량</Text>
            <Text>입은 피해량</Text>
            <Text>와드</Text>
            <Text>cs</Text>
            <Text>아이템</Text>
          </GridContainerWrap>
        </OverallInfoWrap>
        {showMatchResultState
          ? playerInfo(matchResultState, 0)
          : detail(gameId)}
      </TeamOverallBox>
      <TeamOverallBox>
        <OverallInfoWrap>
          <GridContainerWrap>
            <Text>승리여부</Text>
            <Text style={{ justifyContent: "start" }}>레드팀</Text>
            <Text>KDA</Text>
            <Text>가한 피해량</Text>
            <Text>입은 피해량</Text>
            <Text>와드</Text>
            <Text>cs</Text>
            <Text>아이템</Text>
          </GridContainerWrap>
        </OverallInfoWrap>
        {showMatchResultState
          ? playerInfo(matchResultState, 5)
          : detail(gameId)}
      </TeamOverallBox>
    </Wrap>
  );
};

export default MatchDetail;
