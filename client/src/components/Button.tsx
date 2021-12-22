import * as React from "react";

interface IButtonProps {
  width: number;
  text?: string;
  onClick?: VoidFunction;
}

const Button: React.FunctionComponent<IButtonProps> = ({
  width,
  text,
  onClick = () => {},
}) => {
  const style: React.CSSProperties = {
    width: width,
    height: "50px",
    borderRadius: "10px",
    border: "1px solid black",
    margin: "10px 0",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontSize: "1rem",
  };
  return (
    <button style={style} onClick={onClick}>
      {text ?? ""}
    </button>
  );
};

export default Button;
