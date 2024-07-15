import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { removeCoin } from "@/lib/features/portfolio/portfolioSlice";

const RemoveAssetModal = ({
  setIsRemoveAsset,
  removeAssetId,
  setRemoveAssetId,
}: {
  setIsRemoveAsset: React.Dispatch<React.SetStateAction<boolean>>;
  removeAssetId: { coinId: string; assetId: string };
  setRemoveAssetId: React.Dispatch<
    React.SetStateAction<{ coinId: string; assetId: string }>
  >;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = () => {
    dispatch(removeCoin(removeAssetId));
    setRemoveAssetId({ coinId: "", assetId: "" });
    setIsRemoveAsset(false);
  };

  return (
    <article className="max-w-[500px] w-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-50 p-12 bg-white dark:bg-dark-purple-900 border border-[#2D2D51] rounded-xl">
      <p className="text-center mb-3">
        Are you sure you want to remove this coin?
      </p>
      <div className="flex gap-2">
        <button
          className="flex justify-center basis-1/2 p-3 rounded-lg bg-light-purple-200/20 dark:bg-dark-purple-500"
          onClick={() => setIsRemoveAsset(false)}
        >
          Cancel
        </button>
        <button
          className="flex justify-center basis-1/2 p-3 rounded-lg bg-red"
          onClick={handleClick}
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default RemoveAssetModal;
