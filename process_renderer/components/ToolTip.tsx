import React, { useRef } from "react";
import styled, { css } from "styled-components";
import item from "../assets/item.json";

interface itemId {
  itemCode: any;
  children: React.ReactNode;
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
  /* left: -50%; */
  width: max-content;
  max-width: 348px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  display: none;
  border-radius: 8px;
  ${Wrap}:hover & {
    display: block;
  }
`;
const Text = styled.span`
  font-weight: 500;
  font-size: 14px;
  display: inline-block;
  color: white;
`;

const itemJson = JSON.parse(JSON.stringify(item));

const ToolTip = ({ children, itemCode }: itemId) => {
  return (
    <Wrap>
      {children}
      <ToolTipWrap>
        <Text>{itemJson.data[itemCode].name}</Text>
        <br />
        <Text
          dangerouslySetInnerHTML={{
            __html: itemJson.data[itemCode].description,
          }}
        />
        <Arrow />
      </ToolTipWrap>
    </Wrap>
  );
};

export default ToolTip;
