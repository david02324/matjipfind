import * as React from "react";
import { Result } from "../utils/mapUtils";

export interface IResultBoxProps {
  result: Result;
}

export default function ResultBox({ result }: IResultBoxProps) {
  const style: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "50px",
    width: "280px",
    backgroundColor: "whitesmoke",
    cursor: "pointer",
    borderTop: "1px solid gray",
    borderBottom: "1px solid gray",
  };

  return (
    <div style={style}>
      <span>{result.place_name}</span>
      <span>{result.phone}</span>
    </div>
  );
}
