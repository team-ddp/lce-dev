import React from "react";
import styled, { css } from "styled-components";

interface ButtonProps extends React.ComponentProps<"button"> {
  children: React.ReactNode;
  color?: string;
  size?: string;
  title?: string;
  bgcolor?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

interface SizeProps {
  [index: string]: {
    height: string;
    width: string;
  };
}

const sizes: SizeProps = {
  medium: {
    height: "20px",
    width: "20px",
  },
  large: {
    height: "30px",
    width: "30px",
  },
};

const sizeStyles = css`
  ${(props: ButtonProps) => css`
    height: ${props.size && sizes[props.size].height};
    width: ${props.size && sizes[props.size].width};
  `}
`;

const Btn = styled.button`
  -webkit-app-region: no-drag;
  cursor: pointer;
  padding: 0;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.color || "gray"};
  ${sizeStyles};
  background-color: ${(props) => props.bgcolor || "inherit"};
`;

const Button = ({ children, size, onClick, color, bgcolor }: ButtonProps) => {
  return (
    <Btn size={size} onClick={onClick} color={color} bgcolor={bgcolor}>
      {children}
    </Btn>
  );
};

const defaultProps = {
  size: "medium",
};
Button.defaultProps = defaultProps;

export default Button;
