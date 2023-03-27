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
  medium: {
    height: "100px",
    width: "100px",
  },
  large: {
    height: "200px",
    width: "200px",
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
