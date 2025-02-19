"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import { api } from "@/lib/api";
import { useQueries } from "@tanstack/react-query";

export function Reports() {
  return (
    <div className="flex w-full mt-4 gap-6">
      <div className="w-2/3">
      <Card >
        <CardHeader>
          <CardTitle>Brendon Santos</CardTitle>
          <CardDescription>brendonmcs@hotmail.com</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex justify-between px-6">
            <CardTitle className="text-lg">
              Número de serviços Realizados:
            </CardTitle>
            <CardDescription className="text-lg">10</CardDescription>
          </div>

          <div className="flex justify-between px-6">
            <CardTitle className="text-lg">
              Número de serviços Executando:
            </CardTitle>
            <CardDescription className="text-lg">10</CardDescription>
          </div>

          <div className="flex justify-between px-6">
            <CardTitle className="text-lg">
              Número de serviços Parados:
            </CardTitle>
            <CardDescription className="text-lg">10</CardDescription>
          </div>

          <div className="flex justify-between px-6">
            <CardTitle className="text-lg">
              Número de serviços pagamento pendente:
            </CardTitle>
            <CardDescription className="text-lg">10</CardDescription>
          </div>
        </CardContent>
        <CardFooter>
          <CardDescription>Cliente desde:</CardDescription>
          <CardDescription>18/02/2025</CardDescription>
        </CardFooter>
      </Card>
        </div>  
     

      <Card className="w-1/3">
        <CardHeader>
            <CardTitle>Dados totais</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="flex justify-between px-6">
            <CardTitle className="text-lg">
              Total de clientes:
            </CardTitle>
            <CardDescription className="text-lg">10</CardDescription>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
