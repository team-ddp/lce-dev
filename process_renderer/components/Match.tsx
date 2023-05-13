import React, { Children } from "react";
import styled, { css } from "styled-components";
import spellJson from "../assets/spell.json";
import idtoChamp from "../assets/idToChamp.json";
import gameType from "../assets/matchType.json";
import ToolTip from "./ToolTip";
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
const MoreInfo = styled.div`
  width: 40px;
  height: 130px;
  background-color: gray;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
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

const itemHover = () => {
  console.log("itemInfo");
  return (
    <div>
      Hovering right meow!
      <span role="img" aria-label="cat">
        🐱
      </span>
    </div>
  );
};

const itemBox = (data: any) => {
  const matchData = [];
  for (let i = 0; i < 7; i++) {
    matchData.push(
      <div
        style={{
          position: "relative",
        }}
      >
        {/* <ToolTip itemCode={data.participants[0].stats[`item${i}`]} /> */}
        <ToolTip itemCode={data.participants[0].stats[`item${i}`]}>
          <Box size="medium" onMouseOver={itemHover}>
            <Img
              src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/item/${
                data.participants[0].stats[`item${i}`]
              }.png`}
              onError={(event) => (event.currentTarget.style.display = "none")}
              key={data.participants[0].stats[`item${i}`]}
            />
          </Box>
        </ToolTip>
      </div>
    );
  }
  return matchData;
};
const summoner = JSON.parse(JSON.stringify(spellJson));
const champId = JSON.parse(JSON.stringify(idtoChamp));
const matchType = JSON.parse(JSON.stringify(gameType));

const Match = ({ matchResult, num }: MatchProps) => {
  return (
    <Wrap>
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
          width: "115px",
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
          24분 30초
        </Text>
        <Text size="medium">
          {matchResult.participants[0].stats.win ? "승리" : "패배"}
        </Text>
        <Text size="small">2023 / 03 / 30</Text>
      </div>
      <ComponentWrap
        style={{
          flexDirection: "column",
          width: "250px",
        }}
      >
        <ComponentWrap
          style={{
            marginBottom: "10px",
          }}
        >
          <Champimg>
            <Img
              src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/${
                champId[matchResult.participants[0].championId]
              }.png`}
            />
          </Champimg>
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
                  summoner.spell[matchResult.participants[0].spell1Id]
                }.png`}
              />
            </Box>
            <Box size="small">
              <Img
                src={`https://ddragon.leagueoflegends.com/cdn/13.8.1/img/spell/${
                  summoner.spell[matchResult.participants[0].spell2Id]
                }.png`}
              />
            </Box>
          </ComponentWrap>
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
                marginLeft: "5px",
              }}
            >
              <Text size="medium">
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
            {/* <ComponentWrap
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "10px",
              }}
            >
              <Text size="medium">CS 140 (8.3)</Text>
            </ComponentWrap> */}
          </ComponentWrap>
        </ComponentWrap>
        <div
          style={{
            display: "flex",
          }}
        >
          {itemBox(matchResult)}
        </div>
      </ComponentWrap>

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

      <ComponentWrap
        style={{
          width: "350px",
        }}
      >
        <ComponentWrap
          style={{
            flexDirection: "column",
            marginLeft: "20px",
            marginRight: "20px",
          }}
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
                src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/${
                  champId[matchResult.participants[0].championId]
                }.png`}
              />
            </Champimg>
            <Text size="small">진똘끼</Text>
          </ComponentWrap>
          <ComponentWrap>
            <Champimg
              style={{
                width: "20px",
                height: "20px",
                marginRight: "5px",
              }}
            >
              <Img
                src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/${
                  champId[matchResult.participants[0].championId]
                }.png`}
              />
            </Champimg>
            <Text size="small">딱스하기젝좋다</Text>
          </ComponentWrap>

          <ComponentWrap>
            <Champimg
              style={{
                width: "20px",
                height: "20px",
                marginRight: "5px",
              }}
            >
              <Img
                src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/${
                  champId[matchResult.participants[0].championId]
                }.png`}
              />
            </Champimg>
            <Text size="small">오른왼쪽으로간다</Text>
          </ComponentWrap>
          <ComponentWrap>
            <Champimg
              style={{
                width: "20px",
                height: "20px",
                marginRight: "5px",
              }}
            >
              <Img
                src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/${
                  champId[matchResult.participants[0].championId]
                }.png`}
              />
            </Champimg>
            <Text size="small">황변발</Text>
          </ComponentWrap>
          <ComponentWrap>
            <Champimg
              style={{
                width: "20px",
                height: "20px",
                marginRight: "5px",
              }}
            >
              <Img
                src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/${
                  champId[matchResult.participants[0].championId]
                }.png`}
              />
            </Champimg>
            <Text size="small">그냥 하기나 해</Text>
          </ComponentWrap>
        </ComponentWrap>

        {/* 상댕팀 */}

        <ComponentWrap
          style={{
            flexDirection: "column",
            marginLeft: "20px",
            marginRight: "20px",
          }}
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
                src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/${
                  champId[matchResult.participants[0].championId]
                }.png`}
              />
            </Champimg>
            <Text size="small">진똘끼</Text>
          </ComponentWrap>
          <ComponentWrap>
            <Champimg
              style={{
                width: "20px",
                height: "20px",
                marginRight: "5px",
              }}
            >
              <Img
                src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/${
                  champId[matchResult.participants[0].championId]
                }.png`}
              />
            </Champimg>
            <Text size="small">딱스하기젝좋다</Text>
          </ComponentWrap>
          <ComponentWrap>
            <Champimg
              style={{
                width: "20px",
                height: "20px",
                marginRight: "5px",
              }}
            >
              <Img
                src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/${
                  champId[matchResult.participants[0].championId]
                }.png`}
              />
            </Champimg>
            <Text size="small">오른왼쪽으로간다</Text>
          </ComponentWrap>
          <ComponentWrap>
            <Champimg
              style={{
                width: "20px",
                height: "20px",
                marginRight: "5px",
              }}
            >
              <Img
                src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/${
                  champId[matchResult.participants[0].championId]
                }.png`}
              />
            </Champimg>
            <Text size="small">황변발</Text>
          </ComponentWrap>
          <ComponentWrap>
            <Champimg
              style={{
                width: "20px",
                height: "20px",
                marginRight: "5px",
              }}
            >
              <Img
                src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/${
                  champId[matchResult.participants[0].championId]
                }.png`}
              />
            </Champimg>
            <Text size="small">그냥 하기나 해</Text>
          </ComponentWrap>
        </ComponentWrap>
      </ComponentWrap>
      <MoreInfo />
    </Wrap>
  );
};

const defaultProps = {
  size: "medium",
};
Match.defaultProps = defaultProps;

export default Match;
