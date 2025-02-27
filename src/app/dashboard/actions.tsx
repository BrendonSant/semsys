'use server'
import { CustomerProps } from "@/util/customer.type";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Ajuste para o caminho correto
import prismaClient from "@/lib/prisma";
import { redirect } from "next/navigation";
import { string } from "zod";

export async function buscaRelatorio(customer: CustomerProps){

    const session = await getServerSession(authOptions)
      if (!session || !session.user){
        redirect('/')
      }

      const servicesCustomerDone = await prismaClient.ticket.findMany({
        where:{
            userId: session.user.id,
            customerId: customer.id,
            status: 'Realizado'
        }
      })

      const servicesCustomerPlaying = await prismaClient.ticket.findMany({
        where:{
            userId: session.user.id,
            customerId: customer.id,
            status: 'Executando'
        }
      })

      const servicesCustomerStop = await prismaClient.ticket.findMany({
        where:{
            userId: session.user.id,
            customerId: customer.id,
            status: 'Parado'
        }
      })

      const servicesCustomerNopay = await prismaClient.ticket.findMany({
        where:{
            userId: session.user.id,
            customerId: customer.id,
            payment: 'Pendente'
        }
      })
    
    return {
        name: customer.name,
        email: customer.email,
        realizado: servicesCustomerDone.length,
        executando: servicesCustomerPlaying.length,
        parado: servicesCustomerStop.length,
        pendente: servicesCustomerNopay.length,
        data: customer.create_at,
    };

     
}

export interface valuesProps{
  service: number,
  product:number
}


export async function buscaValues(userId:string | null) {

  console.log('-----------------------------------cheguei aqui!')

  const session = await getServerSession(authOptions)
      if (!session || !session.user){
        redirect('/')
      }

      const totalValueService = await prismaClient.ticket.findMany({
        where:{
          userId: session.user.id

        },
        select:{
          serviceprice:true
        }
      })

      console.log(totalValueService);

      const totalValue = totalValueService.reduce((acc, ticket) => {
        return acc + parseFloat(ticket.serviceprice);
      }, 0);



 
      

      const totalProductService = await prismaClient.ticket.findMany({
        where:{
          userId: session.user.id

        },
        select:{
        productId:true
        }
      })




      const produtosServives = await Promise.all(
        totalProductService.map(async (ticket) => {
          const product = ticket.productId ? await prismaClient.product.findFirst({
        where: {
          id: ticket.productId 
        },
        select: {
          price: true
        }
          }) : null;
          return product ? parseFloat(product.price) : 0;
        })
      );

      const totalProductValue = produtosServives.reduce((acc, price) => acc + price, 0);

      return {
        service:totalValue,
        product:totalProductValue
      };


}


export async function buscaDataChart(userId:string){

  const session = await getServerSession(authOptions)
      if (!session || !session.user){
        redirect('/')
      }

      const NIservices = await prismaClient.ticket.findMany({
        where:{
          userId: userId,
          status: 'Não iniciado'
        },
        select:{
          id:true
        }
      })

      const Eservices = await prismaClient.ticket.findMany({
        where:{
          userId: userId,
          status: 'Executando'
        },
        select:{
          id:true
        }
      })

      const Pservices = await prismaClient.ticket.findMany({
        where:{
          userId: userId,
          status: 'Parado'
        },
        select:{
          id:true
        }
      })

      const Rservices = await prismaClient.ticket.findMany({
        where:{
          userId: userId,
          status: 'Realizado'
        },
        select:{
          id:true
        }
      })

      const quantNiservices = NIservices.length;
      const quantEservices = Eservices.length;
      const quantPservices = Pservices.length;
      const quantRservices = Rservices.length;

      const totalconta = [quantNiservices, quantEservices,quantPservices,quantRservices];

      

      const conta = await prismaClient.ticket.findMany({
        where:{
          userId: userId,
    
        },
        select:{
          id: true
        }
      })
    
      const total = conta.reduce((acc, ticket) => acc + Object.keys(ticket).length, 0);
      console.log(total);
    
      return {
        totalc:totalconta,
        total: total
      } ;
}


