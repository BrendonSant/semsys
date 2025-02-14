import { api } from "@/lib/api"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function buscarProdutoID(id: string) {
    
    const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const products = await prismaClient.product.findMany({
    where: {
      userId: session.user.id,
    },
  });

  const product = await prismaClient.product.findUnique({
    where:{
        id: id as string
    }
  })

  return product
}
