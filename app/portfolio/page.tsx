"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import NewAssetModal from "../ui/portfolio/modals/NewAssetModal";
import RemoveAssetModal from "../ui/portfolio/modals/RemoveAssetModal";
import InvestmentCalculator from "../ui/portfolio/modals/investmentCalculator/InvestmentCalculator";
import { PortfolioCoinsSectionSkeleton } from "../ui/skeletons";
import PortfolioCoinsList from "../ui/portfolio/PortfolioCoinsList";
import { checkStorage } from "@/utils/localStorageFunctions";
import { AppDispatch } from "@/lib/store";
import { selectCurrency } from "@/lib/features/currencySlice";
import {
  fetchStorageCoins,
  selectAllPortfolioCoins,
  portfolioFetchStatus,
  clearPortfolioCoins,
} from "@/lib/features/portfolio/portfolioSlice";

const Portfolio = () => {
  const currency = useSelector(selectCurrency);
  const [currentCurrency, setCurrentCurrency] = useState(currency);
  const [isAddAsset, setIsAddAsset] = useState(false);
  const [isRemoveAsset, setIsRemoveAsset] = useState(false);
  const [removeAssetId, setRemoveAssetId] = useState({
    coinId: "",
    assetId: "",
  });
  const [isShowInvestmentCalculator, setIsShowInvestmentCalculator] =
    useState(false);
  const portfolioCoins = useSelector(selectAllPortfolioCoins);
  const fetchStatus = useSelector(portfolioFetchStatus);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const storedCoins = checkStorage();
    if (portfolioCoins.length === 0) {
      dispatch(fetchStorageCoins(storedCoins));
    } else if (currency !== currentCurrency) {
      dispatch(clearPortfolioCoins());
      dispatch(fetchStorageCoins(storedCoins));
      setCurrentCurrency(currency);
    }
  }, [dispatch, currency]);

  return (
    <main>
      {(isAddAsset || isRemoveAsset || isShowInvestmentCalculator) && (
        <div className="absolute z-40 inset-0 backdrop-blur-[2px] bg-[#00000022]">
          <div className="absolute inset-0 max-h-[100vh]">
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
