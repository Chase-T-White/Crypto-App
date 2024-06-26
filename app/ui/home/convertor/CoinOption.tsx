import React from "react";
import Image from "next/image";

const CoinOption = ({ coin }: { coin: Coins }) => {
  const { name, symbol, image, current_price } = coin;
  return (
    <option value="name">
      <div className="flex items-center gap-2">
        <Image src={image} alt="Crypto logo" width={24} height={24} />
        <p>
          {name} ({symbol.toUpperCase()})
        </p>
      </div>
    </option>
  );
};

export default CoinOption;
