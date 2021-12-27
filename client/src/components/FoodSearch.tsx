import * as React from "react";
import {
  ToastsContainer,
  ToastsContainerPosition,
  ToastsStore,
} from "react-toasts";
import { keywordSearch } from "../utils/mapUtils";
import Button from "./Button";
import InputBox from "./InputBox";
import { ResultSet, STEP } from "./SideBar";
import Slider from "./Silder";

export interface IFoodSearchProps {
  setStep: (step: STEP) => void;
  setResultsSet: (resultSet: ResultSet) => void;
}

export default function FoodSearch({
  setStep,
  setResultsSet,
}: IFoodSearchProps) {
  const [rangeValue, setRangeValue] = React.useState(50);

  const style: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
  };

  const keywordSearchClickHanlder = (userInput: string) => {
    keywordSearch(userInput, rangeValue, (errMsg, results, pagination) => {
      if (results) {
        setResultsSet({ results, pagination });
        setStep(STEP.RESULT);
      } else if (errMsg) {
        ToastsStore.error(errMsg);
      }
    });
  };

  return (
    <div style={style}>
      <Slider setRangeValue={setRangeValue} />
      <InputBox
        width={220}
        type={2}
        placeHolder="먹을 음식"
        imgBtnOnClick={keywordSearchClickHanlder}
      />
      혹은
      <Button width={220} text="아무거나!" onClick={() => {}} />
      <ToastsContainer
        position={ToastsContainerPosition.TOP_CENTER}
        store={ToastsStore}
        lightBackground
      />
    </div>
  );
}
