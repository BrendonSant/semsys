import { Container } from "@/components/container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma";
import { FiEdit, FiTrash, FiUserPlus } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DeleteService } from "@/components/deleteservice";

export default async function Servicing() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const service = await prismaClient.ticket.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      customer: true, // Inclui os dados do cliente
    },
  });

  


  return (
    <Container>
      <div className="flex w-full justify-between  mt-10 mb-4">
        <h1 className="text-3xl font-bold font-sans text-mdblue-500">
          Serviços
        </h1>
        <Link href="servicing/newservicing">
          <Button variant={"outline"}>
            <FiUserPlus />
            Novo serviço
          </Button>
        </Link>
      </div>
      <table className="min-w-full my-2 ">
        <thead className=" my-2 border border-gray-200 h-8">
          <tr className="text-left">
            <th>Nome</th>
            <th>Cliente</th>
            <th className="  hidden lg:block">Data</th>
            <th>Valor</th>
            <th>Total</th>
            <th className="  hidden lg:block">Pagamento </th>
            <th>Status</th>
            <th className="text-end">Ações</th>
          </tr>
        </thead>
        <tbody>
          {service.map((service) => (
            <tr
              className="text-left h-16 border-b-2 border-b-slate-200 last:border-b-0"
              key={service.id}
            >
              <td>{service.name}</td>
              <td>{service.customer?.name}</td>
              <td className="hidden lg:block">
                {service.create_at
                  ? service.create_at.toLocaleDateString()
                  : "N/A"}
              </td>
              <td>{service.serviceprice}</td>
              <td>{service.total}</td>
              <td className="hidden lg:block" >{service.payment}</td>
              <td className="hidden lg:block">
                {service.status === "Realizado" && (
                  <span
                    className="w-3 h-3 rounded-full bg-green-500 inline-block mr-1"
                    title="Status Realizado"
                  ></span>
                )}
                 {service.status === "Parado" && (
                  <span
                    className="w-3 h-3 rounded-full bg-red-500 inline-block mr-1"
                    title="Status Parado"
                  ></span>
                )}
                 {service.status === "Execultando" && (
                  <span
                    className="w-3 h-3 rounded-full bg-blue-500 inline-block mr-1"
                    title="Status Execultando"
                  ></span>
                )}
                 {service.status === "Não iniciado" && (
                  <span
                    className="w-3 h-3 rounded-full bg-yellow-500 inline-block mr-1"
                    title="Status Não iniciado"
                  ></span>
                )}
                {service.status}
              </td>
              <td className="text-right">
                <div className="flex justify-end gap-2">
                  <button>
                    <FiEdit color="#072e5a" size={24} />
                  </button>
                  <DeleteService service={service.id}/>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
