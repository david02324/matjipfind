import * as React from "react";

interface IContainerProps {}

const Container: React.FunctionComponent<IContainerProps> = (props) => {
  const style: React.CSSProperties = {
    width: "100%",
    height: "calc(100% - 100px)",
  };
  return <div style={style}></div>;
};

export default Container;
