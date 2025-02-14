import { Container } from "@/components/container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";
import { redirect } from "next/navigation";
import { SheetCustomer } from "@/components/sheet";

import { TableProduct } from "@/components/tableproduct";
import { FiUserPlus } from "react-icons/fi";


export default async function Products() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const product = await prismaClient.product.findMany({
    where: {
      userId: session.user.id,
    },
  });
  return (
    <Container>
      <div className="flex w-full justify-between  mt-10 mb-4">
        <h1 className="text-3xl font-bold font-sans text-mdblue-500">
          Produtos
        </h1>
        <SheetCustomer
          type="product"
          buttonname="Novo produto"
          title="Cadastro de produto"
          userId={session.user.id}
          icon={<FiUserPlus />}
          id={""}
          
          
        />
      </div>
      <table className="min-w-full my-2 ">
        <thead className=" my-2 border border-gray-200 h-8">
          <tr className="text-left">
            <th >Nome</th>
            <th>Preço</th>
            <th>Decrição</th>
            <th className="text-end">Ações</th>
          </tr>
        </thead>
        <tbody >
          {product.map((product) => (
           <TableProduct product={product} key={product.id}/>
          ))}
        </tbody>
      </table>
      
    </Container>
  );
}
