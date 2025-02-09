
import { Container } from "@/components/container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SheetCustomer } from "@/components/sheet";
import prismaClient from "@/lib/prisma";
import { FiEdit, FiTrash } from "react-icons/fi";



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

 

  return (
    <Container>
      <div className="flex w-full justify-between  mt-10 mb-4">
        <h1 className="text-3xl font-bold font-sans text-mdblue-500">
          Serviços
        </h1>
        <SheetCustomer
          type="servicing"
          buttonname="Novo serviço"
          title="Lançar serviço"
          userId={session.user.id}
        />
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
        <tbody >
          {service.map((service) => (
            <tr className="text-left h-16 border-b-2 border-b-slate-200 last:border-b-0" key={service.id}>
              <td>{service.name}</td>
              <td>{service.customerId}</td>
              <td>{service.create_at ? service.create_at.toLocaleDateString() : 'N/A'}</td>
              <td>{service.status}</td>
              <td>{service.serviceprice}</td>
              <td>{service.total}</td>
              <td>{service.payment}</td>
              <td className="text-right">
                <div className="flex justify-end gap-2">
                <button>
                <FiEdit color='#072e5a'size={24}/>
                </button>
                <button>
                <FiTrash color="red" size={24}/>
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
