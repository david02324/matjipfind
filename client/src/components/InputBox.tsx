import * as React from "react";
import positionSearchBtn from "../resources/img/position_search_btn.png";
import searchBtn from "../resources/img/search_btn.png";

enum InputBoxType {
  NONE,
  POSITION,
  FOOD,
}

interface IInputBoxProps {
  width: number;
  type: InputBoxType;
  placeHolder?: string;
  imgBtnOnClick: (userInput: string) => void;
}

const InputBox: React.FunctionComponent<IInputBoxProps> = ({
  type,
  width,
  placeHolder,
  imgBtnOnClick,
}) => {
  let imageSrc = "";
  switch (type) {
    case InputBoxType.POSITION:
      imageSrc = positionSearchBtn;
      break;
    case InputBoxType.FOOD:
      imageSrc = searchBtn;
      break;
  }

  const [value, setValue] = React.useState("");

  const style: React.CSSProperties = {
    width: width,
    height: "50px",
    border: "1px solid black",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "10px 0",
  };

  const imgBtnStyle: React.CSSProperties = {
    height: "30px",
    cursor: "pointer",
  };

  const inputStyle: React.CSSProperties = {
    border: "none",
    outline: "none",
    fontSize: "1rem",
  };

  const imgBtnOnClickHandler = () => {
    imgBtnOnClick(value);
  };

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div style={style}>
      <input
        style={inputStyle}
        placeholder={placeHolder}
        onChange={inputOnChange}
      ></input>
      {type === InputBoxType.NONE ? (
        ""
      ) : (
        <img
          src={imageSrc}
          alt="검색 버튼"
          style={imgBtnStyle}
          onClick={imgBtnOnClickHandler}
        ></img>
      )}
    </div>
  );
};

export default InputBox;
