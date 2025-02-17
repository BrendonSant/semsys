"use server";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Ajuste para o caminho correto
import prismaClient from "@/lib/prisma";


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