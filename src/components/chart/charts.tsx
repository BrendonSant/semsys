"use client";

import React, { useId } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

import {useQuery, useQueryClient } from "@tanstack/react-query";
import { buscaDataChart } from "@/app/dashboard/actions";







export function MyBarChart({userId}:{userId : string})  {


  const { data: dataChart } = useQuery({
      queryKey: ["buscar_chart_servicos", userId],
      queryFn: () => buscaDataChart(userId),
      enabled: !!useId, // Só executa a query se `id` for válido
    });




    




  const labels = ["Não iniciado", "Executando", "Parado", "Realizado"];
  const datasets = dataChart;
  const data = {
    labels: labels,
    datasets: [
      {
        // Title of Graph
        label: "Relação de status de serviços",
        data: datasets,
        backgroundColor: [
          "rgba(201, 203, 207, 0.2)",
          "rgba(1, 150, 250, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(100, 162, 235, 0.2)",
        ],
        borderColor: [
          "rgb(201, 203, 207)",
          "rgb(1, 150, 250)",
          "rgba(255, 99, 132)",
          "rgb(100, 162, 235)",
        ],
        borderWidth: 1,
        barPercentage: 1,
        borderRadius: {
          topLeft: 5,
          topRight: 5,
        },
      },
      // insert similar in dataset object for making multi bar chart
    ],
  };
  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: "número de serviços",
        },
        display: true,
        beginAtZero: true,
        max: 100,
      },
      x: {
        title: {
          display: true,
          text: "status de serviços",
        },
        display: true,
      },
    },
  };
  return (
    <div className="flex w-full justify-center md:justify-start items-center px-4">
      <div className="h-[400px] w-full lg:w-1/2 md:h-[500px] mt-8">
        <Bar data={data} options={options} />
        
      </div>
    </div>
  );
};


