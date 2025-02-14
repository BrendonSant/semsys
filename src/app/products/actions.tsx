
'use server'
import prismaClient from "@/lib/prisma";






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

