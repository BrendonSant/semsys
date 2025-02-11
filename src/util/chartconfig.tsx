import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

// Dados esperados no formato [{ status: string, count: number }]
export function generateChartConfig(
  chartData: Array<{ status: string; count: number }>
) {
  // Configuração específica para o Recharts
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <XAxis dataKey="status" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#4CAF50" />
      </BarChart>
    </ResponsiveContainer>
  );
}
