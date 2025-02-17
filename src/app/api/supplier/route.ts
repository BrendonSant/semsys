import { NextResponse } from "next/server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import prismaClient from "@/lib/prisma";

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      {
        status: 401,
      }
    );
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");

  if (!userId) {
    return NextResponse.json(
      { error: "User id not found" },
      {
        status: 400,
      }
    );
  }

  const findTicket = await prismaClient.ticket.findFirst({
    where: {
      supplierId: userId,
    },
  });

  if (findTicket) {
    return NextResponse.json(
      { error: "Cliente possui tickets ativos" },
      {
        status: 400,
      }
    );
  }

  try {
    await prismaClient.supplier.delete({
      where: {
        id: userId as string,
      },
    });

    return NextResponse.json({ message: "Cliente deletado!" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed delete supplier" },
      {
        status: 400,
      }
    );
  }
}

//##################################################################################

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      {
        status: 401,
      }
    );
  }

  const { name, email, phone, address, document, userId } =
    await request.json();

  try {
    await prismaClient.supplier.create({
      data: {
        name,
        email,
        phone,
        address: address || "",
        document,
        userId: userId,
      },
    });

    return NextResponse.json({ message: "Cliente cadastrado!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed create new supplier" },
      {
        status: 400,
      }
    );
  }
}

//##################################################################################

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);

  const {id, name, email, phone, address, document, userId } =
    await request.json();

  if (!id) {
    return NextResponse.json(
      { error: "Client id not found" },
      {
        status: 400,
      }
    );
  }

  try {
    await prismaClient.supplier.update({
      where: {
        id: id as string,
      },
      data: {
        name,
        email,
        phone,
        address: address || "",
        document,
        userId: userId,
      },
    });

    return NextResponse.json({ message: "Fornecedor  atualizado!" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to update supplier" },
      {
        status: 400,
      }
    );
  }
}
