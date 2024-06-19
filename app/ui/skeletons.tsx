const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function CoinsChartCardSkeleton() {
  return (
    <div className={`${shimmer} grow p-6 bg-dark-purple-600 rounded-xl`}>
      <div>
        <p className="w-40 h-6 mb-6 bg-dark-purple-800"></p>
        <h3 className="w-40 h-7 mb-4 bg-dark-purple-800"></h3>
        <p className="w-40 h-6 mb-6 bg-dark-purple-800"></p>
      </div>
      <div className="h-52 bg-dark-purple-800"></div>
    </div>
  );
}
