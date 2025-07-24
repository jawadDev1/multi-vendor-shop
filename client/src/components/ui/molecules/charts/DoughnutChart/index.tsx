"use client";

import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  labels: string[];
  data: number[];
  backgroundColors?: string[];
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({
  labels,
  data,
  backgroundColors = ["#007bff", "#28a745", "#ffc107", "#dc3545", "#17a2b8"],
}) => {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          color: "#333",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="">
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default DoughnutChart;
