const TimeScaleButton = ({
  value,
  timeScale,
  text,
  handleClick,
}: {
  value: number;
  timeScale: number;
  text: string;
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) => {
  return (
    <button
      value={value}
      className={`px-2.5 xsm:px-5 py-1 xsm:py-2 rounded-md ${
        timeScale === value ? "active-button" : ""
      }`}
      onClick={(e) => handleClick(e)}
    >
      {text}
    </button>
  );
};

export default TimeScaleButton;
