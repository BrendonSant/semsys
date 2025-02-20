"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export interface CustomerReport  {
  name: string;
  email: string;
  realizado: number;
  executando: number;
  parado: number;
  pendente: number;
  data: Date| null ; // Dependendo do formato armazenado
};




export function CardReports({ data }: { data?: CustomerReport }) {
  if (!data) {
    return <div>Carregando...</div>; // Ou algum outro fallback
  }

  return (
   
      <div className="w-full" >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg lg:text-2xl">{data.name}</CardTitle>
            <CardDescription>{data.email}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 w-full">
            <div className="flex justify-between  items-center w-full">
              <CardTitle className="text-md lg:text-lg">Serviços realizados</CardTitle>
              <CardDescription className="text-lg">{data.realizado}</CardDescription>
            </div>

            <div className="flex justify-between  items-center ">
              <CardTitle className="text-md lg:text-lg">Número de serviços executando:</CardTitle>
              <CardDescription className="text-lg">{data.executando}</CardDescription>
            </div>

            <div className="flex justify-between items-center ">
              <CardTitle className="text-md lg:text-lg">Número de serviços Parados:</CardTitle>
              <CardDescription className="text-lg">{data.parado}</CardDescription>
            </div>

            <div className="flex justify-between items-center ">
              <CardTitle className="text-md lg:text-lg">Número de serviços pagamento pendente:</CardTitle>
              <CardDescription className="text-lg">{data.pendente}</CardDescription>
            </div>
          </CardContent>
          <CardFooter>
            <CardDescription>Cliente desde:</CardDescription>
            <CardDescription>
              {data.data ? data.data.toLocaleDateString() : "N/A"}
            </CardDescription>
          </CardFooter>
        </Card>
      </div>
  );
}