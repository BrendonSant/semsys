import { CardInfo } from "@/components/card";
import { Container } from "@/components/container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SheetCustomer } from "@/components/sheet";
import prismaClient  from "@/lib/prisma";



export default async function Customers() {

  
  const session =  await getServerSession(authOptions);

  if(!session || !session.user){
    redirect('/')
  }

  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <Container>
      <div className="flex w-full justify-between  mt-10 mb-4">
        <h1 className="text-3xl font-bold font-sans text-mdblue-500">
          Clientes
        </h1>
       <SheetCustomer userId={session.user.id}/>
      </div>

      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
       {customers.map((customer) => (
         <CardInfo 
         customer={customer} 
         key={customer.id}/>
       ))}
       
      </div>
      {customers.length === 0 && (
        <div className="flex justify-center items-center h-96">
          <h1 className="text-2xl font-montserrat font-bold text-mdblue-500">
            Nenhum cliente cadastrado
          </h1>
        </div>
      )
      }

    </Container>
  );
}
