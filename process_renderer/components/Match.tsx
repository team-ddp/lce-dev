import React, { Children, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import spellJson from "../assets/spell.json";
import idtoChamp from "../assets/idToChamp.json";
import gameType from "../assets/matchType.json";
import ToolTip from "./ToolTip";
import detail from "../assets/matchInfo/6488380954.json";
import MatchDetail from "./MatchDetail";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { useDispatch, useSelector } from "react-redux";
import { getMatchDetail } from "../store/user";
// import matchJson from "../assets/matchInfo"

interface BoxProps extends React.ComponentProps<"div"> {
  color?: string;
  size?: string;
}

interface ImgProps extends React.ComponentProps<"img"> {
  src: string;
  children?: React.ReactNode;
  size?: string;
}

interface MatchProps extends React.ComponentProps<"div"> {
  matchResult?: any;
  num?: number;
  children?: React.ReactNode;
}

interface BoxSizeProps {
  [index: string]: {
    height: string;
    width: string;
  };
}
interface TextSizeProps {
  [index: string]: {
    font: string;
  };
}

const boxSizes: BoxSizeProps = {
  small: {
    height: "25px",
    width: "25px",
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
const TextSizes: TextSizeProps = {
  small: {
    font: "12px",
  },
  medium: {
    font: "16px",
  },
  large: {
    font: "30px",
  },
};

const BoxSizeStyles = css`
  ${(props: BoxProps) => css`
    height: ${props.size && boxSizes[props.size].height};
    width: ${props.size && boxSizes[props.size].width};
  `}
`;
const TextSizeStyles = css`
  ${(props: BoxProps) => css`
    font-size: ${props.size && TextSizes[props.size].font};
  `}
`;

const Wrap = styled.div`
  width: 920px;
  border-radius: 10px;
  margin-bottom: 30px;
`;
const MatchWrap = styled.div`
  height: 130px;
  width: 920px;
  background-color: #2a2a2d;
  display: flex;
  align-items: center;
  border-radius: 10px;
  margin-bottom: 18px;
`;
const ComponentWrap = styled.div`
  display: flex;
`;
const ResultLine = styled.div`
  width: 10px;
  height: 130px;
  /* background-color: aqua; */
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const Champimg = styled.div`
  border-radius: 100%;
  width: 70px;
  height: 70px;
  /* background-color: white; */
  /* margin-right: 22px;
  margin-left: 26px; */
  overflow: hidden;
`;

const Text = styled.span`
  ${TextSizeStyles};
  font-weight: 500;
  display: inline-block;
  color: white;
  line-height: 25px;
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

const Img = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 5px;
`;
const MoreInfo = styled.button`
  cursor: pointer;
  width: 40px;
  height: 130px;
  background-color: gray;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const MatchDetailWrap = styled.div<{ showMatchResultState: boolean }>`
  ${(props) => wrapSlide(props.showMatchResultState)}
`;
const wrapSlide = (showMatchResultState: boolean) => css`
  animation: ${showMatchResultState ? slideUp : slideDown} 0.6s linear;
`;
const slideDown = keyframes`
0%{
  opacity: 0;
  height: 0px;
}
25%{
  opacity: 0.25;
  height: 100px;
}
50%{
  opacity: 0.5;
  height: 300px;
}
70%{
  opacity: 0.75;
  height: 500px;
}
100%{
  opacity: 1;
  height: 600px;
}
`;
const slideUp = keyframes`
0%{
  opacity: 1;
  height: 600px;
}
25%{
  opacity: 0.75;
  height: 500px;
}
50%{
  opacity: 0.5;
  height: 300px;
}
70%{
  opacity: 0.25;
  height: 100px;
}
100%{
  opacity: 0;
  height: 0px;
}
`;

const itemBox = (data: any) => {
  const matchData = [];
  for (let i = 0; i < 7; i++) {
    let isHover = true;

    if (data.participants[0].stats[`item${i}`] === 0) {
      isHover = false;
    }
    isHover
      ? matchData.push(
          <div
            style={{
              position: "relative",
            }}
            key={data.participants[0].stats[`item${i}`]}
          >
            <ToolTip
              itemCode={data.participants[0].stats[`item${i}`]}
              isHover={isHover}
            >
              <Box size="medium">
                <Img
                  src={`http://ddragon.leagueoflegends.com/cdn/${
                    import.meta.env.VITE_APP_LOL_VERSION
                  }/img/item/${data.participants[0].stats[`item${i}`]}.png`}
                  onError={(event) =>
                    (event.currentTarget.style.display = "none")
                  }
                />
              </Box>
            </ToolTip>
          </div>
        )
      : matchData.push(
          <div
            style={{
              position: "relative",
            }}
            key={data.participants[0].stats[`item${i}`]}
          >
            <Box size="medium"></Box>
          </div>
        );
  }
  return matchData;
};

const playerBox = (data: any, num: number) => {
  const matchData = [];
  for (let i = num; i < 5 + num; i++) {
    matchData.push(
      <div
        style={{
          position: "relative",
        }}
        key={data.participantIdentities[i].player.summonerName}
      >
        <ComponentWrap>
          <Champimg
            style={{
              width: "20px",
              height: "20px",
              marginRight: "5px",
            }}
          >
            <Img
              src={`http://ddragon.leagueoflegends.com/cdn/${
                import.meta.env.VITE_APP_LOL_VERSION
              }/img/champion/${champId[data.participants[i].championId]}.png`}
            />
          </Champimg>
          <Text size="small">
            {data.participantIdentities[i].player.summonerName}
          </Text>
        </ComponentWrap>
      </div>
    );
  }
  return matchData;
};
const summoner = JSON.parse(JSON.stringify(spellJson));
const champId = JSON.parse(JSON.stringify(idtoChamp));
const matchType = JSON.parse(JSON.stringify(gameType));
const Match = ({ matchResult, num }: MatchProps) => {
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const startTime = new Date(matchResult.gameCreation);
  // const durationTime = matchResult.gameDuration;
  // const dispatch = useDispatch();

  const dropDownDetail = (gameId: any) => {
    setDropdownVisibility(!dropdownVisibility);
    if (!dropdownVisibility) {
      // window.api.invoke("getMatchDetail", gameId).then((data: any) => {
      //   console.log("asdf");
      //   dispatch(getMatchDetail(data));
      // });
      console.log(dropdownVisibility);
      // window.api.removeAllListeners("getMatchDetail");
    }
    console.log("드롭다운 " + dropdownVisibility);
  };
  return (
    <Wrap>
      <MatchWrap>
        <ResultLine
          style={{
            backgroundColor: matchResult.participants[0].stats.win
              ? "aqua"
              : "red",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "107px",
            width: "125px",
            paddingLeft: "16px",
            boxSizing: "border-box",
          }}
        >
          <Text
            size="medium"
            style={{
              color: matchResult.participants[0].stats.win ? "aqua" : "red",
            }}
          >
            {matchType[matchResult.queueId]}
          </Text>
          <Text
            size="small"
            style={{
              marginBottom: "15px",
            }}
          >
            {Math.floor(matchResult.gameDuration / 60)}분{" "}
            {matchResult.gameDuration % 60}초
          </Text>
          <Text
            size="medium"
            style={{
              color: matchResult.participants[0].stats.win ? "aqua" : "red",
            }}
          >
            {matchResult.participants[0].stats.win ? "승리" : "패배"}
          </Text>
          <Text size="small">
            {startTime.getFullYear().toString().slice(-4)}년{" "}
            {startTime.getMonth() + 1}월 {startTime.getDate()}일
          </Text>
        </div>

        {/* 개인 게임 정보 */}
        <ComponentWrap
          style={{
            flexDirection: "column",
            width: "240px",
          }}
        >
          <ComponentWrap
            style={{
              marginBottom: "10px",
            }}
          >
            {/* 챔프 이미지 */}
            <Champimg>
              <Img
                src={`http://ddragon.leagueoflegends.com/cdn/${
                  import.meta.env.VITE_APP_LOL_VERSION
                }/img/champion/${
                  champId[matchResult.participants[0].championId]
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
                  src={`https://ddragon.leagueoflegends.com/cdn/${
                    import.meta.env.VITE_APP_LOL_VERSION
                  }/img/spell/${
                    summoner.spell[matchResult.participants[0].spell1Id]
                  }.png`}
                />
              </Box>
              <Box size="small">
                <Img
                  src={`https://ddragon.leagueoflegends.com/cdn/${
                    import.meta.env.VITE_APP_LOL_VERSION
                  }/img/spell/${
                    summoner.spell[matchResult.participants[0].spell2Id]
                  }.png`}
                />
              </Box>
            </ComponentWrap>

            {/* KDA */}
            <ComponentWrap
              style={{
                justifyContent: "center",
              }}
            >
              <ComponentWrap
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: "10px",
                }}
              >
                <Text
                  size="medium"
                  style={{
                    width: "95px",
                    textAlign: "center",
                  }}
                >
                  {matchResult.participants[0].stats.kills} /{" "}
                  {matchResult.participants[0].stats.deaths} /{" "}
                  {matchResult.participants[0].stats.assists}
                </Text>
                <Text size="medium">
                  KDA{" "}
                  {Math.round(
                    ((matchResult.participants[0].stats.kills +
                      matchResult.participants[0].stats.assists) /
                      matchResult.participants[0].stats.deaths) *
                      10
                  ) / 10}
                </Text>
              </ComponentWrap>
            </ComponentWrap>
          </ComponentWrap>

          {/* 아이템 정보 */}
          <div
            style={{
              display: "flex",
            }}
          >
            {itemBox(matchResult)}
          </div>
        </ComponentWrap>

        {/* 추가정보 */}
        <ComponentWrap
          style={{
            flexDirection: "column",
            width: "155px",
          }}
        >
          <Text
            size="medium"
            style={{
              textAlign: "center",
            }}
          >
            CS {matchResult.participants[0].stats.totalMinionsKilled}
          </Text>
        </ComponentWrap>

        {/* 모든플레이어 정보 */}
        <ComponentWrap
          style={{
            width: "350px",
          }}
        >
          {/* 팀 1 */}
          <ComponentWrap
            style={{
              flexDirection: "column",
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            {playerBox(detail, 0)}
          </ComponentWrap>

          {/* 팀 2 */}
          <ComponentWrap
            style={{
              flexDirection: "column",
              marginLeft: "20px",
              marginRight: "20px",
            }}
          >
            {playerBox(detail, 5)}
          </ComponentWrap>
        </ComponentWrap>

        {/* 경기 상세 정보 */}
        <MoreInfo
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column-reverse",
            // paddingBottom: "25px",
            justifyContent: "center",
          }}
          onClick={() => dropDownDetail(matchResult.gameId)}
        >
          {dropdownVisibility ? (
            <KeyboardDoubleArrowUpIcon />
          ) : (
            <KeyboardDoubleArrowDownIcon />
          )}
        </MoreInfo>
      </MatchWrap>

      <MatchDetailWrap showMatchResultState={!dropdownVisibility}>
        {dropdownVisibility && <MatchDetail gameId={matchResult.gameId} />}
      </MatchDetailWrap>
    </Wrap>
  );
};

const defaultProps = {
  size: "medium",
};
Match.defaultProps = defaultProps;

export default Match;
