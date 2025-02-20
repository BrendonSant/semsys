import { Container } from "@/components/container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prismaClient from "@/lib/prisma";
import { FiEdit, FiUserPlus } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DeleteService } from "@/components/deleteservice";
import { SheetCustomer } from "@/components/sheet";

export default async function Servicing() {
  // Verifica se o usuário está autenticado; caso contrário, redireciona para a página inicial.
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    redirect("/");
  }

  // Busca todos os serviços do usuário, incluindo dados do cliente e do produto.
  const services = await prismaClient.ticket.findMany({
    where: { userId: session.user.id },
    include: {
      customer: true,
      product: true,
    },
  });

  // Se não houver nenhum serviço cadastrado, exibe uma mensagem com o botão para cadastrar um novo serviço.
  if (services.length === 0) {
    return (
      <Container>
        <div className="flex w-full justify-between mt-10 mb-4">
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
        <div className="mt-10">
          <p className="text-lg text-center">
            Nenhum serviço cadastrado. Cadastre um novo serviço para começar.
          </p>
        </div>
      </Container>
    );
  }

  // Renderiza a tabela de serviços.
  return (
    <Container>
      {/* Cabeçalho com título e botão de novo serviço */}
      <div className="flex w-full justify-between mt-10 mb-4">
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
      {/* Tabela de serviços */}
      <table className="min-w-full my-2">
        <thead className="my-2 border border-gray-200 h-8">
          <tr className="text-left w-full">
            <th>Nome</th>
            <th>Cliente</th>
            <th className="hidden lg:table-cell">Data</th>
            <th className="mx-1 hidden lg:table-cell">Valor Serviço</th>
            <th className="mx-1 hidden lg:table-cell">Valor Produto</th>
            <th className="mx-1">Total</th>
            <th className="hidden lg:table-cell">Pagamento</th>
            <th className="hidden lg:table-cell">Status</th>
            <th className="text-end">Ações</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr
              key={service.id}
              className="text-left h-16 border-b-2 border-b-slate-200 w-full last:border-b-0"
            >
              <td>{service.name}</td>
              <td>{service.customer?.name}</td>
              <td className="hidden lg:table-cell">
                {service.create_at
                  ? new Date(service.create_at).toLocaleDateString()
                  : "N/A"}
              </td>
              <td className="hidden lg:table-cell">{service.serviceprice}</td>
              <td className="hidden lg:table-cell">{service.product?.price}</td>
              <td >{service.total}</td>
              <td className="hidden lg:table-cell">{service.payment}</td>
              <td className="hidden lg:table-cell">
                {service.status === "Realizado" && (
                  <span
                    className="w-3 h-3 rounded-full bg-green-500 inline-block mr-1"
                    title="Status Realizado"
                  />
                )}
                {service.status === "Parado" && (
                  <span
                    className="w-3 h-3 rounded-full bg-red-500 inline-block mr-1"
                    title="Status Parado"
                  />
                )}
                {service.status === "Execultando" && (
                  <span
                    className="w-3 h-3 rounded-full bg-blue-500 inline-block mr-1"
                    title="Status Execultando"
                  />
                )}
                {service.status === "Não iniciado" && (
                  <span
                    className="w-3 h-3 rounded-full bg-yellow-500 inline-block mr-1"
                    title="Status Não iniciado"
                  />
                )}
                {service.status}
              </td>
              <td className="text-right">
                <div className="flex justify-end gap-2">
                  <SheetCustomer
                    id={service.id}
                    userId={session.user.id}
                    icon={<FiEdit color="blue" />}
                    buttonname={""}
                    type="servicing"
                    title="Edite o serviço"
                  />
                  <DeleteService service={service.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
