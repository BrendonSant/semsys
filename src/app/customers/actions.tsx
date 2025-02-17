"use server";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Ajuste para o caminho correto
import prismaClient from "@/lib/prisma";

import { CustomerProps } from "@/util/customer.type";

export async function buscarClienteID(
  id: string | null,
  userId: string | null
) {
  const customer = await prismaClient.customer.findFirst({
    where: {
      userId: userId,
      id: id as string,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      document: true,
      address: true,
      userId: true,
    },
  });

  return customer;
}

export async function editarCustomer(
  data: CustomerProps,
  id: string | null,
  userId: string | null
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      console.error("Usuário não autenticado!");
      return { error: "Unauthorized", status: 401 };
    }

    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/customer`,
      {
        id: id,
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.address,
        document: data.document,
        userId: userId,
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
    return {
      error: error.response?.data || "Erro desconhecido",
      status: error.response?.status || 500,
    };
  }
}
