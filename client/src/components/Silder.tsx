import * as React from "react";
import { Range } from "react-range";

interface ISilderProps {
  setRangeValue: (value: number) => void;
}

export default function Slider({ setRangeValue }: ISilderProps) {
  const [values, setValues] = React.useState<number[]>([50]);

  return (
    <>
      최대 {values[0]}M 이내
      <Range
        step={50}
        min={50}
        max={2000}
        values={values}
        onChange={(values) => {
          setValues(values);
          setRangeValue(values[0]);
        }}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "6px",
              width: "100%",
              backgroundColor: "#ccc",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "15px",
              width: "15px",
              backgroundColor: "black",
              borderRadius: "3px",
            }}
          />
        )}
      />
    </>
  );
}
