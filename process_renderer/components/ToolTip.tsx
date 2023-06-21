import React, { useRef } from "react";
import styled, { css } from "styled-components";
import item from "../assets/item.json";

interface itemId {
  itemCode: any;
  children: React.ReactNode;
  isHover: boolean;
}

interface HoverProps extends React.ComponentProps<"div"> {
  hover: boolean;
}

const Wrap = styled.div`
  /* background-color: gray; */
  /* width: min-content; */
  /* opacity: 60%; */
  /* max-width: 350px; */
  /* min-width: 500px; */
  /* position: relative; */
  /* top: -60px; */
`;

const Arrow = styled.span`
  position: absolute;
  left: 5px;
  top: 100%;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 10px solid rgb(0, 0, 0, 0.9);
  z-index: 1;
`;
const ToolTipWrap = styled.div`
  background-color: rgb(0, 0, 0, 0.9);
  position: absolute;
  bottom: 130%;
  left: -348px;
  width: max-content;
  max-width: 348px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  display: none;
  border-radius: 8px;
  z-index: 1000;
  ${(props: HoverProps) =>
    props.hover &&
    css`
      ${Wrap}: hover && {
        display: block;
      }
    `}
`;
const Text = styled.span`
  font-weight: 500;
  font-size: 14px;
  display: inline-block;
  color: white;
`;

const Stats = styled.span`
  color: blue;
`;

const itemDes = (data: string[]) => {
  return data.map((el: string) => {
    return (
      // <Text>{el}</Text>
      <Text
        dangerouslySetInnerHTML={{
          __html: el,
        }}
      />
    );
  });
};

const itemJson = JSON.parse(JSON.stringify(item));

const ToolTip = ({ children, itemCode, isHover }: itemId) => {
  const des = itemJson.data[itemCode].description.split("</stats>");

  return (
    <Wrap>
      {children}
      <ToolTipWrap hover={isHover}>
        <Text style={{ color: "gold" }}>{itemJson.data[itemCode].name}</Text>
        <br />
        <br />
        {itemDes(des)}
        <br />
        <br />
        <Text style={{ color: "gold" }}>
          {itemJson.data[itemCode].gold.total}골드
        </Text>
        <Arrow />
      </ToolTipWrap>
    </Wrap>
  );
};

export default ToolTip;
