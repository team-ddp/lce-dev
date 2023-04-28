import React from "react";
import styled, { css } from "styled-components";

interface IconsProps extends React.ComponentProps<"img"> {
  src: string;
  children?: React.ReactNode;
  size?: string;
}

interface SizeProps {
  [index: string]: {
    height: string;
    width: string;
  };
}

const sizes: SizeProps = {
  rank: {
    height: "75px",
    width: "110px",
  },
  small: {
    height: "100px",
    width: "100px",
  },
  medium: {
    height: "200px",
    width: "200px",
  },
  large: {
    height: "270px",
    width: "270px",
  },
};

const sizeStyles = css`
  ${(props: IconsProps) => css`
    height: ${props.size && sizes[props.size].height};
    width: ${props.size && sizes[props.size].width};
  `}
`;
const Img = styled.img`
  ${sizeStyles}
`;

const Icons = ({ children, src, size }: IconsProps) => {
  return (
    <Img src={src} size={size}>
      {children}
    </Img>
  );
};

const defaultProps = {
  size: "medium",
};
Icons.defaultProps = defaultProps;

export default Icons;
