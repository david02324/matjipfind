import * as React from "react";

interface IButtonProps {
  width: number;
  onClick?: VoidFunction;
}

const Button: React.FunctionComponent<IButtonProps> = ({
  width,
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
      내 위치 가져오기
    </button>
  );
};

export default Button;
