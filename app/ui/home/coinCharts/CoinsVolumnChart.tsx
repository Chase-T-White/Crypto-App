import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { setVolumeChartParams } from "@/utils/chartFunctions";

ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Filler);

type CoinData = {
  market_caps: number[][];
  prices: number[][];
  total_volumes: number[][];
};

const CoinsVolumnChart = ({
  coinData,
  timeScale,
}: {
  coinData: CoinData[];
  timeScale: number;
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

  let labels, averageVolumePerInterval, datasets;

  if (coinData.length === 2) {
    const { labels: dataLabels, averageVolumePerInterval: dataInterval1 } =
      setVolumeChartParams(timeScale, coinData[0].total_volumes);
    labels = dataLabels;
    averageVolumePerInterval = dataInterval1;
    const { labels: _, averageVolumePerInterval: dataInterval2 } =
      setVolumeChartParams(timeScale, coinData[1].total_volumes);
    const coinDataSets = [
      {
        label: "",
        data: averageVolumePerInterval,
        tension: 0.1,
        fill: true,
        backgroundColor: function (context: any) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          // This case happens on initial chart load
          if (!chartArea) return;
          return getGradient(ctx, chartArea, "#7878FA88");
        },
      },
      {
        label: "",
        data: dataInterval2,
        tension: 0.1,
        fill: true,
        backgroundColor: function (context: any) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          // This case happens on initial chart load
          if (!chartArea) return;
          return getGradient(ctx, chartArea, "#D878FA");
        },
      },
    ];

    datasets = coinDataSets;
  } else {
    const { labels: dataLabels, averageVolumePerInterval: dataInterval1 } =
      setVolumeChartParams(timeScale, coinData[0].total_volumes);

    console.log(timeScale, coinData[0].total_volumes, dataInterval1);

    labels = dataLabels;
    averageVolumePerInterval = dataInterval1;
    const coinDataSets = [
      {
        label: "",
        data: averageVolumePerInterval,
        tension: 0.1,
        fill: true,
        backgroundColor: function (context: any) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          // This case happens on initial chart load
          if (!chartArea) return;
          return getGradient(ctx, chartArea, "#D878FA", "#B374F203");
        },
      },
    ];

    datasets = coinDataSets;
  }

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
        display: true,
        min: 0,
        max: averageVolumePerInterval.length,
        ticks: {
          display: true,
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
    datasets: datasets,
  };

  return <Bar options={options} data={data} height={"216"} />;
};

export default CoinsVolumnChart;
