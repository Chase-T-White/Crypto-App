"use client";

import { useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import CryptoCoinTableRow from "./CryptoCoinTableRow";
import { RootState } from "@reduxjs/toolkit/query";

const CryptoCoinTable = () => {
  const { coins } = useSelector((state: RootState) => state.coins);

  console.log(coins);

  return (
    <table className="table-auto border-collapse">
      <thead className="px-5 py-4 mb-2 text-sm text-darkTheme-white-200">
        <tr>
          <th className="ps-5">#</th>
          <th>Name</th>
          <th>Price</th>
          <th>1h%</th>
          <th>24h%</th>
          <th>7d%</th>
          <th>24h volume / Market Cap</th>
          <th>Circulating / Total supply</th>
          <th className="pe-5">Last 7d</th>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin) => {
          return <CryptoCoinTableRow key={nanoid()} {...coin} />;
        })}
      </tbody>
    </table>
  );
};

export default CryptoCoinTable;
