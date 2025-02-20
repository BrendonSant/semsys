"use client";

import {
  buscaRelatorio,
  valuesProps,
  buscaValues,
} from "@/app/dashboard/actions";

import { useQueries, useQuery } from "@tanstack/react-query";
import { CustomerProps } from "@/util/customer.type";
import { CardReports } from "../cardreport";

import { CustomerReport } from "../cardreport";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";


export function Reports({ customers }: { customers: CustomerProps[] }) {
  const queries = useQueries<CustomerReport[]>({
    queries: customers.map((customer) => ({
      queryKey: ["busca_clientes", customer],
      queryFn: () => buscaRelatorio(customer),
      enabled: !!customer, // Só executa se houver um ID válido
    })),
  });

  const userId = customers[1].userId;

  const { data: dataValues } = useQuery<valuesProps>({
    queryKey: ["values_select", userId],
    queryFn: () => buscaValues(userId),
    enabled: !!customers, // Só executa a query se `id` for válido
  });

  console.log(dataValues?.product);

  const numTotalCustomers = customers.length;

  return (
    <div className="flex flex-col lg:flex-row  w-full gap-4  mt-4 ">
      <ScrollArea className="px-4 overflow-y-auto h-[calc(100vh-15rem)] w-full">
      <div className=" flex flex-col gap-2 w-full ">
        
        {queries.map((query, index) => (
          <CardReports key={index} data={query.data as CustomerReport} />
        ))}

        
      </div>
      </ScrollArea>
       

      <div className="w-full h-72">
        <Card>
          <CardHeader className="w-full">
            <CardTitle className="text-sm w-full text-nowrap ">
              Dados totais
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col justify-center items-start w-full">
            <div className="flex justify-between w-full items-center ">
              <CardTitle className=" text-sm lg:text-lg min-w-fit">
                Total de clientes:
              </CardTitle>
              <CardDescription className=" text-sm lg:text-lg">
                {numTotalCustomers}
              </CardDescription>
            </div>
            <div className="flex justify-between w-full items-center ">
              <CardTitle className=" text-sm lg:text-lg min-w-fit">
                Total em Serviços:
              </CardTitle>
              <CardDescription className=" text-sm lg:text-lg">
                R$ {dataValues?.service}
              </CardDescription>
            </div>
            <div className="flex justify-between w-full items-center ">
              <CardTitle className=" text-sm lg:text-lg min-w-fit">
                Total em Produtos:
              </CardTitle>
              <CardDescription className=" text-sm lg:text-lg">
                R$ {dataValues?.product}
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
