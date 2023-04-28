import React, { Children } from "react";
import styled, { css } from "styled-components";
import spellJson from "../assets/spell.json";
import idtoChamp from "../assets/idToChamp.json";

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

interface SizeProps {
  [index: string]: {
    height: string;
    width: string;
  };
}

const Wrap = styled.div`
  height: 150px;
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
  width: 20px;
  height: 150px;
  background-color: red;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const Champimg = styled.div`
  border-radius: 100%;
  width: 123px;
  height: 123px;
  /* background-color: white; */
  margin-right: 22px;
  margin-left: 26px;
  overflow: hidden;
`;

const Text = styled.span`
  font-weight: 500;
  display: inline-block;
  color: white;
  font-size: 18px;
  line-height: 25px;
`;

const sizes: SizeProps = {
  small: {
    height: "40px",
    width: "40px",
  },
  medium: {
    height: "68px",
    width: "68px",
  },
  large: {
    height: "30px",
    width: "30px",
  },
};

const sizeStyles = css`
  ${(props: BoxProps) => css`
    height: ${props.size && sizes[props.size].height};
    width: ${props.size && sizes[props.size].width};
  `}
`;

const Box = styled.div`
  ${sizeStyles};
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

const summoner = JSON.parse(JSON.stringify(spellJson));
const champId = JSON.parse(JSON.stringify(idtoChamp));
const Match = ({ matchResult, num }: MatchProps) => {
  return (
    <Wrap>
      <ResultLine />
      <Champimg>
        <Img
          src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/champion/${
            champId[matchResult.participants[0].championId]
          }.png`}
        />
      </Champimg>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "107px",
          width: "115px",
          marginLeft: "16px",
          boxSizing: "border-box",
        }}
      >
        <Text
          style={{
            fontSize: "22px",
            marginBottom: "12px",
          }}
        >
          패배
        </Text>
        <Text>자유랭크 게임</Text>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "9px",
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
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          // backgroundColor: "black",
          justifyContent: "center",
          width: "510px",
          marginLeft: "54px",
          marginTop: "4px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
          }}
        >
          <Box size="medium">
            <Img
              src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/item/${matchResult.participants[0].stats.item0}.png`}
            />
          </Box>
          <Box size="medium">
            <Img
              src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/item/${matchResult.participants[0].stats.item1}.png`}
            />
          </Box>
          <Box size="medium">
            <Img
              src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/item/${matchResult.participants[0].stats.item2}.png`}
            />
          </Box>
          <Box size="medium">
            <Img
              src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/item/${matchResult.participants[0].stats.item3}.png`}
            />
          </Box>
          <Box size="medium">
            <Img
              src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/item/${matchResult.participants[0].stats.item4}.png`}
            />
          </Box>
          <Box size="medium">
            <Img
              src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/item/${matchResult.participants[0].stats.item5}.png`}
            />
          </Box>
          <Box size="medium">
            <Img
              src={`http://ddragon.leagueoflegends.com/cdn/13.8.1/img/item/${matchResult.participants[0].stats.item6}.png`}
            />
          </Box>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "14px",
          }}
        >
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
              }}
            >
              <Text>14 / 5 / 19</Text>
              <Text>2.00 : 1 평점</Text>
            </ComponentWrap>
            <ComponentWrap
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "35px",
              }}
            >
              <Text>CS 140 (8.3)</Text>
            </ComponentWrap>
            <ComponentWrap
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "150px",
              }}
            >
              <Text>24분 30초</Text>
              <Text>2023 / 03 / 30</Text>
            </ComponentWrap>
          </ComponentWrap>
        </div>
      </div>
    </Wrap>
  );
};

const defaultProps = {
  size: "medium",
};
Match.defaultProps = defaultProps;

export default Match;
