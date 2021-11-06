import * as React from "react";
import Logo from "./Logo";

interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = ({}: IHeaderProps) => {
  const style: React.CSSProperties = {
    width: "100%",
    height: "70px",
    backgroundColor: "black",
    display: "flex",
    alignItems: "center",
  };

  return (
    <>
      <div style={style}>
        <Logo />
      </div>
    </>
  );
};

export default Header;
