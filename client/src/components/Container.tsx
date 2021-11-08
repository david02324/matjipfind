import * as React from "react";
import MainContainer from "./MainContainer";

interface IContainerProps {}

const Container: React.FunctionComponent<IContainerProps> = (props) => {
  const style: React.CSSProperties = {
    width: "100%",
    height: "calc(100% - 100px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <div style={style}>
      <MainContainer />
    </div>
  );
};

export default Container;
