import { Container } from "@/components/container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma";
import { FiEdit, FiTrash, FiUserPlus } from "react-icons/fi";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default async function Servicing() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const service = await prismaClient.ticket.findMany({
    where: {
      userId: session.user.id,
    },
  });

  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <Container>
      <div className="flex w-full justify-between  mt-10 mb-4">
        <h1 className="text-3xl font-bold font-sans text-mdblue-500">
          Serviços
        </h1>
        <Sheet>
          <Button variant={"outline"}>
            <FiUserPlus />
            Novo serviço
          </Button>

          <SheetContent className="w-full md:w-1/2 ">
            <SheetHeader>
              <SheetTitle className="font-montserrat font-bold text-3xl text-mdblue-500">
                Lançar serviço
              </SheetTitle>
            </SheetHeader>
            <div className="mt-10">
              <div className="w-full flex flex-col">
                <form className="w-full flex flex-col">
                  <label className="mb-1 font-medium text-lg" htmlFor="">
                    Titulo do Serviço
                  </label>
                  <input
                    className="w-full border border-gray-300 px-2 rounded-md h-11 mb-2"
                    placeholder="Digie o titulo do serviço"
                    type="text"
                    required
                  />
                  <label className="mb-1 font-medium text-lg" htmlFor="">
                    Selecione o cliente
                  </label>
                  <select className="w-full border border-gray-300 px-2 rounded-md h-11 mb-2">
                    {customers.map((customers) => (
                      <option key={customers.id} value={customers.id}>
                        {customers.name}
                      </option>
                    ))}
                  </select>

                  <label className="mb-1 font-medium text-lg" htmlFor="">
                    Valor do serviço
                  </label>
                  <input
                    className="w-full border border-gray-300 px-2 rounded-md h-11 mb-2"
                    placeholder="Digie o titulo do serviço"
                    type="text"
                    required
                  />

                  <label className="mb-1 font-medium text-lg" htmlFor="">
                    Descrição
                  </label>
                  <textarea
                    className="w-full border border-gray-300 px-2 rounded-md h-24 mb-2"
                    placeholder="Descreva o serviço"
                    required
                  ></textarea>

                  <label className="mb-1 font-medium text-lg" htmlFor="">
                    Selecione o status pagamento
                  </label>
                  <select
                    defaultValue={"Pendente"}
                    className="w-full border border-gray-300 px-2 rounded-md h-11 mb-2"
                  >
                    <option value="Realizado">Realizado</option>
                    <option value="Pendente">Pendente</option>
                  </select>

                  <label className="mb-1 font-medium text-lg" htmlFor="">
                    Selecione o status
                  </label>
                  <select
                    defaultValue={"Não iniciado"}
                    className="w-full border border-gray-300 px-2 rounded-md h-11 mb-2"
                  >
                    <option value="Realizado">Realizado</option>
                    <option value="Parado">Parado</option>
                    <option value="Execultando">Execultando</option>
                    <option value="Não iniciado">Não iniciado</option>
                  </select>
                </form>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <table className="min-w-full my-2 ">
        <thead className=" my-2 border border-gray-200 h-8">
          <tr className="text-left">
            <th>Nome</th>
            <th>Cliente</th>
            <th>Data</th>
            <th>Status</th>
            <th>Valor</th>
            <th>Total</th>
            <th>Pagamento</th>
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
              <td>{service.customerId}</td>
              <td>
                {service.create_at
                  ? service.create_at.toLocaleDateString()
                  : "N/A"}
              </td>
              <td>{service.status}</td>
              <td>{service.serviceprice}</td>
              <td>{service.total}</td>
              <td>{service.payment}</td>
              <td className="text-right">
                <div className="flex justify-end gap-2">
                  <button>
                    <FiEdit color="#072e5a" size={24} />
                  </button>
                  <button>
                    <FiTrash color="red" size={24} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
