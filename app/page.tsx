"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCoins } from "@/lib/features/coins/coinsSlice";
import { AppDispatch } from "@/lib/store";
import CoinsChartsSection from "./components/home/CoinsChartsSection";
import CryptoCoinTable from "./components/home/CryptoCoinTable";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);

  return (
    <main className="flex min-h-screen flex-col rounded-md">
      <div className="max-w-[500px] flex justify-between gap-3.5 mb-10 p-1 bg-dark-purple-700">
        <button className="grow py-3 text-center bg-dark-purple-500">
          Coins
        </button>
        <button className="grow py-3 text-center bg-dark-purple-500">
          Convertor
        </button>
      </div>
      <CoinsChartsSection />
      <CryptoCoinTable />
    </main>
  );
}
