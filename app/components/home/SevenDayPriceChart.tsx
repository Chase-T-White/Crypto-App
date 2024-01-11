import React from "react";
import { Line } from "react-chartjs-2";

const SevenDayPriceChart = ({ prices, logoColor }) => {
  const labels = prices.map((price, i) => {
    return i;
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    layout: {
      autoPadding: true,
    },
    elements: {
      line: {
        borderColor: logoColor,
        fill: false,
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
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default SevenDayPriceChart;
