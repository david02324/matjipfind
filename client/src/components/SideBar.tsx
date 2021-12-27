import * as React from "react";
import { Pagination, Result } from "../utils/mapUtils";
import FoodSearch from "./FoodSearch";
import PosSearch from "./PosSearch";
import SearchResults from "./SearchResults";
import UpperBar from "./upperBar";

export enum STEP {
  POSITION,
  FOOD,
  RESULT,
}

export interface ResultSet {
  results: Result[];
  pagination: Pagination;
}

const SideBar: React.VoidFunctionComponent = () => {
  const [step, setStep] = React.useState<STEP>(STEP.POSITION);
  const [resultSet, setResultSet] = React.useState<ResultSet | null>(null);

  const style: React.CSSProperties = {
    position: "relative",
    borderRadius: "0 10px 10px 0",
    borderLeft: "2px solid gray",
    width: "280px",
    height: "720px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  };

  switch (step) {
    case STEP.POSITION:
      return (
        <div style={style}>
          <PosSearch setStep={setStep} />
        </div>
      );
    case STEP.FOOD:
      return (
        <div style={style}>
          <UpperBar
            text="<< 위치선택"
            setStep={() => {
              setStep(STEP.POSITION);
            }}
          />
          <FoodSearch setStep={setStep} setResultsSet={setResultSet} />
        </div>
      );
    case STEP.RESULT:
      return (
        <div style={style}>
          <UpperBar
            text="<< 위치선택"
            setStep={() => {
              setStep(STEP.POSITION);
            }}
          />
          <UpperBar
            text="<< 음식선택"
            setStep={() => {
              setStep(STEP.FOOD);
            }}
          />
          <SearchResults resultSet={resultSet!} />
        </div>
      );
  }
};

export default SideBar;
