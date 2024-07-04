"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/store";
import {
  fetchStorageCoins,
  selectAllPortfolioCoins,
  portfolioFetchStatus,
} from "@/lib/features/portfolio/portfolioSlice";
import { ErrorBoundary } from "react-error-boundary";
import { PortfolioCoinsSectionSkeleton } from "../ui/skeletons";
import PortfolioCoinsList from "../ui/portfolio/PortfolioCoinsList";
import NewAssetModal from "../ui/portfolio/NewAssetModal";

const Portfolio = () => {
  const [isAddAsset, setIsAddAsset] = useState(false);
  const [isShowInvestmentCalculator, setIsShowInvestmentCalculator] =
    useState(false);
  const portfolioCoins = useSelector(selectAllPortfolioCoins);
  const fetchStatus = useSelector(portfolioFetchStatus);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchStorageCoins());
  }, [dispatch]);

  return (
    <main className="relative">
      {isAddAsset && <NewAssetModal setIsAddAsset={setIsAddAsset} />}
      <div className="flex justify-between mb-10 text-2xl font-medium">
        Portfolio
        <div>
          <button>Investment Calculator</button>
          <button onClick={() => setIsAddAsset(true)}>Add Asset</button>
        </div>
      </div>
      <section>
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
          <div className="relative">
            {fetchStatus === "idle" || fetchStatus === "loading" ? (
              <PortfolioCoinsSectionSkeleton />
            ) : (
              <PortfolioCoinsList portfolioCoins={portfolioCoins} />
            )}
          </div>
        </ErrorBoundary>
      </section>
    </main>
  );
};

export default Portfolio;
