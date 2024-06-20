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

const CoinsVolumnChart = ({
  volumeData,
  timeScale,
}: {
  volumeData: number[][];
  timeScale: string;
}) => {
  const { labels, averageVolumePerInterval } = setVolumeChartParams(
    timeScale,
    volumeData
  );

  function getGradient(ctx: any, chartArea: any) {
    let gradient = ctx.createLinearGradient(
      0,
      chartArea.bottom,
      0,
      chartArea.top
    );
    gradient.addColorStop(0.6, `#9D62D9`);
    gradient.addColorStop(0, "#B374F203");
    return gradient;
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
    datasets: [
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
          return getGradient(ctx, chartArea);
        },
      },
    ],
  };

  return <Bar options={options} data={data} height={"216"} />;
};

export default CoinsVolumnChart;
