import Image from "next/image";

export default function Home() {
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
      <section>
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
        </article>
      </section>
    </main>
  );
}
