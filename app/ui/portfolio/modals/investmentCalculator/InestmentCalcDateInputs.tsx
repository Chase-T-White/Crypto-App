import { BsQuestionCircle } from "react-icons/bs";

const InestmentCalcDateInputs = () => {
  return (
    <div className="flex justify-between mb-4 text-birches-100">
      {/* date inputs */}
      <div className="flex gap-4">
        <div className="flex gap-4 p-2 bg-[#191932] rounded-lg">
          <input
            className="bg-transparent cursor-pointer"
            type="datetime-local"
            name=""
            id=""
          />
          <button className="text-white">
            <BsQuestionCircle />
          </button>
        </div>
        <div className="flex gap-4 p-2 bg-[#191932] rounded-lg">
          <input
            className="bg-transparent cursor-pointer"
            type="datetime-local"
            name=""
            id=""
          />
          <button className="text-white">
            <BsQuestionCircle />
          </button>
        </div>
      </div>
      <div className="px-6 py-2 bg-[#191932] rounded-lg">
        <button>
          {/* No idea what this button is for */}
          Q-ty
        </button>
      </div>
    </div>
  );
};

export default InestmentCalcDateInputs;
