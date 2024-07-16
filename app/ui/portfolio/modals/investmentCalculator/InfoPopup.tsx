import { BsQuestionCircle } from "react-icons/bs";

const InfoPopup = ({ text }: { text: string }) => {
  return (
    <div className="relative group">
      <div className="absolute left-1/2 -translate-x-1/2 -translate-y-full hidden group-hover:block max-w-[300px] w-max py-1 px-2 text-[11px] text-white bg-[#848484] rounded">
        {text}
      </div>
      <button className="text-white">
        <BsQuestionCircle />
      </button>
    </div>
  );
};

export default InfoPopup;
