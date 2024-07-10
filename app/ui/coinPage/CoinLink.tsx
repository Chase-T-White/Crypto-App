import { RiLinksFill } from "react-icons/ri";
import { LuCopy } from "react-icons/lu";

const CoinLink = ({ link }: { link: string }) => {
  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(link);
    } catch (err) {
      console.error("Unable to copy to clipboard.", err);
    }
  };

  return (
    <div className="w-full flex items-center justify-center gap-4 text-sm xsm:text-base bg-white dark:bg-dark-purple-800 rounded-xl p-4">
      <RiLinksFill className="inline-block" />
      <a href={link} target="blank" title="Go to coin site">
        {link}
      </a>
      <LuCopy
        className="inline-block cursor-pointer"
        onClick={handleCopyClick}
        title="Copy link to clipboard"
      />
    </div>
  );
};

export default CoinLink;
