import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SevenDayPriceChart = ({ prices }) => {
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
    labels: ["1", "2", "3", "4", "5", "6", "7"],
    datasets: [
      {
        label: "",
        data: prices,
        fill: true,
        borderColor: "red",
        tension: 0.2,
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default SevenDayPriceChart;
