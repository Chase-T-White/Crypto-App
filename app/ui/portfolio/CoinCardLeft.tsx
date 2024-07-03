import React from "react";

const CoinCardLeft = ({ current_price }) => {
  return (
    <div>
      <div className="flex flex-wrap gap-5">
        <div className="basis-1/2">
          <p>${current_price}</p>
          <p>Current Price</p>
        </div>
        <div className="basis-1/2">
          <p></p>
          <p>24h%</p>
        </div>
        <div className="basis-1/2">
          <p></p>
          <p>Volume vs Market Cap</p>
        </div>
        <div className="basis-1/2">
          <p></p>
          <p>Circ Supply vs Max Supply</p>
        </div>
      </div>
    </div>
  );
};

export default CoinCardLeft;
