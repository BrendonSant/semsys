"use server";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Ajuste para o caminho correto
import prismaClient from "@/lib/prisma";
import { ServiceProps } from "@/util/servicing.type";


export async function buscaClientes(userId:string | null){
    const customers = await prismaClient.customer.findMany({
        where:{
            userId: userId
        }
    })

    return customers;
}

export async function buscaProdutos(userId:string | null){
    const products = await prismaClient.product.findMany({
        where:{
            userId: userId
        }
    })

    return products ;
}


export async function buscaFornecedores(userId:string | null){
    const suppliers = await prismaClient.supplier.findMany({
        where:{
            userId: userId
        }
    })

    return suppliers ;
}

export async function buscarServiceID(
    id: string | null,
    userId: string | null
  ) {
    const service = await prismaClient.ticket.findFirst({
      where: {
        userId: userId,
        id: id as string,
      }
      
    });
  
    return service;
  }

  export async function editarService(data:ServiceProps , id:string | null, userId:string | null){

    console.log(data);
  
    try {
      const session = await getServerSession(authOptions);
  
      if (!session || !session.user) {
        console.error("Usuário não autenticado!");
        return { error: "Unauthorized", status: 401 };
      }
  
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/servicing`,
        {
          id: id,
          name: data.name,
          description: data.description,
          payment: data.payment,
          status: data.status,
          serviceprice:data.serviceprice,
          total: data.total,
          customerId: data.customerId,
          suplierId: data.supplierId,
          productId: data.productId, 
          userId: userId
        },
        {
          withCredentials: true, // Garante que cookies/session sejam enviados
          headers: {
            Authorization: `Bearer ${session.user}`, // Se necessário
          },
        }
      );
  
      return response.data;
    } catch (error: any) {
      console.error("Erro ao atualizar produto:", error.response?.data || error);
      return { error: error.response?.data || "Erro desconhecido", status: error.response?.status || 500 };
    }
        }