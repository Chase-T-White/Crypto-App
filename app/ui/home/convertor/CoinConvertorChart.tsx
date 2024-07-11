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

const CoinConvertorChart = ({
  coinsPriceData,
}: {
  coinsPriceData: number[][];
}) => {
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

  const labels = coinsPriceData[0].map((_, i) => {
    return i;
  });

  const prices = coinsPriceData[0].map((priceData, i) => {
    const converted = priceData / coinsPriceData[1][i];

    return converted.toFixed(3);
  });

  const datasets = [
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
    },
  ];

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
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
        borderColor: "#7878FA",
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
        scale: "logarithmic",
      },
    },
    spanGaps: true,
  };

  const data = {
    labels: labels,
    datasets: datasets,
  };

  return <Line options={options} data={data} height={"176"} />;
};

export default CoinConvertorChart;
