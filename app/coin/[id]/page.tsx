"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/store";
import {
  fetchCoin,
  selectCoin,
  coinFetchStatus,
} from "@/lib/features/coinPage/coinPageSlice";
import Link from "next/link";
import { HiMiniArrowLongLeft } from "react-icons/hi2";
import { ErrorBoundary } from "react-error-boundary";
import CoinPageInfo from "@/app/ui/coinPage/CoinPageInfo";

const CoinPage = ({ params }: { params: { id: string } }) => {
  const coinId = params.id;
  const coin = useSelector(selectCoin);
  const coinStatus = useSelector(coinFetchStatus);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCoin(coinId));
  }, [dispatch, coinId]);

  console.log(coin);

  return (
    <main>
      <nav className="mb-10">
        <Link href={"/portfolio"}>
          <HiMiniArrowLongLeft className="inline-block" /> Portfolio
        </Link>
      </nav>
      <section>
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
          <div className="relative">
            {coinStatus === "idle" || coinStatus === "loading" ? (
              <p>Loading</p>
            ) : (
              <CoinPageInfo coin={coin} />
            )}
          </div>
        </ErrorBoundary>
      </section>
    </main>
  );
};

export default CoinPage;
