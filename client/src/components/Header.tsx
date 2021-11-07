import * as React from "react";
import LoginBox from "./LoginBox";
import Logo from "./Logo";

const Header: React.VoidFunctionComponent = () => {
  const style: React.CSSProperties = {
    width: "100%",
    height: "70px",
    backgroundColor: "black",
    display: "flex",
    alignItems: "center",
  };

  return (
    <header style={style}>
      <Logo />
      <LoginBox />
    </header>
  );
};

export default Header;
