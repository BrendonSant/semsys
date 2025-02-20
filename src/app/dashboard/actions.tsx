'use server'
import { CustomerProps } from "@/util/customer.type";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Ajuste para o caminho correto
import prismaClient from "@/lib/prisma";
import { redirect } from "next/navigation";

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