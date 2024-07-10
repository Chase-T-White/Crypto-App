"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { ErrorBoundary } from "react-error-boundary";
import { HiMiniArrowLongLeft } from "react-icons/hi2";
import { AppDispatch } from "@/lib/store";
import { CoinsPageSkeleton } from "@/app/ui/skeletons";
import CoinPageInfo from "@/app/ui/coinPage/CoinPageInfo";
import {
  fetchCoin,
  selectCoin,
  coinFetchStatus,
} from "@/lib/features/coinPage/coinPageSlice";

const CoinPage = ({ params }: { params: { id: string } }) => {
  const coinId = params.id;
  const coin = useSelector(selectCoin);
  const coinStatus = useSelector(coinFetchStatus);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (coin?.length !== 0 || coin?.name.toLowerCase() !== coinId) {
      dispatch(fetchCoin(coinId));
    }
  }, [dispatch, coinId, coin?.length, coin?.name]);

  return (
    <main>
      <nav className="mb-10">
        <Link
          href={"/portfolio"}
          className="text-lg"
          title="Go to Portfolio Page"
        >
          <HiMiniArrowLongLeft className="inline-block" /> Portfolio
        </Link>
      </nav>
      <section>
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
          <div className="relative">
            {coinStatus === "idle" || coinStatus === "loading" ? (
              <CoinsPageSkeleton />
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
