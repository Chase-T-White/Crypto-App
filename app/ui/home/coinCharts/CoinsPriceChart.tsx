import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LogarithmicScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Filler
);

type CoinData = {
  market_caps: number[][];
  prices: number[][];
  total_volumes: number[][];
};

const CoinsPriceChart = ({ coinData }: { coinData: CoinData[] }) => {
  function getGradient(
    ctx: any,
    chartArea: any,
    startColor: string,
    endColor: string = startColor
  ) {
    let gradient = ctx.createLinearGradient(
      0,
      chartArea.bottom,
      0,
      chartArea.top
    );
    gradient.addColorStop(0.6, startColor);
    gradient.addColorStop(0, endColor);
    return gradient;
  }

  const labels = coinData[0].prices.map((_, i) => {
    return i;
  });

  let prices, datasets;

  if (coinData.length === 2) {
    prices = coinData[0].prices.map((priceData) => {
      return priceData[1].toFixed(0);
    });
    const dataPrices2 = coinData[1].prices.map((priceData) => {
      return priceData[1].toFixed(0);
    });

    datasets = [
      {
        label: "",
        data: prices,
        tension: 0.1,
        fill: true,
        backgroundColor: function (context: any) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          // This case happens on initial chart load
          if (!chartArea) return;
          return getGradient(ctx, chartArea, `#7474F299`, "#7474F203");
        },
        borderColor: "#7878FA88",
      },
      {
        label: "",
        data: dataPrices2,
        tension: 0.1,
        fill: true,
        backgroundColor: function (context: any) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          // This case happens on initial chart load
          if (!chartArea) return;
          return getGradient(ctx, chartArea, "#D878FA99", "#D878FA03");
        },
        borderColor: "#D878FA",
      },
    ];
  } else {
    prices = coinData[0].prices.map((priceData) => {
      return priceData[1].toFixed(0);
    });
    datasets = [
      {
        label: "",
        data: prices,
        tension: 0.1,
        fill: true,
        backgroundColor: function (context: any) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          // This case happens on initial chart load
          if (!chartArea) return;
          return getGradient(ctx, chartArea, `#7474F299`, "#7474F203");
        },
        borderColor: "#7878FA88",
      },
    ];
  }

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 3 / 1,
    plugins: {
      legend: {
        display: false,
      },
      filler: {
        propagate: true,
      },
    },
    layout: {
      autoPadding: true,
    },
    elements: {
      line: {
        fill: "0",
      },
      point: {
        pointStyle: false,
      },
    },
    scales: {
      x: {
        display: false,
        min: 0,
        max: prices.length,
        ticks: {
          display: false,
        },
      },
      y: {
        display: false,
        ticks: {
          display: false,
        },
        type: coinData.length === 2 ? "logarithmic" : "linear",
      },
    },
    spanGaps: true,
  };

  const data = {
    labels: labels,
    datasets: datasets,
  };

  return <Line options={options} data={data} height={"216"} />;
};

export default CoinsPriceChart;
