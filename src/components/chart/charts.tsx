import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ServiceProps } from '@/util/servicing.type'; // Ajuste o caminho conforme necessário

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma";

// Registra os componentes necessários do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define as propriedades que o componente receberá
interface ServiceChartProps {
  services: ServiceProps[];
}

export async function ServiceChart() {

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      redirect("/");
    }
  

  const services = await prismaClient.ticket.findMany({
    where:{
      userId: session.user.id
    }
  })


  const statuses: ServiceProps['status'][] = [
    'Realizado',
    'Parado',
    'Executando',
    'Não iniciado',
  ];

  // Calcula a quantidade de serviços para cada status
  const counts = statuses.map((status) =>
    services.filter((service) => service.status === status).length
  );

  // Configuração dos dados para o gráfico
  const data = {
    labels: statuses,
    datasets: [
      {
        label: 'Quantidade de Serviços',
        data: counts,
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)', // Realizado
          'rgba(255, 99, 132, 0.6)', // Parado
          'rgba(255, 206, 86, 0.6)', // Executando
          'rgba(54, 162, 235, 0.6)', // Não iniciado
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Configuração das opções do gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Distribuição de Status dos Serviços',
      },
    },
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

