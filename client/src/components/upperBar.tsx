import * as React from "react";

export interface IUpperBarProps {
  text: string;
  setStep: VoidFunction;
}

export default function UpperBar({ text, setStep }: IUpperBarProps) {
  const style: React.CSSProperties = {
    cursor: "pointer",
    height: "50px",
    width: "100%",
    borderBottom: "1px solid gray",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={style} onClick={setStep}>
      {text}
    </div>
  );
}
