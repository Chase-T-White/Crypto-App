"use client";

import { useState } from "react";
import CoinsChartsSection from "./ui/home/coinCharts/CoinsChartsSection";
import CryptoCoinTable from "./ui/home/coinTable/CryptoCoinTable";
import CoinsConvertorSection from "./ui/home/convertor/CoinsConvertorSection";

export default function Home() {
  const [coinsView, setCoinsView] = useState("coins");

  return (
    <main className="flex min-h-screen flex-col rounded-md">
      <div className="max-w-[500px] flex justify-between gap-3.5 mb-10 p-1 bg-dark-purple-700">
        <button
          className={`grow py-3 text-center ${
            coinsView === "coins" ? "active-button" : "bg-dark-purple-700"
          }`}
          disabled={coinsView === "coins"}
          onClick={() => setCoinsView("coins")}
        >
          Coins
        </button>
        <button
          className={`grow py-3 text-center ${
            coinsView === "convertor" ? "active-button" : "bg-dark-purple-700"
          }`}
          disabled={coinsView === "convertor"}
          onClick={() => setCoinsView("convertor")}
        >
          Convertor
        </button>
      </div>
      {coinsView === "coins" ? (
        <CoinsChartsSection />
      ) : (
        <CoinsConvertorSection />
      )}
      <CryptoCoinTable />
    </main>
  );
}
