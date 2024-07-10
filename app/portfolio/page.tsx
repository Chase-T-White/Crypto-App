"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import { PortfolioCoinsSectionSkeleton } from "../ui/skeletons";
import PortfolioCoinsList from "../ui/portfolio/PortfolioCoinsList";
import NewAssetModal from "../ui/portfolio/NewAssetModal";
import RemoveAssetModal from "../ui/portfolio/RemoveAssetModal";
import InvestmentCalculator from "../ui/portfolio/InvestmentCalculator";
import { AppDispatch } from "@/lib/store";
import {
  fetchStorageCoins,
  selectAllPortfolioCoins,
  portfolioFetchStatus,
} from "@/lib/features/portfolio/portfolioSlice";

const Portfolio = () => {
  const [isAddAsset, setIsAddAsset] = useState(false);
  const [isRemoveAsset, setIsRemoveAsset] = useState(false);
  const [removeAssetId, setRemoveAssetId] = useState("");
  const [isShowInvestmentCalculator, setIsShowInvestmentCalculator] =
    useState(false);
  const portfolioCoins = useSelector(selectAllPortfolioCoins);
  const fetchStatus = useSelector(portfolioFetchStatus);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (portfolioCoins.length === 0) {
      dispatch(fetchStorageCoins());
    }
  }, [dispatch, portfolioCoins.length]);

  return (
    <main>
      {(isAddAsset || isRemoveAsset || isShowInvestmentCalculator) && (
        <div className="absolute z-40 inset-0 backdrop-blur-[2px] bg-[#00000022]">
          {isAddAsset && <NewAssetModal setIsAddAsset={setIsAddAsset} />}
          {isRemoveAsset && (
            <RemoveAssetModal
              {...{ setIsRemoveAsset, removeAssetId, setRemoveAssetId }}
            />
          )}
          {isShowInvestmentCalculator && (
            <InvestmentCalculator
              setIsShowInvestmentCalculator={setIsShowInvestmentCalculator}
            />
          )}
        </div>
      )}
      <div className="flex justify-between mb-10 text-2xl font-medium">
        Portfolio
        <div className="w-1/2 flex flex-col sm:flex-row gap-2 base:gap-4">
          <button
            className="grow basis-1/2 p-3 text-sm base:text-base bg-light-purple-300/50 rounded-md"
            onClick={() => setIsShowInvestmentCalculator(true)}
          >
            Investment Calculator
          </button>
          <button
            className="grow basis-1/2 p-3 text-sm base:text-base bg-light-purple-300/50 rounded-md"
            onClick={() => setIsAddAsset(true)}
          >
            Add Asset
          </button>
        </div>
      </div>
      <section>
        <ErrorBoundary fallback={<p>Something went wrong</p>}>
          <div className="relative">
            {fetchStatus === "idle" || fetchStatus === "loading" ? (
              <PortfolioCoinsSectionSkeleton />
            ) : (
              <PortfolioCoinsList
                portfolioCoins={portfolioCoins}
                setIsRemoveAsset={setIsRemoveAsset}
                setRemoveAssetId={setRemoveAssetId}
              />
            )}
          </div>
        </ErrorBoundary>
      </section>
    </main>
  );
};

export default Portfolio;
