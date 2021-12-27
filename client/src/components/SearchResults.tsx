import * as React from "react";
import ResultBox from "./ResultBox";
import { ResultSet } from "./SideBar";

export interface ISearchResultsProps {
  resultSet: ResultSet;
}

export default function SearchResults({ resultSet }: ISearchResultsProps) {
  const style: React.CSSProperties = {
    display: "flex",
    gap: "5px",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const paginationControllerStyle: React.CSSProperties = {
    display: "flex",
    gap: "20px",
    height: "35px",
    fontSize: "1.5rem",
    position: "absolute",
    bottom: "0px",
  };

  const pageBtnStyle: React.CSSProperties = {
    cursor: "pointer",
  };

  return (
    <>
      <div style={style}>
        <h3>검색 결과 {resultSet.pagination.totalCount}개</h3>
        {resultSet.results.map((result) => (
          <ResultBox key={result.id} result={result} />
        ))}
      </div>
      <div style={paginationControllerStyle}>
        <span
          style={pageBtnStyle}
          onClick={() => resultSet.pagination.gotoFirst()}
        >
          &lt;&lt;
        </span>
        <span
          style={pageBtnStyle}
          onClick={() => resultSet.pagination.prevPage()}
        >
          &lt;
        </span>
        <span>
          {resultSet.pagination.current} / {resultSet.pagination.last}
        </span>
        <span
          style={pageBtnStyle}
          onClick={() => resultSet.pagination.nextPage()}
        >
          &gt;
        </span>
        <span
          style={pageBtnStyle}
          onClick={() => resultSet.pagination.gotoLast()}
        >
          &gt;&gt;
        </span>
      </div>
    </>
  );
}
