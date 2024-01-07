import React from "react";
import Image from "next/image";

const CoinsChartsSection = () => {
  return (
    <section className="mb-[72px]">
      <div className="flex justify-between items-end mb-6 text-darkTheme-white-200 text-sm">
        Select the currency to view statistics
        <button className="flex items-center gap-2.5 py-3.5 px-[26px] bg-dark-purple-500 rounded-md">
          <Image
            src="/images/Compare.svg"
            alt="Compare icon"
            width={20}
            height={20}
          />
          Compare
        </button>
      </div>
      <article>
        <ul className="flex gap-2 mb-10 overflow-hidden">
          <li className="grow flex gap-4 max-w-[260px] p-4 bg-dark-purple-700 rounded-md">
            <Image
              src="/images/Bitcoin.svg"
              alt="Bitcoin"
              width={32}
              height={32}
            />
            <div className="flex flex-col gap-1">
              <h5 className="font-medium">Bitcoin (BTC)</h5>
              <p className="text-sm text-darkTheme-white-200">
                27,445.55 USD <span className="text-birches">^ 2.35%</span>
              </p>
            </div>
          </li>
        </ul>
        <div>
          <div className="flex gap-8 mb-14">
            <div className="grow p-6 bg-dark-purple-600 rounded-xl">
              <div>
                <p className="mb-6 text-lg text-darkTheme-white-200">
                  Bitcoin (BTC)
                </p>
                <h3 className="mb-4 text-3xl font-bold">$13.431 mln</h3>
                <p className="text-darkTheme-white-200">September 29, 2023</p>
              </div>
              <div>chart stuff</div>
            </div>
            <div className="grow p-6 bg-dark-purple-400 rounded-xl">
              <div>
                <p className="mb-6 text-lg text-darkTheme-white-200">
                  Volumn 24h
                </p>
                <h3 className="mb-4 text-3xl font-bold">$807.243 bln</h3>
                <p className="text-darkTheme-white-200">September 29, 2023</p>
              </div>
              <div>chart stuff</div>
            </div>
          </div>
          <ul className="w-max flex gap-2 p-1 text-sm text-darkTheme-white-500 bg-dark-purple-500 rounded-md">
            <li className="px-5 py-2 text-darkTheme-white-100 bg-birches rounded-md">
              1D
            </li>
            <li className="px-5 py-2 rounded-md">7D</li>
            <li className="px-5 py-2 rounded-md">7D</li>
            <li className="px-5 py-2 rounded-md">7D</li>
            <li className="px-5 py-2 rounded-md">7D</li>
            <li className="px-5 py-2 rounded-md">7D</li>
            <li className="px-5 py-2 rounded-md">7D</li>
          </ul>
        </div>
      </article>
    </section>
  );
};

export default CoinsChartsSection;
