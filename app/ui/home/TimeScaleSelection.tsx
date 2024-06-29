import React from "react";

const TimeScaleSelection = ({
  timeScale,
  onClickFunction,
}: {
  timeScale: number;
  onClickFunction: any;
}) => {
  return (
    <ul className="w-max flex gap-2 p-1 text-sm text-darkTheme-white-500 bg-dark-purple-700 rounded-md">
      <button
        value={1}
        className={`px-5 py-2 rounded-md ${
          timeScale === 1 ? "active-button" : ""
        }`}
        onClick={(e) => handleClick(e)}
      >
        1D
      </button>
      <button
        value={7}
        className={`px-5 py-2 rounded-md ${
          timeScale === 7 ? "active-button" : ""
        }`}
        onClick={(e) => handleClick(e)}
      >
        7D
      </button>
      <button
        value={14}
        className={`px-5 py-2 rounded-md ${
          timeScale === 14 ? "active-button" : ""
        }`}
        onClick={(e) => handleClick(e)}
      >
        14D
      </button>
      <button
        value={31}
        className={`px-5 py-2 rounded-md ${
          timeScale === 31 ? "active-button" : ""
        }`}
        onClick={(e) => handleClick(e)}
      >
        1M
      </button>
      <button
        value={182}
        className={`px-5 py-2 rounded-md ${
          timeScale === 182 ? "active-button" : ""
        }`}
        onClick={(e) => handleClick(e)}
      >
        6M
      </button>
      <button
        value={365}
        className={`px-5 py-2 rounded-md ${
          timeScale === 365 ? "active-button" : ""
        }`}
        onClick={(e) => handleClick(e)}
      >
        1Y
      </button>
    </ul>
  );
};

export default TimeScaleSelection;
