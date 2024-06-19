import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

const SevenDayPriceChart = ({
  prices,
  logoColor,
}: {
  prices: number[];
  logoColor: string;
}) => {
  const labels = prices.map((_, i) => {
    return i;
  });

  function getGradient(ctx: any, chartArea: any, logoColor: string) {
    let gradient = ctx.createLinearGradient(
      0,
      chartArea.bottom,
      0,
      chartArea.top
    );
    gradient.addColorStop(0.6, `${logoColor}88`);
    gradient.addColorStop(0, "transparent");
    return gradient;
  }

  const options: any = {
    responsive: true,
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
        borderColor: logoColor,
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
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
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
          return getGradient(ctx, chartArea, logoColor);
        },
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default SevenDayPriceChart;
