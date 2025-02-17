'use server'
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Ajuste para o caminho correto
import prismaClient from "@/lib/prisma";
import { ProductProps } from "@/util/product.type";





export async function buscarClienteID(id: string | null,userId:string | null) {





  const customer = await prismaClient.customer.findFirst({
    where: {
      userId:userId,
      id: id as string
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      document: true,
      address: true,
      userId: true
    }
  })

  
 
  return customer
}
