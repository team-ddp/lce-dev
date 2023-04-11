import React from "react";
import styled, { css } from "styled-components";

interface BoxProps extends React.ComponentProps<"div"> {
  color?: string;
  size?: string;
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
`;

const ResultLine = styled.div`
  width: 20px;
  height: 150px;
  background-color: red;
`;

const Champimg = styled.div`
  border-radius: 100%;
  width: 123px;
  height: 123px;
  background-color: white;
  margin: 26px;
`;

const Text = styled.span`
  font-weight: 500;
  display: inline-block;
  color: white;
  font-size: 18px;
`;

const sizes: SizeProps = {
  medium: {
    height: "40px",
    width: "40px",
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
  background-color: white;
  border: 1px solid black;
  margin: 0.4px;
`;

const Match = ({}) => {
  return (
    <Wrap>
      <ResultLine />
      <Champimg />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "yellow",
        }}
      >
        <Text>패배</Text>
        <Text>자유랭크 게임</Text>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box size="medium" />
          <Box size="medium" />
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
