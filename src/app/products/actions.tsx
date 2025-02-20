
'use server'
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Ajuste para o caminho correto
import prismaClient from "@/lib/prisma";
import { ProductProps } from "@/util/product.type";





export async function buscarProdutoID(id: string | null,userId:string | null) {





  const product = await prismaClient.product.findFirst({
    where: {
      userId:userId,
      id: id as string
    },
    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      user: true
    }
  })

  
 
  return product
}

export async function editarproduto(data:ProductProps , id:string | null, userId:string | null){

  

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      console.error("Usuário não autenticado!");
      return { error: "Unauthorized", status: 401 };
    }

    console.log(data); 
    
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/product`,
      {
        id: id,
        name: data.name,
        price: data.price,
        description: data.description,
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
      

